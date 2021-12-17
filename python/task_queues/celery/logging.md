### Logging


### Celery Task Logger
Special logger that exposes task_id and task_name parameters. 

```python
from celery.utils.log import get_task_logger
from worker import app

logger = get_task_logger(__name__)

@app.task()
def add(x, y):
    result = x + y
    logger.info(f'Add: {x} + {y} = {result}')
    return result
```
