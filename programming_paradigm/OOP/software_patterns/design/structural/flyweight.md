### Flyweight

Use sharing to support large numbers of fine-grained objects efficiently. Some applications could benefit from using objects throughout their design, but a native implementation would be expensive i.e. document editor with text formatting and using objects to represent characters, figures and tables. Using objects to represent fine-grained elements will consume lots of memory and may incur unacceptable run-time overhead. Each occurrence of a particular object refers to the same instance in the shared flyweight pool. Flyweight objects are immutable.

Flyweight is a shared object that can be used in multiple contexts simultaneously. Acts as an indepedent object in each context i.e. it is indistinguishable from an instance of the object that's not shared. Cannot make assumptions about the context in which they operate. Key concept is the distinction between intrinsic and extrinsic state. Intrinsic state is stored in flyweight whereby it consists of information that's independent of the flyweight's context. Extrinsic state depends on and varies with the flyweight's context and can't be shared. Client objects are responsible for passing extrinsic state.

### Applicability

Pattern's effectiveness depends heavily on how and where it's used. Apply it when all of the following are true:

- An application uses a large number of objects.
- Storage costs are high because of the sheer quantity of objects.
- Most object state can be made extrinsic.
- Many groups of objects may be replaced by relatively few shared objects once extrinsic state is removed.
- Application doesn't depend on object identity.

### Participants

#### Flyweight

- Declares an interface through which flyweights can receive and act on extrinsic state.

#### ConcreteFlyweight

- Implements the Flyweight interface and adds storage for intrinsic state.
- Object must be sharable and any state it stores must be intrinsic.

#### UnsharedConcreteFlyweight

- Not all Flyweight subclasses need to be shared.
- Common for unshared objects to have Concrete Flyweight objects as children.

#### FlyweightFactory

- Creates and managees flyweight objects.
- Ensures flyweight objects are shared properly i.e. supplies an existing instance or creates one if not exists.

#### Client

- Maintains a reference to flyweights.

### Collaborations

Clients should not instantiate ConcreteFlyweight objects directly but exclusively from Factory. Often combined with Composite pattern to represent a hierarchial structure with shared leaf nodes.

### Consequences

#### Run-time costs

Flyweights may introduce run-time costs associated with transferring, finding, and/or computing extrinsic state. However, costs are offset by space savings.

### Example

```py
class ComplexCars:
    def __init__(self):
        pass

    def cars(self, car_name):
        return car_name


class CarFamilies:
    car_family = {}
    def __new__(cls, name, car_family_id):
        try:
            id = cls.car_family[car_family_id]
        except KeyError:
            id = object.__new__(cls)
            cls.car_family[car_family_id] = id
        return id

    def set_car_info(self, car_info):
        cg = ComplexCars()
        self.car_info = cg.cars(car_info)

    def get_car_info(self):
        return self.car_info
```

```py
import json
from typing import Dict


class Flyweight:
    "Stores intrinsic state"
    def __init__(self, shared_state):
        self._shared_state = shared_state

    def operation(self, unique_state):
        s = json.dumps(self._shared_state)
        u = json_dumps(unique_state)


class FlyweightFactory:
    _flyweights: Dict[str, Flyweight] = {}

    def __init__(self, initial_flyweights):
        for state in initial_flyweights:
            self._flyweights[self.get_key(state)] = Flyweight(state)

    def get_key(self, state):
        "Returns a flyweight string hash for a given state"
        return "_".join(sorted(state))

    def get_flyweight(self, shared_state):
        "Returns an existing flyweight with given state or creates a new one"
        key = self.get_key(shared_state)

        if not self._flyweights.get(key):
            self._flyweights[key] = Flyweight(shared_state)
        else:
            print("reusing existing flyweight")
        return self._flyweights[key]

    def list_flyweights(self):
        count = len(self._flyweights)

    def add_car_to_police_database(factory, plates, owner, brand, model, color):
        flyweight = factory.get_flyweight([brand, model, color])
        flyweight.operation([plates, owner])

```
