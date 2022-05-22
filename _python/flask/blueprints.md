### Blueprints

Flask use a concept of blueprints to provide a central means for Flask extensions to register operations on applications. Blueprints encapsulate functionality such as views, templates, static files, error handling, views associated with routes and other resources that can be applied/extended to an application. Blueprints work similarly to Flask application object (similary resources), but is not actually an application.

Needs to be registered in an application before you can run it. When it is registered, the application is extended with the contents of blueprint i.e. they record operations to be executed later when you register them on an application.

Instead of having multiple application objects, blueprints provide separation at Flask level, share application config, and can change application object as necessary with being registered. However, cannot unregister a blueprint once created without destroying the application object.

Blueprints in Flask are intended for these cases:

- Factor an application into a set of blueprints i.e. organize application into distinct components.
- Register a blueprint on an application at URL prefix or subdomain.
- Register a blueprint multiple times on an application with different URL rules.
- Provide resources including templates, static files, view functions, etc.

### Application Factory

For single-script applications, the application instance exists in global scope and routes can be easily defined using app.route decorator. However, when creating Flask through application factory (app = Flask()), the application instance is created at runtime and app.route decorators begin to exist only after create_app() is invoked, which is too late.

Resources defined in blueprint are in dormant state until the blueprint is registered with an application, at which point they become part of it.

Important to note that routes and error handlers associated with blueprint are imported at bottom to avoid errors due to circular dependencies i.e. errors and views modules are going to import the main blueprint object.

```py
from flask import Blueprint

main = Blueprint('main', __name__)

from . import views, errors
```

### Nesting Blueprints

```py
parent = Blueprint('parent', __name__, url_prefix='/parent')
child = Blueprint('child', __name__, url_prefix='/child')
parent.register_blueprint(child)
app.register_blueprint(parent)
```

### Error Handlers

```py
@simple_page.errorhandler(404)
def page_not_found(e):
    return render_template('pages/404.html')
```
