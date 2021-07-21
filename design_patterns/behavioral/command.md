## Description:
Turns a request into an action. Allows you to pass requests as a method argument, delay or queue a request's execution, and support undoable operations. Command serves as links between various GUI and business logic objects i.e. breaking an app into GUI layer and business logic layer. Terminology:
- Command: Can refer to command interface or command class itself.
- Receiver: Class that contains some business logic that is delegated by more complex commands.
- Invoker: Sends a request to the command; associated with one or several commands.

Command method encapsulates a request as an object and hence, allowing objects to be parameterized with different requests i.e. button used to  close window can be used to save or print document. 

Command pattern suggests that GUI objects shouldn't send requests directly to business logic layer; instead, request details such as the object being called, name of method and list of arguments are extracted into a command class with a single method that triggers the request. Command usually has a single execution method that takes no parameters. Commands will also implement the same interface.

## Example:
```python
from abc import ABC, abstractmethod


class Command(ABC):

    @abstractmethod
    def process(self):  # interface declares a method for executing a command
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
    def command(self, cmd):
        self.cmd = cmd
  
    def execute(self):
        self.cmd.process()
  
  
if __name__ == "__main__":
    invoker = Invoker()
    cmd = CommandImplementation('hello world')
    invoker.command(cmd)
    invoker.execute()
    
    receiver = Receiver()
    complex = ComplexCommand(receiver)
    invoker.command(complex)
    invoker.execute()
```

