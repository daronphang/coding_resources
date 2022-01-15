### Factory Method

Defines an interface for creating an object, but let subclasses decide which class to instantiate. Can take in a parameter to identify the kind of object to create.

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

### Example

```python
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
