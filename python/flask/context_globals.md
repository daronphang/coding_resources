# Application & Request Contexts:
Contexts enable Flask to make certain variables globally accessible to a thread without interfering with other threads.

## Application Context Variables:  
1) **current_app**: application instance for active application
2) **g**: an object that the application can use for temporary storage during handling of request; variable is rest with each request.

## Request Context Variables:  
1) **request**: request object that encapsulates the contents of an HTTP request send by the client.
2) **session**: a dictionary that the application can use to store values that are "remembered" between requests.

Examples: g.current_user, request.args.get(), session['x'] = form.x.data

Flask activates the application and request contexts before dispatching a request to the application, and removes them after the request is handled. When the application context is pushed, current_app and g variables become available to the thread. Likewise, when request context is pushed, request and session become available.

## Activating Context in Blueprint:
```python
with app.app_context():
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
```

## Examples:
```python
# request behaves as a dict
request.args.get()          # retrieve url query arguments with ?=
request.get_json()          # parse request body in JSON
request.headers.get()       # retrieve 
request.form.get()
request.method == 'GET'

```
