### Mediator

Intent is to define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction indepedently.

### Motivation

OOP design encourages the distribution of behavior among objects but may result in an object structure with many connections between objects. Lots of interconnections may result in a monolithic system and can be difficult to change the system's behavior in any significant way as behavior is distributed among many objects.

Can avoid by encapsulating collective behavior in a separate mediator object. A mediator is responsible for controlling and coordinating the interactions of a group of objects i.e. serves as a intermediary that keeps objects in the group from referring to each other explicitly. The objects only know the mediator.

Instead of implementing inside each class the direct communication with other classes (strong coupling), a mediator object is implemented and each class can call this object to communicate with others. For example, Mediator is useful in a situation where there is multiple students and courses available.

https://www.geeksforgeeks.org/mediator-method-python-design-pattern/

### Applicability

Use the Mediator pattern when:

- A set of objects communicate in well-defined but complex ways.
- Reusing an object is difficult as it refers to and communicates with many other objects.
- A behavior that's distributed between several classes should be customizable without a lot of subclassing.

### Participants

#### Mediator

- Defines an interface for communicating with Colleague objects.

#### ConcreteMediator

- Implements cooperative behavior by coordinating Colleague objects.
- Knows and maintains its colleagues.

#### Colleague

- Each Colleague class knows its Mediator object.
- Each Colleague communicates with its Mediator whenever it would have otherwise communicated with another Colleague.

### Collaborations

Colleagues send and receive requests from a Mediator object. The mediator implements cooperative behavior by routing requests between appropriate colleagues.

Colleagues have to communicate with their mediator when an event of interest occurs. One approach is to implement the Observer pattern with Mediator as an Observer and Colleague classes as Subjects. Subjects send notifications to mediator whenever they change state. Mediator responds by propagating effects of the change to other Colleagues.

### Consequences

#### Limits subclassing

A mediator localizes behavior that otherwise would be distributed among several objects. Changing this behavior requires subclassing Mediator only.

#### Decouples colleagues

Promotes loose coupling between colleagues.

#### Simplifies object protocols

Replaces many-to-many interactions with one-to-many interactions between Mediator and its Colleagues.

#### Abstracts how objects cooperate

Making mediation an independent concept and encapsulating it in an object lets you focus how objects interact apart from their individual behavior.

#### Centralizes control

Trades complexity of interaction for complexity in Mediator. Can make itself a monolith that's hard to maintain.

### Example

```py
from __future__ import annotations
from abc import ABC


class Mediator(ABC):
    def notify(self, sender, event):
        pass


class ConcreteMediator(Mediator):
    def __init__(self, component1, component2):
        self._component1 = component1
        self._component1.mediator = self
        self._component2 = component2
        self._component2.mediator = self

    def notify(self, sender, event):
        if event == 'A':
            print('mediator reacts on A and triggers this')
            self._component2.do_c()
        elif event == 'D':
            print('mediator reacts on D and triggers this')
            self._component1.do_b()
            self._component2.do_c()


class BaseComponent:
    "Provides basic functionality of storing a mediator's instance inside component objects"

    def __init__(self, mediator):
        self._mediator = mediator

    @property
    def mediator(self):
        return self._mediator

    @mediator.setter
    def mediator(self, mediator):
        self._mediator = mediator


"Concrete components implement various functionality and don't depend on each other"
class Component1(BaseComponent):
    def do_a(self):
        self.mediator.notify(self, 'A')


class Component2(BaseComponent):
    def do_c(self):
        self.mediator.notify(self, 'A')
```

```py

class Course(object):
    """Mediator class."""

    def displayCourse(self, user, course_name):
        print("[{}'s course ]: {}".format(user, course_name))


class User(object):
    '''A class whose instances want to interact with each other.'''

    def __init__(self, name):
        self.name = name
        self.course = Course()  # helps in preventing unordered code

    def sendCourse(self, course_name):
        self.course.displayCourse(self, course_name)

    def __str__(self):
        return self.name

"""main method"""

if __name__ == "__main__":

    mayank = User('Mayank')   # user object
    lakshya = User('Lakshya') # user object
    krishna = User('Krishna') # user object

    mayank.sendCourse("Data Structures and Algorithms")
    lakshya.sendCourse("Software Development Engineer")
    krishna.sendCourse("Standard Template Library")
```
