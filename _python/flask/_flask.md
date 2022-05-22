## Running Flask App

```
# in Linux
$export FLASK_APP=flasky.py
$export FLASK_ENV=development
$flask run --host=0.0.0.0 --port 4200

# in Windows
$set FLASK_APP=flasky.py
```

## Routes

```py
@app.route('/')
def index():
  return 'hello world'

@app.route('/user/<name>')
def index(name):
  return 'hello world'

# by default, the dynamic components in routes are strings
# flask supports string, int, float and path for routes
@app.route('/user/<int:id>')
def index(id):
  return 'hello world'
```

## Request Methods

Flask auto attaches HEAD and OPTIONS.

## Responses

Can use make_response() to output multiple values in response object.

```python
@app.route('/')
def index():
  response = make_response('<h1>This document carries a cookie!</h1>')
  response.set_cookie('answer', '42')
  return response
```

```
# attributes and methods in response object
status_code
headers
content_type

set_cookie()
get_data()
```

## Authentication

Password hashing function takes a password, adds a random component (salt) and applies several one-way cryptographic transformations to it. Werkzeug's security module conveniently implements secure password hashing.

```
generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
check_password_hash(hash, password)
```

## JSON Payload & Overhead

JSON data consists of two essential parts: header/overhead identifier and actual information payload. Must have "" for JSON format.

Overhead is to indicate the source and destination of the information being transmitted; this section is stripped off once the message reaches its destination.

Payload refers to an integral part of each unit of data being transmitted.

```json
{
  "Content-Type": "application/json",
  "Cache-Control": "True",
  "status": "OK",
  "data": "Hello, World!"
}
```

## Converting Data Types to JSON

```python
import json
from flask import jsonify

dict = {'test': 'hello world'}

json_object = json.dumps(dict)  # serializing JSON, converts dict to JSON
python_dict = json.loads(json_object) # deserializing JSON, converts JSON to dict

jsonify(dict)
```
