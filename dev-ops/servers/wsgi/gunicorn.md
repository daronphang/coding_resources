## Gunicorn

Gunicon is a Python WSGI HTTP server for UNIX i.e. an application server. WSGI is needed for Python web applications as traditional web servers like Apache and Nginx do not have the ability to run them i.e. unable to communicate with Python base web apps. Acts as a middle-layer between web servers and Python applications that support WSGI including Flask and Django.

A web server is meant to serve static pages like HTML/CSS, while an application server is reponsible for working with data by executing server-side code.

Gunicorn takes care of everything that happens in-between web server and application:

-   Communicates with multiple web servers.
-   Reacts to multiple web requests at once and distributing the load.
-   Keeps multiple processes of web application running.
-   Restarts web application as needed.

Uses a pre-fork worker model i.e. central master process that manages a set of worker processes. All requests and responses are handled completely by worker processes, and the master does not know anything about the individual clients.

Workflow:

HTTP requests <-> Nginx/CDN <-> Gunicorn <-> Python App

### Workers

Workers can be Sync or Async.

Sync workers are workers that handle a single request at a time and do not support persistent connections i.e. each connection is closed after the response has been sent.

Async workers are based on Greenlets (an implementation of cooperative multi-threading for Python).

Gunicorn should only need 4-12 worker processes to handle hundreds or thousands of requests per second. Relies on the OS to provide all of the load balancing when handling requests. Recommended to have 2\*number of cores + 1 workers, with the assumption that for a given core, one worker will be used for reading/writing from the socket, while another is for processing the request.

## Setup

```py
from flask import Flask
app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    return 'Hello world!'
```

```sh
#!/bin/sh
gunicorn app:app -w 4 --threads 2 -b 0.0.0.0:5000
```

## Configuration

### App preloading

If you are constrained for memory or experiencing slow app boot time, might want to consider enabling preload option i.e. loads application code before worker processes are forked.

```console
$ gunicorn hello:app --preload
```

### Worker timeouts

Gunicorn gracefully restarts a worker if it hasn't completed any work within the last 30 seconds. If you expect your application to respond quickly to constant incoming flow of requests, can experiment a lower timeout configuration.

```console
$ gunicorn hello:app --timeout 10
```

### Max request recycling

If your app suffers from memory leaks (unintentional form of memory consumption whereby developer fails to free an allocated block of memory when no longer needed), can configure Gunicorn to gracefully restart a worker after processing a given number of requests.

```console
$ gunicorn hello:app --max-requests 1000
```
