## Description:
Factory method provides factory interfaces for creating objects. Interfaces define generic structure, but don't initialize objects.

## Example:
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
