## Repr and Str Method:
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
