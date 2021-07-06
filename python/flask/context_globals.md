## Application & Request Contexts:
Contexts enable Flask to make certain variables globally accessible to a thread without interfering with other threads i.e. to access request sent from client.

```
curent_app      Application Context     Application instance for active application
g               Application Context     Object that the app can use for temporary storage during handling of request; reset with each request
request         Request Context         Encapsulates the contents of HTTP request sent by client
session         Request Context         User session, a dictionary that the app can use to store values that are 'remembered' between requests

g.current_user
session['x'] = form.x.data

request.args.get()          # retrieve url query arguments with ?=
request.get_json()          # parse request body in JSON
request.headers.get()       # retrieve 
request.form.get()
request.method == 'GET'
```

## Activating Context in Blueprint:
Flask activates the application and request contexts before dispatching a request to the application, and removes them after the request is handled. When the application context is pushed, current_app and g variables become available to the thread. Likewise, when request context is pushed, request and session become available.

```python
with app.app_context():
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
```
