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
