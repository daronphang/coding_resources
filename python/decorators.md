## Decorators:
Structural pattern that allows adding new behaviors to objects dynamically by placing them inside special wrapper objects.
Python decorators allow functions to be wrapped with another function i.e. a function that is passed a function, and returns a callable object.
In most cases, the decorator should return an object to mimic the decorated function, which is performed through wrapper function.
```python
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
```
## Nested:
Top decorator is passed the object from the former.
```python
@a
@b
@c
def hello():
    print('hello')
    
hello = a(b(c(hello)))
```
