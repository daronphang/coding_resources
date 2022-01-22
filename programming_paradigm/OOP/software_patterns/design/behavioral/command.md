### Command

Intent is to encapsulate a request as an object and hence, leeting you parameterize clients with different requests, queue or log requests, and support undoable operations.

### Motivation

Turns a request into an action. Command serves as links between various GUI and business logic objects i.e. breaking an app into GUI layer and business logic layer. Command pattern suggests that GUI objects shouldn't send requests directly to business logic layer; instead, request details such as the object being called, name of method and list of arguments are extracted into a command class with a single method that triggers the request. Command usually has a single execution method that takes no parameters. Commands will also implement the same interface.

Sometimes it is necessary to issue requests to objects without knowing anything about the operation being requested or the receiver of the request i.e. toolkits have objects like buttons and menus that carry out a request in response to user input, but it can't implement explicitly as applications that use the toolkit know what should be done on which object.

Command pattern turns requests into an object that can be passed/stored around like other objects. Key to this pattern is an abstract Command class, which declares an interface for executing operations. Object that issues a request only needs to know how to issue it; it doesn't need to know how the request will be carried out.

### Applicability

Use when you want to:

- Parameterize objects by an action to perform; can express parameterization with a callback function.
- Specify, queue, and execute requests at different types; Command object can have lifetime indepedent of the original request.
- Support undo as the Command's execute operation can store state for reversing its effects in the command itself.
- Support logging changes so that they can be reapplied in case of system crash.
- Structure a system around high-level operations built on primitives operations.

### Participants

#### Command

- Declares an interface for executing an operation.

#### ConcreteDemand

- Defines a binding between a Receiver object and an action.

#### Client

- Creates a ConcreteCommand object and sets its receiver.

#### Invoker

- Asks the command to carry out the request.

#### Receiver

- Knows how to perform the operations associated with carrying out a request.

### Collaborations

- Client creates a ConcreteCommand object and specifies its receiver.
- Invoker object stores the ConcreteCommand object.
- Invoker issues a request by calling Execute on the command; when commands are undoable, ConcreteCommand stores state for undoing the command prior to invoking Execute.
- ConcreteCommand object invokes operations on its receiver to carry out the request.

### Consequences

- Command decouples the object that invokes the operation from the one that knows how to perform it.
- Commands are first-class objects which can be manipulated and extended like any other object.
- Can assemble commands into a composite command.
- Easy to add new Commands as you don't have to change existing classes.

### Example

```py
from abc import ABC, abstractmethod


class Command(ABC):
    'interface declares a method for executing a command'
    @abstractmethod
    def process(self):
        pass


class CommandImplementation(Command):
    def __init__(self, payload):
        self.payload = payload

    def process(self):
        print(self.payload)


class ComplexCommand(Command):
    """
    Some commands can delegate more complex operations to other
    objects, called "receivers."
    """

    def __init__(self, receiver)
        self.receiver = receiver

    def process(self):
        self.receiver.perform_action()


class Receiver:
    def perform_action(self):
        print('Action performed in receiver.')


class Invoker:
    def command(self, command):
        self.command = command

    def execute(self):
        self.command.process()


if __name__ == "__main__":
    invoker = Invoker()
    cmd = CommandImplementation('hello world')
    invoker.command(cmd)
    invoker.execute()

    receiver = Receiver()
    complex_obj = ComplexCommand(receiver)
    invoker.command(complex_obj)
    invoker.execute()
```
