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
        
    def test_register_and_login(self):
        # register a new account
        response = self.client.post('/auth/register', data={
            'email': 'john@example.com',
            'username': 'john',
            'password': 'cat',
            'password2': 'cat'
        })
        self.assertEqual(response.status_code, 302)
        
        # log in with the new account
        response = self.client.post('/auth/login', data={
            'email': 'john@example.com',
            'password': 'cat'
        }, follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(re.search('Hello,\s+john!', response.get_data(as_text=True)))
        self.assertTrue('You have not confirmed your account yet' in response.get_data(as_text=True))
        
        # send a confirmation token
        user = User.query.filter_by(email='john@example.com').first()
        token = user.generate_confirmation_token()
        response = self.client.get('/auth/confirm/{}'.format(token),follow_redirects=True)
        user.confirm(token)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('You have confirmed your account' in response.get_data(as_text=True))
        
        # log out
        response = self.client.get('/auth/logout', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('You have been logged out' in response.get_data(as_text=True))
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
