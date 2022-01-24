### Factory Method

Intent is to define an interface for creating an object, but let subclasses decide which class to instantiate. Can take in a parameter to identify the kind of object to create. Used to create concrete implementations of a common interface. Decision to instantiate a specific class is delegated to subclasses.

### Motivation

Frameworks use abstract classes to define and maintain relationships between objects. Framework is often responsible for creating these objects as well. However, some subclasses are application-specific. Instead of using complex if/elif/else conditional structure (Simple Factory pattern having one creation method with large conditional) to determine the concrete implementation, the application delegates that decision to a separate component that creates the concrete object. For Simple Factory, over time the method may become too big and it would be easier to extract parts of the method to subclasses. Simple Factory is an intermediate step of introducing Factory Method or Abstract Factory.

Factory pattern enhances loose coupling through the creation of an abstract class that will be used to create different types of objects that share some common attributes and functionality. Increases flexibility as shared functionality will not be rewritten having been inherited from the same class.  

### Applicability

- Use when a class can't anticipate the class of objects it must create.
- When a class wants its subclasses to specify the objects it creates.
- When classes delegate responsibility to one of several helper subclasses, and want to localize the knowledge of which helper subclass is the delegate.

### Participants

#### Product

- Defines the interface of objects the factory method creates.

#### ConcreteProduct

- Implements the Product interface.

#### Creator

- Declares the factory method, which returns an object of type Product.
- May call the factory method to create a Product object.

#### ConcreteCreator

- Overrides the factory method to return an instance of a ConcreteProduct.

### Consequences

Factory methods eliminate the need to bind application-specific classes into code.

#### Provides hooks for subclasses

Creating objects inside a class with a factory method is always more flexible than creating an object directly. Factory Method gives subclasses a hook for providing an extended version of an object.

#### Connects parallel class hierarchies

Parallel class hierarchies results when a class delegates some of its responsibilities to a separate class.

### Example (Factory Method)

```py
from __future__ import annotations
from abc import ABC, abstractmethod


class Creator(ABC):
    """
    The Creator class declares the factory method that is supposed to return an
    object of a Product class. The Creator's subclasses usually provide the
    implementation of this method.
    """

    @abstractmethod
    def factory_method(self):
        """
        Note that the Creator may also provide some default implementation of
        the factory method.
        """
        pass

    def some_operation(self):
        """
        Also note that, despite its name, the Creator's primary responsibility
        is not creating products. Usually, it contains some core business logic
        that relies on Product objects, returned by the factory method.
        Subclasses can indirectly change that business logic by overriding the
        factory method and returning a different type of product from it.
        """

        # Call the factory method to create a Product object.
        product = self.factory_method()
        result = f"Creator: The same creator's code has just worked with {product.operation()}"
        return result


"""
Concrete Creators override the factory method in order to change the resulting
product's type.
"""


class ConcreteCreator1(Creator):
    def factory_method(self):
        return ConcreteProduct1()


class ConcreteCreator2(Creator):
    def factory_method(self):
        return ConcreteProduct2()


class Product(ABC):
    @abstractmethod
    def operation(self):
        pass


class ConcreteProduct1(Product):
    def operation(self):
        return "{Result of the ConcreteProduct1}"


class ConcreteProduct2(Product):
    def operation(self):
        return "{Result of the ConcreteProduct2}"


def client_code(creator: Creator):
    """
    The client code works with an instance of a concrete creator, albeit through
    its base interface. As long as the client keeps working with the creator via
    the base interface, you can pass it any creator's subclass.
    """

    print(f"Client: I'm not aware of the creator's class, but it still works.\n"
          f"{creator.some_operation()}", end="")


if __name__ == "__main__":
    print("App: Launched with the ConcreteCreator1.")
    client_code(ConcreteCreator1())
    print("\n")

    print("App: Launched with the ConcreteCreator2.")
    client_code(ConcreteCreator2())
    
    creator_matching = {
        'creator1': ConcreteCreator1(),
        'creator2': ConcreteCreator2(),
    }
    client_code(creator_matching['creator1'])
```

### Example (Simple Factory)

```py
class ShapeFactory:
    def create_shape(self, name):
        if name == 'circle':
            radius = input("Enter the radius of the circle: ")
            return Circle(float(radius))

        elif name == 'rectangle':
            height = input("Enter the height of the rectangle: ")
            width = input("Enter the width of the rectangle: ")
            return Rectangle(int(height), int(width))

        elif name == 'square':
            width = input("Enter the width of the square: ")
            return Square(int(width))

def shapes_client():
    shape_factory = ShapeFactory()
    shape_name = input("Enter the name of the shape: ")

    shape = shape_factory.create_shape(shape_name)

    print(f"The type of object created: {type(shape)}")
    print(f"The area of the {shape_name} is: {shape.calculate_area()}")
    print(f"The perimeter of the {shape_name} is: {shape.calculate_perimeter()}")

```

```
Enter the name of the shape: circle
Enter the radius of the circle: 7

The type of object created: <class '__main__.Circle'>
The area of the circle is: 153.86
The perimeter of the circle is: 43.96
```
