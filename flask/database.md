## Retrieving Entries from Database:
Can use Flask-SQLAlchemy, an extension that simplifies the use of SQLAlchemy inside Flask applications. A powerful relational database
framework that supports several database backends, offers high-level ORM and low-level access to the database's native SQL functionality. Need to create
Model class that has attributes matching the columns of a corresponding database table. 

### Flask-SQLAlchemy Database URLs:
- MySQL: mysql://username:password@hostname/database
- Postgres: postgresql://username:password@hostname/database
- SQLite: sqlite:///c/absolute/path/to/database

### Python Configuration:
```python
# In flasky_api.py:
@api.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User)

# In Config module:
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    # ...

# In Application module:
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from Config import config

db = SQLAlchemy()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)

# In Models module:
from app import db


class User(db.Model):
    __tablename__ = 'pg_user_database_testing'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(200))
```
