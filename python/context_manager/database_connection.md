### Database Connection

Function that executes query in database is decorated with database context manager. Connection is passed to the query function as an implicit value. Cursor is used to execute statements to communicate with database and gives ability to have separate working environments through the same connection to the database.

```
# cursor methods
execute()
executemany()
fetchall()
fetchone()
fetchmany()
```

```python
import os
import logging
import psycopg2
from psycopg2 import extras

database = os.environ.get('DATABASE')
db_user = os.environ.get('DB_USER')
db_password = os.environ.get('DB_PASSWORD')
db_host = os.environ.get('DB_HOST')


def context_manager_decorator(func):
    def wrapper(*args, **kwargs):
        conn = psycopg2.connect(database=database,user=db_user, password=db_password, host=db_host)
        try:
            rv = func(conn, *args, **kwargs)     # connection passed as an implicit value
        except psycopg2.Error:
            conn.rollback()
            logging.error("database connection error")
        else:
            conn.commit()
        finally:
            conn.close()
        return rv
    return wrapper


@context_manager_decorator
def query_func(conn, username, password):
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)     # converting rows into dictionaries
    query = "SELECT * FROM table WHERE username = %s and password_hash = %s;"
    placeholder = (username, password)
    cursor.execute(query, placeholder)

    if cursor.rowcount > 0:
        result = cursor.queryall()
    else:
        result = ''
    return result


example = query_func('admin', 'admin')      # do not need to pass conn variable as it is implicit
```
