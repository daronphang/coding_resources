## Attrinutes

### Get Attributes

```py
hasattr(class_name, 'attr')   # true/false
getattr(class_name, 'attr')   # returns value, else None

def get_method(self, method_name):
  for name in dir(self):
      if method_name == name:
          return getattr(self, method_name)
  abort(400, 'crud method not found')
```

### Self Attributes

```
self.__class__                  Get class of current instance
self.__class__.__base__         Get parent class
self.__class__.__name__
self.__dict__                   Get instance attributes and values in dict format
```

### Class Attribute vs Instance Attribute

An instance attribute is a Python variable belonging to one object. Variable is only accessible in scope of object and defined inside constructor.

Class attribute belongs to class rather than an instance of an object. Shared between all objects of class and defined outside of constructor. Useful for storing constants Class-wide or defining default values.

```py
class ExampleClass(object):
  class_attr = 0

  def __init__(self, instance_attr):
    self.instance_attr = instance_attr
```

## Class Functions with Decorators

If need to pass class/instance attribute to decorator that receives argument, declare the function in initialization.

```py
class CrudOperations:
    def __init__(self, conn_payload, as_dict):
        self.conn_payload = conn_payload
        self.as_dict = as_dict
        self.update_user_settings = mssql_connection_crud_operation(conn_payload, as_dict)(self.update_user_settings)

    def update_user_settings(self, cursor, payload: dict):
        delim = ','
        # Generate list of hexadecimals (8 bytes) for storing in database
        add_oid = ['0x{}'.format(secrets.token_hex(7)) for item in range(len(payload['add_entries']))]

        # Arrays are passed to stored procedure as string of delimited list
        cursor.callproc('myassistant.dbo.update_user_settings', (
            delim,
            payload['username'],
             ','.join(payload['del_did']),
             ','.join(payload['del_step']),
            ','.join(add_oid),
            ','.join([item['did'] for item in payload['add_entries']]),
             ','.join([item['process_step'] for item in payload['add_entries']]),
             ','.join([item['mask_level'] for item in payload['add_entries']]),
             ','.join([item['trav_id'] for item in payload['add_entries']]),
        ))
        return {
            'message': 'update user settings successful'
        }
```

## Super Classes

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

## Mixin

A Mixin is a class that provides methods to other classes (a utility class) but not considered as a base class itself i.e. not instantiated by itself. Mixins provide a safe form of multiple inheritance as they enforce a new constraint on classes and can't fall prey to diamond inheritance problems. No limit on number of mixins that can be used to compose a new class. Subclasses that inherit from Mixin only inherit that feature and nothing else. Useful when:

-   Want to provide alot of optional features for a class.
-   Want to use one particular feature in alot of different classes.

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

## Instance, Class and Static Methods

Methods offered by Python to write object-oriented that communicates its intent more clearly and for easier maintenance. Help to communicate and enforce developer intent about class design:

-   Instance: Takes self parameter which points to an instance of Class object. Can freely access attributes and other methods on same object.
-   Class: Takes cls parameter that points to the class and not object instance. Can modify class state but not instance state.
-   Static: Can neither modify object state nor class state (restricted in what data they can access).

```python
class ClassTest:
    def instance_method(self):      # need object to be created in order to call
        return f'called instance method of {self}'

    @classmethod
    def class_method(cls):          # receives class as first arg, cls refers to the class itself i.e. ClassTest
        return f'class method called'

    @staticmethod                   # a separate function that does not have any info about class/object
    def static_method():            # unable to access or modify object/class state
        return f'static method called'


test = ClassTest()
print(test.instance_method())       # called instance method of <__main__.ClassTest object at 0x000001BCD8AA21C8>
print(ClassTest.class_method())     # class method called
print(ClassTest.static_method())    # static method called
```

## Class Method Factories

Class method is generally used to create factory methods. Factory methods return class object for different use cases.

```python
class Book:
    types = ('hardcover', 'paperback')

    def __init__(self, name, book_type, weight):
        self.name = name
        self.book_type = book_type
        self.weight = weight

    def __repr__(self):
        return f'<Book {self.name}, {self.book_type}, {self.weight}>'

    @classmethod    # method is bound to the class and not the object of the class
    def hardcover(cls, name, page_weight):
        return cls(name, Book.types[0], page_weight + 100)

    @classmethod
    def paperback(cls, name, page_weight):
        return cls(name, Book.types[1], page_weight)


hard_book = Book.hardcover('Harry Potter', 100)
soft_book = Book.paperback('Lord of the Rings', 50)
print(hard_book)    # <Book Harry Potter, hardcover, 200>
print(soft_book)    # <Book Lord of the Rings, paperback, 50>
```

## Repr and Str Method

Special method used to represent class' objects as a string; Pythonic way to control how objects are converted to strings.

```python
class Car:
    def __init__(self, color, mileage):
        self.color = color
        self.mileage = mileage

    def __str__(self):
        return f'a {self.color} car'    # formatted string literal
    # method is called when print() is used; prints object as string

    def __repr__(self):
        return f'<Car {self.color}, {self.mileage}>'
    # to print an unambiguous representation of an object


my_car = Car('red', 1000)
print(my_car)   # a red car or <Car red, 100>
```

## Abstract Classes

A class is an Abstract class if it contains one or more abstract methods (declared but no implementation). A subclass that doesn't implement the abstract methods will throw an error.

```py
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def __init__(self):
        pass

    @abstractmethod
    def feed(self, action):
        pass

    def concrete_method(self):
        # some logic
        return 'hello world!'
```

## Passing Class Parameters to Method Decorators

```py
class DatabaseDecorator:
    @classmethod
    def crud_execution(cls, f):
        def wrapper(self, *args, **kwargs):
            with self._db as db:
                try:
                    results = f(self, *args, **kwargs)
                    self._db.conn.commit()
                    return results
                except Exception as e:
                    self._db.conn.rollback()
                    logger.error(e)
                    abort(400, str(e))
        return wrapper
```

## Getters and Setters

Pythonic way to use getters and setters in OOP. Without property, all programs that make use of class have to be refactored if properties of class change i.e. making attributes private/public.

```py
# Using @property decorator
class Celsius:
    def __init__(self, temperature=0):
        self.temperature = temperature

    def to_fahrenheit(self):
        return (self.temperature * 1.8) + 32

    @property
    def temperature(self):
        print("Getting value...")
        return self._temperature

    @temperature.setter
    def temperature(self, value):
        print("Setting value...")
        if value < -273.15:
            raise ValueError("Temperature below -273 is not possible")
        self._temperature = value


# create an object
human = Celsius(37)

print(human.temperature)

print(human.to_fahrenheit())

coldest_thing = Celsius(-300)
```

```py
# Can use getter, setter and deleter

class House:
	def __init__(self, price):
		self._price = price

	@property
	def price(self):
		return self._price

	@price.setter
	def price(self, new_price):
		if new_price > 0 and isinstance(new_price, float):
			self._price = new_price
		else:
			print("Please enter a valid price")

	@price.deleter
	def price(self):
		del self._price
```
