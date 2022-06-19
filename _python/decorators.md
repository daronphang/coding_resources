## Decorators

Structural pattern that allows adding new behaviors to objects dynamically by placing them inside special wrapper objects.
Python decorators allow functions to be wrapped with another function i.e. a function that is passed a function, and returns a callable object.
In most cases, the decorator should return an object to mimic the decorated function, which is performed through wrapper function.

https://medium.com/@vadimpushtaev/decorator-inside-python-class-1e74d23107f6

```py
def mydecorator(f):  # f is the function passed to us from python
    def wrapper():
        print(f'{f} was called.')
        f()
    return wrapper

@mydecorator
def hello():
    print('hello')

>>> hello()
<function hello at 0x7f27738d7510> was called.
hello

def decorator_with_arguments(function):
    def wrapper_accepting_arguments(arg1, arg2):
        print("My arguments are: {0}, {1}".format(arg1,arg2))
        function(arg1, arg2)
    return wrapper_accepting_arguments

@decorator_with_arguments
def cities(city_one, city_two):
    print("Cities I love are {0} and {1}".format(city_one, city_two))
```

### Nested

Top decorator is passed the object from the former.

```python
@a
@b
@c
def hello():
    print('hello')

hello = a(b(c(hello)))
```

### Decorators with Arguments

```py
@decorator
def foo(*args, **kwargs):
    pass

foo = decorator(foo)

# With arguments
@decorator_with_args(arg)
def foo(*args, **kwargs):
    pass

# decorator_with_args is a function that accepts arg and returns actual decorator that will be applied to decorated function
foo = decorator_with_args(arg)(foo)

def sql_connection(is_dict, error_msg):
    def inner_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            with MySQLDBConnectionSession(is_dict) as cursor:
                try:
                    return f(cursor, *args, **kwargs)
                except Exception as e:
                    return '{}, {}'.format(e, error_msg)
        return wrapper
    return inner_decorator
```
