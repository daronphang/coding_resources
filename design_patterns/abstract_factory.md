## Description:
Allows you to produce families of related objects without specifying their concrete classes. Factory that returns factories. Provides an easy way to create a similar type of many objects. Terminology:
- Client: Client application that calls Abstract Factory.
- Abstract Factory: Common interface over all sub factories, declares a set of methods that return differnet abstract products.
- Concrete Factory: Sub factory of Abstract Factory and contains methods to create Concrete Product.
- Abstract Product: Interface for product that sub factory returns.
- Concrete Product: Object that is finally returned.


## Problem:
Creating product variants of a product family i.e. chairs, sofas and tables in Victorian, Art Deco and Modern designs. Need to create individual furniture objects so that they match other objects of the same family i.e. Victorian sofa, table and chair. 

## Solution:
1) Explicitly declare interfaces for each distinct product of product family. 
2) All variants of products will follow those interfaces. 
3) Declare the Abstract Factory which is an interface with a list of creation methods for all products.

## Advantages:
- Compatibility between products created by same factory class is guaranteed.
- Cleaner code since new product families can be introduced without breaking existing code.

## Disadvantages:
- Increased complexity in code and number of classes required.

## Example:
```python
import random
from typing import Type

# abstract product 
class Pet:
    def __init__(self, name: str) -> None:
        self.name = name

    def speak(self) -> None:
        raise NotImplementedError

    def __str__(self) -> str:
        raise NotImplementedError

# concrete factory
class Dog(Pet):
    def speak(self) -> None:
        print("woof")

    def __str__(self) -> str:
        return f"Dog<{self.name}>"


class Cat(Pet):
    def speak(self) -> None:
        print("meow")

    def __str__(self) -> str:
        return f"Cat<{self.name}>"

# abstract factory
class PetShop:

    """A pet shop"""

    def __init__(self, animal_factory: Type[Pet]) -> None:
        """pet_factory is our abstract factory.  We can set it at will."""

        self.pet_factory = animal_factory

    def buy_pet(self, name: str) -> Pet:
        """Creates and shows a pet using the abstract factory"""

        pet = self.pet_factory(name)
        print(f"Here is your lovely {pet}")
        return pet


# Additional factories:

# Create a random animal
def random_animal(name: str) -> Pet:
    """Let's be dynamic!"""
    return random.choice([Dog, Cat])(name)


# Show pets with various factories
def main() -> None:
    """
    # A Shop that sells only cats
    >>> cat_shop = PetShop(Cat)
    >>> pet = cat_shop.buy_pet("Lucy")
    Here is your lovely Cat<Lucy>
    >>> pet.speak()
    meow
    # A shop that sells random animals
    >>> shop = PetShop(random_animal)
    >>> for name in ["Max", "Jack", "Buddy"]:
    ...    pet = shop.buy_pet(name)
    ...    pet.speak()
    ...    print("=" * 20)
    Here is your lovely Cat<Max>
    meow
    ====================
    Here is your lovely Dog<Jack>
    woof
    ====================
    Here is your lovely Dog<Buddy>
    woof
    ====================
    """


if __name__ == "__main__":
    random.seed(1234)  # for deterministic doctest outputs
    import doctest

    doctest.testmod()

```
