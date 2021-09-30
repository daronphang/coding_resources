## Description:
Popular in GUI components. A subscription mechanism to send notification to multiple objects about any new event that happens to the object they are observing. Pattern can be recognized by subscription methods.  Terminology:
- Publisher: Object with state that notifies other objects wanting to track its change (also called Subject).
- Subscriber: Objects tracking the Publisher's state changes.

All subscribers must implement the same interface and that the publisher communicates with them only via that interface. Interface should declare the notification method along with a set of parameters that the publisher can use to pass some data along with notification.

## Example:
```python
class Subscriber:
    def __init__(self, name):
        self.name = name
    def update(self, message):
        print('{} got message "{}"'.format(self.name, message))
        
class Publisher:
    def __init__(self):
        self.subscribers = set()
    def register(self, who):
        self.subscribers.add(who)
    def unregister(self, who):
        self.subscribers.discard(who)
    def dispatch(self, message):
        for subscriber in self.subscribers:
            subscriber.update(message)


pub = Publisher()

bob = Subscriber('Bob')
alice = Subscriber('Alice')
john = Subscriber('John')

pub.register(bob)
pub.register(alice)
pub.register(john)

pub.dispatch("It's lunchtime!")

pub.unregister(john)

pub.dispatch("Time for dinner")
```
