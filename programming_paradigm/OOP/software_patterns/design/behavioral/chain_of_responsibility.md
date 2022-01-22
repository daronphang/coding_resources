### Chain of Responsibility

Intent is to avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the reuqest. Chain the receiving objects and pass the request along the chain until an object handles it. First object in chain receives the request and either handles it or forwards it to the next candidate on chain. The object that made the request has no explicit knowledge of who will handle it i.e. request has an implicit receiver.

### Applicability

- When more than one object may handle a request.
- When you want to issue a request to one of several objects without specifying the receiver explicitly.
- The set of objects that can handle a request should be specified dynamically.

### Participants

#### Handler

- Defines an interface for handling requests.

#### ConcreteHandler

- Handles requests it is responsible for.
- Can access its successor.
- If ConcreteHandler can handle the request, it does so; otherwise it forwards the request to its successor.

#### Client

- Initiates the request to a ConcreteHandler object on the chain.

### Collaborations

When a client issues a request, the request propagates along the chain until a ConcreteHandler object takes responsibility for handling it.

### Consequences

#### Reduced coupling

Pattern frees an object from knowing which other object handles a request and hence, can simplify object interconnections.

#### Added flexibility in assigning responsibilities to objects

Gives you added flexibility in distributing responsibilities among objects. Can add or change responsibilities for handling a request by adding to or changing the chain at run-time.

#### Receipt isn't guaranteed

Since a request has no explicit receiver, there's no guarantee it'll be handled.

### Example

```py
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Any, Optional

class Handler(ABC):
    @abstractmethod
    def set_next(self, handler):
        pass

    @abstractmethod
    def handle(self, request):
        pass


class AbstractHandler(Handler):
    _next_handler: Handler = None

    def set_next(self, handler):
        self._next_handler = handler
        return handler

    @abstractmethod
    def handle(self, request):
        if self._next_handler:
            return self._next_handler.handle(request)
        return None


class MonkeyHandler(AbstractHandler):
    def handle(self, request):
        if request == 'banana':
            return "Monkey eats banana"
        else:
            return super().handle(request)


class DogHandler(AbstractHandler):
    def handle(self, request):
        if request == 'meatball':
            return 'Dog eats meatball'
        else:
            return super().handle(request)


if __name__ == "__main__":
    monkey = MonkeyHandler()
    dog = DogHandler()
    monkey.set_next(dog).set_next().set_next()
```
