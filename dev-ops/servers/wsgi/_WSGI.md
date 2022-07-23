## WSGI

- WSGI stands for Web Server Gateway Interface.
- Both specify interface and sit in between web server and Python web application/framework; allows to separate server code from application code where business logic is added.
- WSGI handles requests synchronously i.e. takes single request and returns response at a time.
- For WSGI, can define application as callable that takes two arguments (environ and synchronous callable).
- WSGI frameworks include Bottle, Flask, Falcon, Django and WSGI servers including Gunicorn, uWSGI, Apache.

### WSGI Limitations

- WSGI doesn't have ability to deal with Web Sockets and cannot work with HTTP/2.
- HTTP/1.1 keeps all requests and responses in plain text format while HTTP/2 use binary framing layer to encapsulate all messages in binary format while still maintaining HTTP semantics such as verbs, methods and headers.
- Cannot use async/await.

## ASGI

- ASGI for Asynchronous Server Gateway Interface.
- ASGI frameworks include Sanic, Blacksheep, Japronto, etc.
- Takes three arguments: Scope (environ), Receive and Send.
- Allows multiple incoming events and outgoing events for each application.
- Allows background coroutine so the application can listen for events on an external trigger like a redis queue.

### ASGI Limitations

- ASGI servers are newer and tested less, may have less features and smaller community behind them.
