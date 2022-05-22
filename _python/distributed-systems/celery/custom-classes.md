## Custom Classes

All tasks inherit from app.Task class.

```py
class _AddTask(app.Task):
    def run(self, x, y):
        return x + y

@app.task
def add(x, y):
    return x + y

add = app.tasks[_AddTask.name]
```

Custom classes can be useful to cache resources.

```py
from celery import Task

class DatabaseTask(Task):
    _db = None

    @property
    def db(self):
        if self._db is None:
            self._db = Database.connect()
        return self._db


@app.task(base=DatabaseTask)
def process_rows():
    for row in process_rows.db.table.all():
        process_row(row)
```

### App-wide usage

Argument should either be a string giving python path to Task class or class itself.

```py
from celery import Celery

app = Celery('tasks', task_cls='your.module.path:DatabaseTask')
```

## Handlers

Celery has the following built-in handlers: before_start, after_return, on_failure, on_retry.

https://docs.celeryproject.org/en/stable/userguide/tasks.html

```py
from celery import Task

class DebugTask(Task):
    abstract = True

    def after_return(self, *args, **kwargs):
        print('Task returned: {0!r}'.format(self.request)
```
