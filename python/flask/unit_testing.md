## Flask Test Client:
Test client to replicate the environment that exists when an app is running inside web server.

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
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    
    def test_home_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('Stranger' in response.get_data(as_text=True))
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
