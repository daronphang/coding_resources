## Context Manager

Usage of resources like file operations and database connections is very common but limited in supply; need to release/close them after usage. When creating context managers using classes, need to have enter() and exit() methods. Both methods allow you to implement objects which can be used easily with the 'with' statement. doesn't require try/finally block as 'with' statement automatically closes connection.

Both methods are built-in methods for 'with' statement in Python. Alternative is to use touch().

```py
from pathlib import Path

fle = Path('data.py')
fle.touch(exist_ok=True)
f = open(fle)
```

To create a file if not exist, use open() context manager.

```
r       Read mode
w       Write mode
r+      Read/Write mode
a       Append mode
a+      Append/Read mode
x       Exclusive creating mode
```

```python
with open('example.txt', 'r') as f:
    json.load(f)        // read json file; json.loads() for reading json string
    json.dump(f)        // convert dict to json object
    print(f.read())     // f.write()
    lines = file.readlines()
    lines = [line.strip() for line in f]

# f.closed      // true
```

```python
class ContextManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_value, exc_traceback):
        # to handle errors during the execution of the with block
        # if errors occur during when creating class, need to handle try catch separately
        self.file.close()


with ContextManager('example.txt', 'w') as f:
    f.write('message you want to add')
    print(f.closed)     # True
```

```python
class MSSQLDBConnectionSession:
    def __init__(
        self,
        host: str,
        username: str,
        password: str,
        port: str,
        as_dict: bool
    ):  # noqa
        self.conn = p.connect(
            host=host,
            user=username,
            password=password,
            # database=database
            port=port
        )
        self.as_dict = as_dict

    # makes a database connection and return it
    def __enter__(self):
        return self.conn.cursor(as_dict=self.as_dict)

    # makes sure the db connection gets closed
    def __exit__(self, exc_type, exc_value, exc_traceback):
        self.conn.close()
        if exc_type or exc_value:
            logger.error(exc_type, exc_value, exc_traceback)
            raise ConnectionAbortedError
        return True

    def _generate_db_conn_string(self, **kwargs):
        full_conn_string = kwargs['conn_string'].\
            replace('username', kwargs['username']).\
            replace('password', kwargs['password'])
        return full_conn_string

```

```python
 # conn_payload is current_app.config['TSMSSPROD06'] which returns a dict of host, username, password, port
def query(self, conn_payload: dict, as_dict: bool):
        with MSSQLDBConnectionSession(
            host=conn_payload['host'],
            username=conn_payload['username'],
            password=conn_payload['password'],
            port=conn_payload['port'],
            as_dict=as_dict
        ) as conn:
            conn.execute(self.sql_string)
            result = conn.fetchall()
        if result:
            return result
        else:
            return None
```

### Saving data as JSON

```
json.dump(data,file)    Write Python serialized object as JSON formatted data into a file, used as context manager
json.dumps(data)        Converts a Python object into JSON string object, useful while feeding info to APIs 
```
