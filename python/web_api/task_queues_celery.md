## Task Queues:
Manage background work that must be executed outside the usual HTTP request-response cycle.

Tasks are handled asynchronously either because they are not initiated by an HTTP request or are long-running jobs that would dramatically reduce the performance
of an HTTP response. Example is having database query performed in background on fixed intervals with results stored in database; when HTTP request comes, it would simply
fetch the precalculate result instead of re-executing the longer query. Other types of jobs include:
- Spreading out large numbers of independent database inserts over time
- Aggregating collected data values on fixed interval.
- Scheduling periodic jobs such as batch processes.

## Celery:
Defacto standard Python asynchronous task queue.
```python
from flask import Flask
from celery import Celery

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)
```
