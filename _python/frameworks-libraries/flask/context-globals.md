## Application & Request Contexts

Contexts enable Flask to make certain variables globally accessible to a thread without interfering with other threads i.e. to access request sent from client. The Flask.wsgi_app() handles and manages the contexts during each request. Both request and application contexts work as stacks. When request starts, context is created and pushed, and global proxies (g, request, session) are available. As contexts are stacks, other contexts may be pushed to change the proxies during a request. After request, context is popped, and teardown_request() and teardown_appcontext() are executed even if there is an unhandled exception.

```
_request_ctx_stack
_app_ctx_stack
```

For g, the data is lost after the context ends and is not an appropriate place to store data between requests. Use session instead.

```
curent_app      Application Context     Application instance for active application
g               Application Context     Object that the app can use for temporary storage during handling of request; reset with each request
request         Request Context         Encapsulates the contents of HTTP request sent by client
session         Request Context         User session, a dictionary that the app can use to store values that are 'remembered' between requests

g.current_user
session['x'] = form.x.data
```

### Request Objects

```
# Request is a dictionary
request.get_json()          Parse request body in JSON
request.args.get()          Retrieve url query arguments with ?=
request.headers
request.form
request.values              Combines values in form and args
request.cookies
request.files
request.method              GET, POST, etc.
request.full_path           Path and query string portions of URL
request.url                 Complete URL including query string component

# methods
is_secure()                 Boolean, check if request came through HTTPS
```

### Request Hooks

Sometimes it is useful to execute code before/after each request is processed i.e. creating database connection or authenticating user. Request hooks are implemented as decorators.

```
@before_request
@before_first_request
@after_request              Register a function to be run after each request
@teardown_request

@after_this_request         Executes a function after this request; useful for modifying response objects
```

```py
@app.before_request
def before_request_func():
    print("before_request is running!")

@app.route('/')
def index():
    @after_this_request
    def add_header(response):
        response.headers['X-Foo'] = 'Parachute'
        return response
    return 'Hello World!'
```

### Response Objects

Need create response object with make_response(). For RESTFUL API, set jsonified object as response.

```py
# RESTFUL
@main.route()
def example():
    response = jsonify({})
    response.status_code = 404
    response.set_cookie()
    # return {'test': '123'}, 200, {'Set-Cookie': 'name=john', 'Set-Cookie': 'token=12345abc'}

```

```
response = make_response()
response.status_code = 400

status_code
headers                 Dictioanry-like object with all headers that will be sent with response
set_cookie()
delete_cookie()
content_length          Length of response body
content_type
set_data()              Sets the response body as a string or bytes value
get_data()              Gets the response body
```

## Activating Application Context

Flask activates the application and request contexts before dispatching a request to the application, and removes them after the request is handled. When the application context is pushed, current_app and g variables become available to the thread. Likewise, when request context is pushed, request and session become available. When using app factory pattern, there won't be an app instnace to import; Flask solves this with the application context. Rather than referring to an app directly, use current_app proxy which points to the application handing during currnet activity.

Flask automatically pushes an application and request context when handling a request (inside view functions), or when running CLI commands registered with Flask.cli using @app.cli.command(). Flask will pop the request context then the application context when the request ends.

However, to access objects outside of view functions or in python shell, need to manually activate:

```python
from flask import current_app
from flask import Flask

app = Flask(__name__)
app_ctx = app.app_context()     # or app.test_request_context()
app_ctx.push()
app_ctx.pop()

# manually push with context manager
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
