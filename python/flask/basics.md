## Running Flask App:
```
# in Linux:
export FLASK_APP=flasky.py
flask run

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
