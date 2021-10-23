## Running Flask App:
```
# in Linux:
export FLASK_APP=flasky.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port 4200

# in Windows:
set FLASK_APP=flasky.py
```

## Request Methods:
Flask auto attaches HEAD and OPTIONS.

## Responses:
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
## Authentication:
Password hashing function takes a password, adds a random component (salt) and applies several one-way cryptographic transformations to it. Werkzeug's security module conveniently implements secure password hashing.

```
generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
check_password_hash(hash, password)
```
