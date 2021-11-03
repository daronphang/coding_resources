## Error Handling:


## Blueprint:
If using @errorhandler, it will be invoked only for errors that originate in the routes defined by the blueprint. To install application-wide error handlers, use @app_errorhandler.
```py
@main.app_errorhandler(404)
def page_not_found(e):
  return jsonify({
    'error': 'some error'
  })
```
