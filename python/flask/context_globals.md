## Application & Request Contexts:
Contexts enable Flask to make certain variables globally accessible to a thread without interfering with other threads i.e. to access request sent from client.

```
curent_app      Application Context     Application instance for active application
g               Application Context     Object that the app can use for temporary storage during handling of request; reset with each request
request         Request Context         Encapsulates the contents of HTTP request sent by client
session         Request Context         User session, a dictionary that the app can use to store values that are 'remembered' between requests

g.current_user
session['x'] = form.x.data
```

## Request:
```
# hooks
before_request 
before_first_request
after_request
teardown_request
```

```
# Request is a dictionary 
request.get_json()          # parse request body in JSON
request.args.get()          # retrieve url query arguments with ?=
request.headers
request.form
request.values              # combines values in form and args
request.cookies
request.files
request.method              # GET, POST, etc.
request.full_path           # path and query string portions of URL
request.url                 # complete URL including query string component

# methods
is_secure()                 # boolean, check if request came through HTTPS
```

## Activating Application Context Manually:
Flask activates the application and request contexts before dispatching a request to the application, and removes them after the request is handled. When the application context is pushed, current_app and g variables become available to the thread. Likewise, when request context is pushed, request and session become available. Flask automatically pushes an application and request context when handling a request, or when running CLI commands registered with Flask.cli using @app.cli.command(). Flask will pop the request context then the application context when the request ends.

```python
from flask import current_app
from flask import Flask

app = Flask(__name__)
app_ctx = app.app_context()
app_ctx.push()
app_ctx.pop()

# manually push
def create_app():
    app = Flask(__name__)
    with app.app_context():
        init_db()

    return app

# inside blueprint:
with app.app_context():
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
```
