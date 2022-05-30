### Retrieving Entries from Database

Can use Flask-SQLAlchemy, an extension that simplifies the use of SQLAlchemy inside Flask applications. A powerful relational database
framework that supports several database backends, offers high-level ORM and low-level access to the database's native SQL functionality. Need to create
Model class that has attributes matching the columns of a corresponding database table.

### Flask-SQLAlchemy Database URLs

When parsing special characters (i.e. $,%,^), need to encode it.

https://www.w3schools.com/tags/ref_urlencode.asp

```
MySQL: mysql://username:password@hostname/database
Postgres: postgresql://username:password@hostname/database
SQLite: sqlite:///c/absolute/path/to/database

MySQL: mysql://username:password%5E%5E@hostname/database
```

### SQLAlchemy Column Types

```
Integer
SmallInteger
BigInteger
Float
Numeric
String
Text
Unicode
UnicodeText
Boolean
Date
Time
DateTime
Interval
Enum
PickleType
LargeBinary
```

### SQLAlchemy Column Options

```
primary_key
unique          If set true, do not allow duplicates for this column
index           If set true, creates an index for column so queries are more efficient
nullable
default         Defines default value for column
```

### Python Configuration

```python
# In Application Script module (top-level directory):
# To automatically add database instance and models in shell session i.e. no need 'from model import User, Role'
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

     def __repr__(self):
        return '<User {}>'.format(self.username)
```

## Database Relationships

Relational databases establish connections between rows in different tables through the use of relationships.
Relationships are connected through foreign keys. Relationship types include one-to-many, one-to-one, many-to-many, many-to-one.

```python
# In Model module:
# one-to-many relationship i.e. one role can belong to many users, but each user can have only one role
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    users = db.relationship('User', backref='role')

    # users attribute will return the list of users associated with role (many side)
    # role attribute is added when creating an instance of User model

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
```

### Common SQLAlchemy Relationship Options

```
backref         Adds a back reference in the other model in the relationship.
primaryjoin     Specifies the join condition between two models explicitly, necessary for ambiguous relationships.
lazy            Specifies how items are to be loaded. Possible values are select, immediate, joined, subquery, noload, dynamic.
uselist         If set to False, use a scalar instead of a list i.e. 'many' side becomes 'one' side.
order_by        Specifies the ordering for the items in the relationship.
secondary       Specifies the name of association table to use in many-to-many relationships.
seondaryjoin    Specifies the secondary join condition for many-to-many relationships.
```

## Database Operations

Best way to work with models is in Python shell. When using shell context processor, will auto import database instance and models each time a shell session is created.

```python
@app.shell_context_processor
def make_shell_context():
    return dict(db=db, User=User, Role=Role)
```

### Creating Tables

```
(venv) $ flask shell
>>> from hello import db
>>> db.create_all()     # will not re-create a table if it already exists
```

### Inserting Rows

```
>>> from hello import Role, User
>>> admin_role = Role(name='Admin')
>>> mod_role = Role(name='Moderator')
>>> user_role = Role(name='User')
>>> user_john = User(username='john', role=admin_role)
>>> user_susan = User(username='susan', role=user_role)
>>> user_david = User(username='david', role=user_role)

# Changes to database are managed through a database session/transaction
>>> db.session.add(admin_role)
>>> db.session.add(mod_role)
>>> db.session.add(user_role)
>>> db.session.add(user_john)
>>> db.session.add(user_susan)
>>> db.session.add(user_david)

>>> db.session.add_all([admin_role, mod_role, user_role,
... user_john, user_susan, user_david])

>>> db.session.commit()

>>> print(admin_role.id)

>>> db.session.rollback()   # if previous session failed to commit
```

### Modifying Rows

Use the add() method.

```
>>> admin_role.name = 'Administrator'
>>> db.session.add(admin_role)  # renames name from 'Admin' to 'Administrator'
>>> db.session.commit()
```

### Deleting Rows

```
>>> db.session.delete(mod_role)
>>> db.session.commit()
```

### Querying Rows

```
>>> Role.query.all()
[<Role 'Administrator'>, <Role 'User'>]
>>> User.query.all()
[<User 'john'>, <User 'susan'>, <User 'david'>]

>>> User.query.filter_by(role=user_role).all()
[<User 'susan'>, <User 'david'>]
```

### Common SQLAlchemy Query Filters and Executors

```
# Filters:
filter()
filter_by()       Adds equality filter
limit()
offset()
order_by()
group_by()

# Executors:
all()
first()           Returns first result of query, or 'None' of there are no results.
first_or_404()    Aborts if there are no results
get()
get_or_404()
count()
paginate()        Returns a Pagination object that contains the specified range of results.
```
