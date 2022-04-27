### Proxy (Surrogate)

Provides a surrogate or placeholder for another object to control access to it (on-demand). One reason for controlling access to an object is to defer the full cost of its creation and initialization until when actually need to be used i.e. opening a document editor with graphical objects but not all are visible at same time. Proxy creates the real object when it is asked to be instantiated by forwarding requests directly to the object and hence, must keep a reference to that object after creating it.

### Applicability

Proxy is applicable whenever there is a need for more versatile/sophisticated reference to an object than a simple pointer:

- Remote proxy provides a local representative for an object in a different address space.
- Virtual proxy creates expensive objects on demand.
- Protection proxy controls access to an original object i.e. for different rights.

### Participants

#### Proxy

- Maintains a reference that lets proxy access the real subject.
- Provides an interface identical to Subject's.
- Controls access to the real object and may be responsible for creating/deleting it.

#### Subject

- Defines the common interface for RealSubject and Proxy.

#### RealSubject

- Defines the real object that proxy represents.

### Collaborations

Proxy forwards requests to RealSubject when appropriate.

### Consequences

#### Indirection

Proxy pattern introduces a level of indirection when accessing an object. For instance, remote proxy can hide the fact that an object resides in a different address space.

#### Copy-on-Write

Another optimization that the Proxy pattern can hide from client is copy-on-write i.e. related to creation on demand. Copying a large and complicated object can be an expensive operation and proxy can postpone the copying process and hence, reduces cost of copying heavyweight objects.

Subject must be reference counted for it to work. Copying the proxy will simply incremeent the reference count. When the client requests an operation that modifies the subject, the proxy must decrement the subject's reference count. When reference count goes to zero, subject gets deleted.

### Example

```py
from abc import ABC, abstractmethod


class Subject(ABC):
    "Interface declaring common operations for both RealSubject and Proxy"
    @abstractmethod
    def request(self):
        pass


class RealSubject(Subject):
    "Contains core business logic"
    def request(self):
        print('hello')


class Proxy(Subject):
    "Interface identical to RealSubject"
    def __init__(self, real_subject):
        self._real_subject = real_subject

    def request(self):
        "Common applications are lazy loading, catching, controlling access, logging, etc"
        if self.check_access():
            self._real_subject.request()

    def check_access(self):
        return True
```
