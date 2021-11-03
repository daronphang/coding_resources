## Self Attributes:
```
self.__class__                  Get class of current instance
self.__class__.__base__         Get parent class
self.__class__.__name__
self.__dict__                   Get instance attributes and values in dict format
```

## Class Attribute vs Instance Attribute:
An instance attribute is a Python variable belonging to one object. Variable is only accessible in scope of object and defined inside constructor.

Class attribute belongs to class rather than an instance of an object. Shared between all objects of class and defined outside of constructor. Useful for storing constants Class-wide or defining default values.

```py
class ExampleClass(object):
  class_attr = 0

  def __init__(self, instance_attr):
    self.instance_attr = instance_attr
```

## Super Classes:
For multiple inheritance whereby both classes have same method name, Method Resolution Order (MRO) algorithm comes into play which decides where Python will look for a given method, and which method will be called when there's a conflict. Order is child class, followed by left to right.  

```python
class Mammal(object):
  def __init__(self, mammalName):
    print(mammalName, 'is a warm-blooded animal.')
    
class Dog(Mammal):
  def __init__(self):
    print('Dog has four legs.')
    super().__init__('Dog')
    
d1 = Dog()
```

```python
class Root:
    def draw(self):
        assert not hasattr(super(), 'draw')

class Shape(Root):
    def __init__(self, shapename, **kwds):
        self.shapename = shapename
        super().__init__(**kwds)
    def draw(self):
        print('Drawing.  Setting shape to:', self.shapename)
        super().draw()

class ColoredShape(Shape):
    def __init__(self, color, **kwds):
        self.color = color
        super().__init__(**kwds)
    def draw(self):
        print('Drawing.  Setting color to:', self.color)
        super().draw()

cs = ColoredShape(color='blue', shapename='square')
cs.draw()

```

## Mixin:
A Mixin is a class that provides methods to other classes (a utility class) but not considered as a base class itself i.e. not instantiated by itself. Mixins provide a safe form of multiple inheritance as they enforce a new constraint on classes and can't fall prey to diamond inheritance problems. No limit on number of mixins that can be used to compose a new class. Subclasses that inherit from Mixin only inherit that feature and nothing else.  Useful when:
- Want to provide alot of optional features for a class.
- Want to use one particular feature in alot of different classes.

When inheriting multiple classes/Mixins, order is important. Recommended and logical way to structure order is to make highest to lowest from left to right.
```py
# Mixins should come in first if they override a method defined in base class
class Foo(FirstMixin, SecondMixin, BaseClass):
    pass

class Bar(BaseClass, SecondMixin, FirstMixin):
    pass
```

```python
from .views import View
from .models import Product, Category, Customer, Order

class SingleObjectMixin(object):
    model = None
    def get_object(self, request):
        if self.model is None:
            raise Exception("Model must be set.")
        return self.model.get(id=request.kwargs.get("id")

class ProductView(SingleObjectMixin, View):
    model = Product

class CategoryView(SingleObjectMixin, View):
    model = Category

class CustomerView(SingleObjectMixin, View):
    model = Customer

class OrderView(SingleObjectMixin, View):
    model = Order
```