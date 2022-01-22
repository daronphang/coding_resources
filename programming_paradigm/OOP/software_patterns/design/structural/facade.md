### Facade

Provides a unified interface to a set of interfaces in a subsystem such as a library, framework, or complex set of classes. Facade defines a higher-level interface that makes the subsystem easier to use. Structuring a system into subsystems helps reduce complexity. Common design goal is to minimize communication and dependencies between subsystems which can be achieved through the introduction of a facade object that provides a simplified interface to the more general facilities of a subsystem.

Clients communicate with subsystem by sending requests to Facade, which forwards them to the appropriate subsystem objects. Facade may have to translate its interface to subsystem interfaces. Clients that use facade don't have to access its subsystem objects directly. It knows where to direct client's request and how to operate all moving parts. Having a facade is handy when need to integrate app with a complex library that has dozens of features, but only need a single method.

### Applicability

- When you want to provide a simple interface to a complex subsystem; most patterns will result in more and smaller classes but becomes harder to use for clients.
- When there are many dependencies between clients and implementation classes of an abstraction; facade will decouple the subsystem from clients and other subsystems and hence, promoting subsystem independence and portability.
- When you want to layer your subsystems i.e. defining an entry point to each subsystem level.

### Participants

#### Facade

- Knows which subsystem classes are responsible for a request.
- Delegates client requests to appropriate subsystem objects.

#### SubsystemClasses

- Implement subsystem functionality.
- Handle work assigned by Facade object.
- Have no knowledge of facade.

### Consequences

#### Shields clients from subsystem component

Reduces the number of objects that clients deal with.

#### Promotes weak coupling between subsystem and clients

Often components in a subsystem are tightly coupled. Weak coupling allows you to vary the components of subsystem without affecting its clients. Can also eliminate complex/circular dependencies. Reducing compilation dependencies is vital in large software systems; want to save time by minimizing recompilation when subsystem classes change. Facade also simplifies porting systems to other platforms.

### Example

```python
class Washing:
    '''Subsystem # 1'''

    def wash(self):
        print("Washing...")


class Rinsing:
    '''Subsystem # 2'''

    def rinse(self):
        print("Rinsing...")


class Spinning:
    '''Subsystem # 3'''

    def spin(self):
        print("Spinning...")


class WashingMachine:
    '''Facade'''

    # implementing subsystems
    def __init__(self):
        self.washing = Washing()
        self.rinsing = Rinsing()
        self.spinning = Spinning()

    # Client requests are delegated to the appropriate subsystems
    def startWashing(self):
        self.washing.wash()
        self.rinsing.rinse()
        self.spinning.spin()

""" main method """
if __name__ == "__main__":

    washingMachine = WashingMachine()
    washingMachine.startWashing()
```
