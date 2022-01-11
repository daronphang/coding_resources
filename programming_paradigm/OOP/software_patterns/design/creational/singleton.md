## Description:
Pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance while protecting it from being overwritten. Common reason is to control access to shared resource.

However, many developers consider this as anti-pattern as it introduces unncessary restrictions in situations where a sole instance of a class is not actually required i.e. makes code more complex, less useful, and difficult to test. Though it may simplify code, it will introduce difficulties later.

## Solution:
1) Make default constructor private to prevent other objects from using 'new' operator with the Singleton class.
2) Create a static creation method that calls private constructor and saves it in static field; subsequent calls will return cached object.

## Example:
```python
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

