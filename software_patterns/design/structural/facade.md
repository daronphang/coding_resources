## Description:
A class that provides a simplified interface to a library, a framework or any other complex set of classes. Facade provides convenient access to a particular part of subsystem's functionality. It knows where to direct client's request and how to operate all moving parts. Having a facade is handy when need to integrate app with a complex library that has dozens of features, but only need a single method.

## Problem:
Making code work with a broad set of objects that belong to a complex library/framework. Ordinarily, need to initialize all objects, keep track of dependencies and execute methods in correct order, etc. Hence, business logic of classes would be tightly coupled to implementation details of third-party classes.

## Solution:
1. Declare and implement interface in new facade class.
2. Facade class should redirect calls from client code to appropriate objects of subsystem and initializing them.

## Example:
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
  
    def __init__(self):
        self.washing = Washing()
        self.rinsing = Rinsing()
        self.spinning = Spinning()
  
    def startWashing(self):
        self.washing.wash()
        self.rinsing.rinse()
        self.spinning.spin()
  
""" main method """
if __name__ == "__main__":
  
    washingMachine = WashingMachine()
    washingMachine.startWashing()
```
