### Adapter

Converts the interface of a class into another interface clients expect i.e. converting XML to JSON format. Adapter wraps an object to hide the complexity of conversion happening behind the scenes. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces. Clients call operations on an Adapter instance. In turn, the adapter calls Adaptee operations that carry out the request.

### Applicability

- When you want to use an existing class, and its interface does not match the one you need.
- When you want to create a reusuable class that cooperates with unrelated or unforeseen classes i.e. classes don't have compatible interfaces.
- When you need to use several existing subclasses, but it's impractical to adapt their interface by subclassing every one. An object adapter can adapt the interface of its parent class (object adapter only).

### Participants

#### Target

- Defines the domain-specific interface that Client uses.

#### Client

- Collaborates with objects conforming to the Target interface.

#### Adaptee

- Defines an existing interface that needs adapting.

#### Adapter

-Adapts the interface of Adaptee to the Target interface.

### Consequences

#### Class Adapter

- Uses multiple inheritance to adapt interfaces.
- Adapts Adaptee to Target by committing to a concrete Adaptee class.
- Lets Adapter override some of Adaptee's behavior since Adapter is a subclass of Adaptee.
- Introduces only one object and no additional pointer indirection is needed.

#### Object Adapter

- Lets a single Adapter work with many Adaptees (Adaptee itself and all its subclasses).
- Adapter can add functionality to all Adaptees at once.
- Makes it harder to override Adaptee behavior.

#### Pluggable Adapters

By building interface adaptation into a class, you eliminate the assumption that other classes see the same interface. In other words, interface adaptation lets us incorporate our class into existing systems that might expect different interfaces to the class.

#### Using two-way adapters to provide transparency

Potential problem with adapters is that they aren't transparent to all clients. Two-way adapters can provide transparency and useful when two different clients need to view an object differently. Multiple inheritance is a viable solution in this case as interfaces of adapted classes are substantially different. Two-way class adapter conforms to both of adapted classes and can work in either system.

### Related Patterns

Bridge has a structure similar to object adapter, but Bridge has a different intent whereby it is meant to separate an interface from its implementation so that they can be varied easily and independently. An adapter is meant to change the interface of an existing object.

### Example

```py
class Target:
    """
    The Target defines the domain-specific interface used by the client code.
    """

    def request(self) -> str:
        return "Target: The default target's behavior."


class Adaptee:
    """
    The Adaptee contains some useful behavior, but its interface is incompatible
    with the existing client code. The Adaptee needs some adaptation before the
    client code can use it.
    """

    def specific_request(self) -> str:
        return ".eetpadA eht fo roivaheb laicepS"


class Adapter(Target, Adaptee):
    """
    The Adapter makes the Adaptee's interface compatible with the Target's
    interface via multiple inheritance.
    """

    def request(self) -> str:
        return f"Adapter: (TRANSLATED) {self.specific_request()[::-1]}"


def client_code(target: "Target") -> None:
    """
    The client code supports all classes that follow the Target interface.
    """

    print(target.request(), end="")


if __name__ == "__main__":
    print("Client: I can work just fine with the Target objects:")
    target = Target()
    client_code(target)
    print("\n")

    adaptee = Adaptee()
    print("Client: The Adaptee class has a weird interface. "
          "See, I don't understand it:")
    print(f"Adaptee: {adaptee.specific_request()}", end="\n\n")

    print("Client: But I can work with it via the Adapter:")
    adapter = Adapter()
    client_code(adapter)
```
