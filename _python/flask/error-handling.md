### Error Handling

```py
from marshmallow import ValidationError
from flask import current_app, jsonify
from app.main import main


@main.errorhandler(ValidationError)
def validation_error(e):
    current_app.logger.error(e)
    return jsonify({
        'error': 'SCHEMA_VALIDATION_ERROR',
        'message': e
    }), 400


@main.errorhandler(400)
def bad_request_error(e):
    current_app.logger.error(e)
    return jsonify({
        'error': 'BAD_REQUEST',
        'message': e
    }), 400


@main.errorhandler(401)
def unauthorized_error(e):
    current_app.logger.error(e)
    return jsonify({
        'error': 'UNAUTHORIZED',
        'message': e
    }), 401


@main.errorhandler(403)
def forbidden_error(e):
    current_app.logger.error(e)
    return jsonify({
        'error': 'FORBIDDEN',
        'message': e
    }), 403


@main.errorhandler(404)
def endpoint_not_found_error(e):
    current_app.logger.error(e)
    return jsonify({
        'error': 'ENDPOINT_NOT_FOUND',
        'message': e
    }), 404


@main.errorhandler(500)
def internal_server_error(e):
    current_app.logger.error(e)
    return jsonify({
        'error': 'INTERNAL_SERVER_ERROR',
        'message': e
    }), 500
```

### Blueprint

If using @errorhandler, it will be invoked only for errors that originate in the routes defined by the blueprint. To install application-wide error handlers, use @app_errorhandler.

```py
@main.app_errorhandler(404)
def page_not_found(e):
  return jsonify({
    'error': 'some error'
  })
```

### Werkzeug Abort

Sometimes it is more convenient to just raise an exception by error code, without importing the exception.

https://python.plainenglish.io/python-web-development-with-flask-error-handling-36349a7f82c

```py
abort(404)
abort(Response('hello world'))
abort(404, 'hello world!')

@app.errorhandler(400)
def application_bad_request(e):
    current_app.logger.error(e)
    return jsonify({
        'error': 'bad request',
        'message': e.description,   # e returns error class
    }), 400
```

### Error Classes

Use inspect module to get class attributes.

```py
import inspect
from flask import abort

print(inspect.getmembers(obj))
abort(400, e.args[1].decode('utf-8'))   # for mssql exceptions


@api_v1.errorhandler(ValidationError)
def schema_validation_error(e):
    current_app.logger.error(e)
    return jsonify({
        'error': 'schema validation error',
        'message': e.messages
    }), 400
```

### Custom Exception Classes

Flask recommends to create custom exception instead of using abort().

https://flask.palletsprojects.com/en/0.12.x/patterns/apierrors/

```py
from flask import jsonify

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
```
