## Context Manager:
Usage of resources like file operations and database connections is very common but limited in supply; need to release/close them after usage. When creating context
managers using classes, need to have enter() and exit() methods. Both methods allow you to implement objects which can be used easily with the 'with' statement. doesn't require try/finally block as 'with' statement automatically closes connection. 

Both methods are built-in methods for 'with' statement in Python.

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

