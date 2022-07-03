## Namespaces and Scope

A namespace is a collection of currently defined names along with information about the object that each name references. It is a system that has a unique name for each and every object in Python. Python maintains a namespace in the form a Python dictionary in which keys are the object names and values are objects themselves.

A lifetime of a namespace depends upon the scope of objects; if the scope of an object ends, the lifetime of that namespace ends. Not possible to access inner namespace's objects from an outer namespace.

Python has four namespaces including Local, Enclosing, Global and Built-in (LEGB).

### Built-In

Contains the names of all Python's built-in objects i.e. AttributeError, callable, dict, dir,list, zip.

```py
print(dir(__builtins__))
```

### Global

Contains any names defined at the level of the main program.

```py
print(type(globals()))
print(globals())
```

### Enclosing and Local

Interpreter creates a new namespace whenever a function executes. That namespace is local to the function and remains in existence until the function terminates.

```py
def f():
    x = 'hi' # enclosing scope
    def g():
        x = 'hello' # local scope
        print(x)
    g()
    return
```
