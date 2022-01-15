### Singleton

Ensures a class only has one instance, and provides a global point of access to it. However, many developers consider this as anti-pattern as it introduces unncessary restrictions in situations where a sole instance of a class is not actually required i.e. makes code more complex, less useful, and difficult to test. Though it may simplify code, it will introduce difficulties later.

### Applicability

- When there must be exactly one instance of a class, and must be accessible to clients from a well-known access point.
- When sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code.

### Participants

#### Singleton

- Defines an Instance operation that lets clients access its unique instance.

### Consequences

#### Controlled access to sole instance

Singleton class encapsulates its sole instance and hence, have strict control over how and when clients access it.

#### Reduced name space

An improvement over global variables by avoiding polluting name space with global variables that store sole instances.

#### Permits refinement of operations and representation

Singleton class may be subclasseed, and it's easy to configure an application with an instance of this extended class.

#### Permits a variable number of instances

Allows more than one instance of Singleton class if needed.

### Implementation

#### Ensuring a unique instance

Common way to do this is to hide the operation that creates the instance behind a class operation that guarantees only one instance is created. This operation has access to the variable that holds the unique instance, and ensures the variable is initialized with the unique instance before returning its value.

Clients access the singleton exclusively through the Instance member function.

#### Subclassing the Singleton class

More flexible approach is to use a registry of singletons. Instead of having Instance define the set of possible Singleton classes, the Singleton classes can register their singleton instance by name in a well-known registry. The registry maps between string names and singletons. Singleton classes can register themselves in their constructor.

### Example

```py
class Singleton:
   __instance = None    # field for storing singleton instance

   @staticmethod
   def getInstance():   # static creation method
      if Singleton.__instance == None:
         Singleton()
      return Singleton.__instance

   def __init__(self):    # private constructor
      """ Virtually private constructor. """
      if Singleton.__instance != None:
         raise Exception("This class is a singleton!")
      else:
         Singleton.__instance = self
s = Singleton()
print s

s = Singleton.getInstance()
print s

s = Singleton.getInstance()
print s
```
