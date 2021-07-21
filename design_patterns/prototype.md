## Description:
Allows cloning of simple and complex objects without coupling to their specific classes. Helps to hide complexity of instances created by the class. The newly created object may have some changes in properties if required. Aims to reduce the number of classes used for an app. Allows to copy existing objects independent of concrete implementation of their classes. Object is created by copying a prototypical instance during run-time. Useful when object creation is an expensive task.

## Advantages:
- Lesser number of subclasses.
- Provides varying values and structure to new objects.

## Disadvantages:
- Overkill of resources for project with few objects.
