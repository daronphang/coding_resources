## OOP:
Programming paradigm that relies on concept of classes and objects, structuring reusuable pieces of code blueprints (classes) which are used to create individual instances of objects. Classes can share methods and attributes.

## OOP Principles:
1) Inheritance: Child classes inherit data and behaviors from parent class (prototyping in JS).
2) Encapsulation: Containing all important info inside an object and exposing selected.
3) Abstraction: Process of exposing high-level mechanism for using the object (user-interaction).
4) Polymorphism: Defining same functionality in different forms i.e. CalculateSurfaceArea for different shapes.

### Benefits of Encapsulation:
- Added Security: Only public methods and attributes are accessible from outside.
- Protection Against Mistakes: Developers don't accidentally change something that is private. 
- Hide Complexity.

### Encapsulation vs Abstraction:
- Encapsulation is the process of wrapping data and functions into single unit i.e. classes wrapping method/property.
- Encapsulation requries defining fields as private or public. 
- Abstraction refers to hiding implementation details/complexities and exposing functionality only.
- Abstraction focuses on what the object does whereas Encapsulation focuses on how the object does it.
- Abstraction hides data at design level while Encapsulation at implementation level.

```
// to.String() is an abstraction
// how number is converted to string and initialized is encapsulation
int number = 5;
string stringNumber = number.ToString();
```



## Python vs Javascript:
- In Python, everything is an object (every entity has some metatdata and functionality accessible by dot notation).
- In Javascript everything is an object except null, undefined, strings, numbers, boolean and symbols (primitive values).
