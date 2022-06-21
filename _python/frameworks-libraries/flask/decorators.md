### Flask Decorators

Each view in Flask is a function, and decorators can be used to inject additional functionality to one or more functions i.e. login_required decorator.
A decorator is a function that wraps and replaces another function. Since the original function is replaced, need to remember to copy the original's
function's information to the new function you are creating. Use functools.wraps() to help with this.

```python
from functools import wraps
from flask import g, request, redirect, url_for

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

@app.route('secret_page')
@login_required     # this decorator wraps original function secret_page(); to return original function, use @wraps
def secret_page():
    pass
```

### Functools Wraps

Module is for higher-order functions; functions that act or return other functions. Updates the wrapper function to look like the wrapped function.

```python
from functools import wraps
def my_decorator(f):
@wraps(f)
    def wrapper(*args, **kwds):
        print('Calling decorated function')
        return f(*args, **kwds)
   return wrapper

@my_decorator
def example():
  """Docstring"""
  print('Called example function')
```
