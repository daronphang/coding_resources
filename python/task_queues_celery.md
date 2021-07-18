## Task Queues:
Manage background work that must be executed outside the usual HTTP request-response cycle.

Tasks are handled asynchronously either because they are not initiated by an HTTP request or are long-running jobs that would dramatically reduce the performance
of an HTTP response. Example is having database query performed in background on fixed intervals with results stored in database; when HTTP request comes, it would simply
fetch the precalculate result instead of re-executing the longer query. Other types of jobs include:
- Spreading out large numbers of independent database inserts over time
- Aggregating collected data values on fixed interval.
- Scheduling periodic jobs such as batch processes.

## Celery:
Defacto standard Python asynchronous task queue. Can use it to execute tasks outside of context of application. Any resource consuming tasks that application may need to run can be offloaded to task queue, leaving application free to respond to client requests. Has three core components:
1) Celery Client: Used to issue background jobs (client runs with Flask application).
2) Celery Workers: Processes that run background jobs, supports both local and remote workers.
3) Message Broker: Client communicates with workers through message queue; commonly used brokers are RabbitMQ and Redis.

```
# methods
delay()                 Call task, shortcut to more powerful apply_async() 
apply_async()
ready()                 Returns boolean on whether the task has finished processing or not
wait()
```

```python
from flask import Flask
from celery import Celery

app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)                                          # additional configuration options for Celery
```
```python
# Decorating functions with Celery to run as background tasks
@celery.task
def my_background_task(arg1, arg2):
    # some long running task here
    return result
    
task = my_background_task.delay(10, 20)                                 # shortcut to more powerful apply_async() method
task = my_background_task.apply_async(args=[10, 20], countdown=60)      # runs every 60s
```

### Background Tasks with Status Updates Example:
```python
@celery.task(bind=True)     # bind=True instructs Celery to send a 'self' argument to function
def long_task(self):
    """Background task that runs a long function with progress reports."""
    verb = ['Starting up', 'Booting', 'Repairing', 'Loading', 'Checking']
    adjective = ['master', 'radiant', 'silent', 'harmonic', 'fast']
    noun = ['solar array', 'particle reshaper', 'cosmic ray', 'orbiter', 'bit']
    message = ''
    total = random.randint(10, 50)
    for i in range(total):
        if not message or random.random() < 0.25:
            message = '{0} {1} {2}...'.format(random.choice(verb),
                                              random.choice(adjective),
                                              random.choice(noun))
        
        # How Celery receives task updates
        self.update_state(state='PROGRESS',   # other built-in states include STARTED, SUCCESS
                          meta={'current': i, 'total': total,
                                'status': message})
                                
        time.sleep(1)
    return {'current': 100, 'total': 100, 'status': 'Task completed!',
            'result': 42}
```
```python
@app.route('/longtask', methods=['POST'])
def longtask():
    task = long_task.apply_async()
    return jsonify({}), 202, {'Location': url_for('taskstatus',
                                                  task_id=task.id)}
```
```python
# Accessing task status from Flask app

@app.route('/status/<task_id>')
def taskstatus(task_id):
    task = long_task.AsyncResult(task_id)
    if task.state == 'PENDING':
        # job did not start yet
        response = {
            'state': task.state,
            'current': 0,
            'total': 1,
            'status': 'Pending...'
        }
    elif task.state != 'FAILURE':
        response = {
            'state': task.state,
            'current': task.info.get('current', 0),
            'total': task.info.get('total', 1),
            'status': task.info.get('status', '')
        }
        if 'result' in task.info:
            response['result'] = task.info['result']
    else:
        # something went wrong in the background job
        response = {
            'state': task.state,
            'current': 1,
            'total': 1,
            'status': str(task.info),  # this is the exception raised
        }
    return jsonify(response)
```
