## Flask Test Client

Test client to replicate the environment (to certain extent) that exists when an app is running inside web server. Requests are received and routed to appropriate view functions, and response are generated and returned. After a view function executes, can test response passed to the test.

If using and editing a global variable across tests in a single file, need to shallow/deep copy the object as unittests do not execute in order.

```python
import unittest
from app import create_app, db
from app.models import User, Role

class FlaskClientTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        Role.insert_roles()
        self.client = self.app.test_client(use_cookies=True)
        WTF_CSRF_ENABLED = False      # disabled CSRF protection from Flask-WTF forms

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_home_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('Stranger' in response.get_data(as_text=True))

    def get_api_headers(self, username, password):
        return {
        'Authorization': 'Basic ' + b64encode((username + ':' + password).encode('utf-8')).decode('utf-8'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }

    def test_no_auth(self):
        response = self.client.get(url_for('api.get_posts'), content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_posts(self):
        # add a user
        r = Role.query.filter_by(name='User').first()
        self.assertIsNotNone(r)
        u = User(email='john@example.com', password='cat', confirmed=True,role=r)
        db.session.add(u)
        db.session.commit()

        # write a post
        response = self.client.post('/api/v1/posts/', headers=self.get_api_headers('john@example.com', 'cat'),
            data=json.dumps({'body': 'body of the *blog* post'}))
        self.assertEqual(response.status_code, 201)
        url = response.headers.get('Location')
        self.assertIsNotNone(url)

        # get the new post
        response = self.client.get(url, headers=self.get_api_headers('john@example.com', 'cat'))
        self.assertEqual(response.status_code, 200)
        json_response = json.loads(response.get_data(as_text=True))
        self.assertEqual('http://localhost' + json_response['url'], url)
        self.assertEqual(json_response['body'], 'body of the *blog* post')
        self.assertEqual(json_response['body_html'],'<p>body of the <em>blog</em> post</p>')
```

## Asserts

### assertRaises

```py
self.assertRaises(Exception, test_function, args)
with self.assertRaises(Exception) as exc:
    test_function()
self.assertEqual(str(exc.exception.message), 'some message')
```

## Running Unittest

```python
import os
from dotenv import load_dotenv
from flask_toy_project.app_api.app import create_app, db
from flask_toy_project.app_api.app.models_api import User

load_dotenv()

api = create_app(os.getenv('FLASK_CONFIG'))


@api.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User)


@api.cli.command()
def testing():      # function cannot be named as testing_api
    import unittest
    tests = unittest.TestLoader().discover('app_api.test_api')    # start directory
    unittest.TextTestRunner(verbosity=2).run(tests)
```

## Example

```py
class FlaskApiQueryTest(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client(use_cookies=True)

    def tearDown(self):
        self.app_context.pop()

    def attach_headers(self):
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'  # needed for request.json to work
        }

    def test_base_schemas(self):
        payload = json.dumps({'payload': 'testing'})   # Should throw error as userinfo is not present
        resp = self.client.post('/MLLA/api/v1/query', headers=self.attach_headers(), data=payload)
        self.assertEqual(resp.status_code, 400)
        json_resp = json.loads(resp.get_data(as_text=True))
        self.assertEqual(json_resp['message'], 'Schema Validation Error')

    def test_query_success(self):
        payload = json.dumps({
            'userinfo': {
                'username': 'DARONPHANG',
                'fab': 'f10w'
            },
            'payload': {
                'query_payload': {
                    'fac_oid': '0x7f5156e2400a9854'
                },
                'query_name': 'retrieve_DID'
             }
        })
        resp = self.client.post('/MLLA/api/v1/query', headers=self.attach_headers(), data=payload)
        self.assertEqual(resp.status_code, 200)
```
