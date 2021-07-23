## Celery:
Defacto standard Python asynchronous task queue that integrates itself with web frameworks including Django, Flask, Pyramid, Pylons, etc. Framework that brings Flask app, database backend, workers and message queue together and allows workers to communicate with database backend. Has three core components:
1) Celery Client: Used to issue background jobs (client runs with Flask application).
2) Celery Workers: Processes that run background jobs, supports both local and remote workers.
3) Message Broker: Client communicates with workers through message queue; commonly used brokers are RabbitMQ and Redis.

Brokers such as Redis is an in-memory data structure store used as a distributed, in-memory key-value database, cache and message broker.

Can use it to execute tasks outside of context of application. Any resource consuming tasks that application may need to run can be offloaded to task queue, leaving application free to respond to client requests. Background tasks include:
- Running ML models.
- Sending confirmation emails.
- Scraping and crawling.
- Analyzing data.
- Generating reports.

### Process Workflow:
1) Client talks to Flask application to place their request.
2) App takes the request and puts it in database queue with PENDING status.
3) Client receives a JobID and polls as response; flask app is then free to take-on next request.
4) Celery worker takes on the request and runs the service.
5) Once worker is done, it updates the job's status from PENDING to SUCCESS.
6) Flask app signals this change and client gets updated on request status. 


```
# methods
delay()                 Call task, shortcut to more powerful apply_async() 
apply_async()
ready()                 Returns boolean on whether the task has finished processing or not
wait()
time.sleep()            Suspend execution of current thread for a given number of seconds
```

## Example: 

```python
from flask import Flask
from celery import Celery
from celery.result import AsyncResult


app = Flask(__name__)
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'], backend=app.config['CELERY_RESULT_BACKEND])
celery.conf.update(app.config)   # additional configuration options for Celery


# Decorating functions with Celery to run as background tasks
@celery.task
def my_background_task(arg1, arg2, name='tasks.my_background_task', max_retries=3):
    # some long running task here
    return result
    
    
@app.route('/tasks', methods=['POST', 'GET']
def execute_task():
    payload = request.get_json()
    task = my_background_task.delay(10, 20)                                
    # task = my_background_task.apply_async(args=[10, 20], countdown=60)      # runs every 60s
    
    # task_id = uuid.uuid1()
    # my_background_task.apply_async(args=[10, 20], task_id=task_id)
    
    return jsonify({'task_id': task.id}), 202
    

@app.route('/tasks/<task_id>', methods=['GET']
def execute_task(task_id):
    task_result = AsyncResult(task_id)
    result = {
        'task_id': task_id,
        'task_status': task_result.status,
        'task_result': task_result.result   # or result.get()
    }
    return jsonify(result), 200
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
