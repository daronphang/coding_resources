## Instance, Class and Static Methods:
Methods offered by Python to write object-oriented that communicates its intent more clearly and for easier maintenance. 
Help to communicate and enforce developer intent about class design.
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

## Class Method Factories:
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
