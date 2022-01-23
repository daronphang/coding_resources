### Abstract Factory

Allows you to produce families of related objects without specifying their concrete classes by declaring the interface only. Each concrete subclass then implements the operations specific for their purpose. Also enforces dependencies between concrete subclasses whereby the constraint is enforced automatically as a consequence of using Abstract Factory.

Each of the factory method creates a different kind of object.

### Applicability

Use the Abstract Factory when:

- A system should be indepedent of how its products are created, composed, and represented.
- A system should be configured with one of multiple families of products.
- A family of related project objects is designed to be used together.
- Want to provide a class library of products, and want to reveal just their interfaces and not implementations.

### Participants

#### Client

- Client application that calls Abstract Factory.

#### Abstract Factory

- Common interface over all sub factories, declares a set of methods that return different abstract products.

#### Concrete Factory

- Sub factory of Abstract Factory and contains methods to create Concrete Product.

#### Abstract Product

- Interface for product that sub factory returns.

#### Concrete Product

- Object that is finally returned.

### Consequences

#### Isolates concrete classes

Helps control the classes of objects that an application creates. As factory encapsulates the responsibility and process of creating product objects, it isolates clients from implementation classes. Clients manipulate instances through abstract interfaces.

#### Makes exchanging product families easy

Classes of concrete factory can be configured easily by changing the concrete factory.

#### Promotes consistency among products

When product objects in a family are designed to work together, it is important that an application use objects from only one family at a time.

#### Supporting new kinds of products is difficult

Extending abstract factories to produce new kinds of products isn't easy as its interface fixes the set of products that can be created.

### Related Patterns

Often implemented with Factory Method, but can be implemented using Prototype. Concrete factory is often a Singleton.

### Example

```python
import abc


class AbstractFactory(metaclass=abc.ABCMeta):
    """
    Declare an interface for operations that create abstract product
    objects.
    """

    @abc.abstractmethod
    def create_product_a(self):
        pass

    @abc.abstractmethod
    def create_product_b(self):
        pass


class ConcreteFactory1(AbstractFactory):
    """
    Implement the operations to create concrete product objects.
    """

    def create_product_a(self):
        return ConcreteProductA1()

    def create_product_b(self):
        return ConcreteProductB1()


class ConcreteFactory2(AbstractFactory):
    """
    Implement the operations to create concrete product objects.
    """

    def create_product_a(self):
        return ConcreteProductA2()

    def create_product_b(self):
        return ConcreteProductB2()


class AbstractProductA(metaclass=abc.ABCMeta):
    """
    Declare an interface for a type of product object.
    """

    @abc.abstractmethod
    def interface_a(self):
        pass


class ConcreteProductA1(AbstractProductA):
    """
    Define a product object to be created by the corresponding concrete
    factory.
    Implement the AbstractProduct interface.
    """

    def interface_a(self):
        pass


class ConcreteProductA2(AbstractProductA):
    """
    Define a product object to be created by the corresponding concrete
    factory.
    Implement the AbstractProduct interface.
    """

    def interface_a(self):
        pass


class AbstractProductB(metaclass=abc.ABCMeta):
    """
    Declare an interface for a type of product object.
    """

    @abc.abstractmethod
    def interface_b(self):
        pass


class ConcreteProductB1(AbstractProductB):
    """
    Define a product object to be created by the corresponding concrete
    factory.
    Implement the AbstractProduct interface.
    """

    def interface_b(self):
        pass


class ConcreteProductB2(AbstractProductB):
    """
    Define a product object to be created by the corresponding concrete
    factory.
    Implement the AbstractProduct interface.
    """

    def interface_b(self):
        pass


def main():
    for factory in (ConcreteFactory1(), ConcreteFactory2()):
        product_a = factory.create_product_a()
        product_b = factory.create_product_b()
        product_a.interface_a()
        product_b.interface_b()


if __name__ == "__main__":
    main()
```
