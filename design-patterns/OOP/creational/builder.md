### Builder

Separates the construction of a complex object from its representation so that the same construction process can create different representations. Each converter class is called a **builder** in the pattern, and the reader is called **director**.

Pattern helps in building complex object using simple objects and uses an algorithmic approach.

### Applicability

- Algorithm for creating a complex object should be independent of the parts that make up the object and how they're assembled.
- Cosntruction process must allow different representations for the object that's constructed i.e. products produced by concreteBuilders should differ in their representation and not need an abstract class.

### Participants

#### Builder

- Specifies an abstract interface for creating parts of a Product object. Main purpose is to define an interface for creating products while its subclasses do the actual work.

#### ConcreteBuilder

- Constructs and assembles parts of the product by implementing the Builder interface.
- Defines and keeps track of the representation it creates.
- Provides an interface for retrieving the product.

#### Director

- Constructs an object using the Builder interface.

#### Product

- Represents the complex object under construction. ConcreteBuilder builds the product's internal representation and defines the process by which it's assembled.
- Includes classes that define the constituent parts, including interfaces for assembling the parts into the final result.

### Consequences

#### Allow variation of a product's internal representation

Builder object provides the director with an abstract interface for constructing the product. The interface lets the builder hide the representation and internal structure of the product.

#### Isolates code for construction and representation

Builder pattern improves modularity by encapsulating the way a complex object is constructed and represented. Each ConcreteBuilder contains all the code to create and assemble a particular kind of product. Different Directors can reuse it to build Product variants from the same set of parts.

#### Gives finer control over construction process

Builder pattern contructs the product step by step under the Director's control. Only when the product is finished does the Director retrieve it from the Builder.

### Related Patterns

Abstract Factory is similar to Builder in that it may construct complex objects. Primary difference is that Builder's pattern focuses on constructing a complex object step by step. Abstract Factory's emphasis is on families of product objects. Builder returns the product as a final step, but Abstract Factory returns the product immeadiately. A Composite is what the Builder often builds.

### Example

```py
from abc import ABC, abstractmethod

class Builder(ABC):
    @property
    @abstractmethod
    def product(self):
        pass

    @abstractmethod
    def product_part_a(self):
        pass

    @abstractmethod
    def product_part_b(self):
        pass

    @abstractmethod
    def product_part_c(self):
        pass


class ConcreteBuilder1(Builder):
    # Provides the specific implementations of building steps
    def __init__(self):
        # a fresh builder instance should contain a blank product object
        self.reset()

    def reset(self):
        self.product = Product1()

    @property
    def product(self):
        # usual practice to reset after producing a product
        product = self._product
        self.reset()
        return product

    def product_part_a(self):
        self._product.add('Part1')

    def product_part_b(self):
        self._product.add('Part2')

    def product_part_c(self):
        self._product.add('Part3')


class Product1:
    def __init__(self):
        self.parts = []

    def add(self, part: Any):
        self.parts.append(part)

    def list_parts(self):
        print(f'Product parts: {','.join(self.parts)}', end="")


class Director:
    # Responsible for executing the building steps in a particular sequence
    def __init__(self):
        self._builder = None

    @property
    def builder(self):
        return self._builder

    @builder.setter
    def builder(self, builder: builder):
        self._builder = builder

    def build_minimal_product(self):
        self.builder.produce_part_a()

    def build_full_product(self):
        self.builder.produce_part_a()
        self.builder.produce_part_b()
        self.builder.produce_part_c()


if __name__ == "__main__":
    director = Director()
    builder = ConcreteBuilder1()
    director.builder = builder

    director.build_minimal_product()
    builder.product.list_parts()
```
