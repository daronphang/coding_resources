# Context Manager:
Usage of resources like file operations and database connections is very common but limited in supply; need to release/close them after usage. When creating context
managers using classes, need to have enter() and exit() methods.

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


