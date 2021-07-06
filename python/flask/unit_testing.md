## Flask Test Client:
Test client to replicate the environment (to certain extent) that exists when an app is running inside web server. Requests are received and routed to appropriate view functions, and response are generated and returned. After a view function executes, can test response passed to the test.

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
        'Authorization':
        'Basic ' + b64encode((username + ':' + password).encode('utf-8')).decode('utf-8'),
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

## Running Unittest:
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
