### Template

Intent is to define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.

### Motivation

A template method defines an algorithm in terms of abstract operations that subclasses override to provide concrete behavior.

An example incldues a Chatbot application that uses data mining techinques to analyze data of corporate documents, which may come in format of XML, CSV, or PDF. Analyzing and processing parts are identical in almost all cases whereas they differ in dealing with the data.

Pattern allows us to create a base class that contains some number of steps needed to complete a process. When steps are defined, it becomes possible to create one or more concrete classes and overwrite the template steps, without overwriting the entire process.

### Applicability

Should be used:

- To implement the invariant parts of an algorithm once and leave it up to subclasses to implement the behavior that can vary.
- When common behavior among subclasses should be factored and localized in a common class to avoid code duplication.
- To control subclasses extensions.

### Participants

#### AbstractClass

- Defines abstract primitive operations that concrete subclasses define to implement steps of an algorithm.
- Implements a template method defining the skeleton of an algorithm.

#### ConcreteClass

- Implements primitive operations to carry out subclass-psecific steps of the algorithm.

### Collaborations

ConcreteClass relies on AbstractClass to implement the invariant steps of the algorithm.

### Consequences

Template methods are a fundamental technique for code reuse and particularly important in class libraries. They also lead to an inverted control structure that is referred to as "the Hollywood Principle" which is "Don't call us, we'll call you". In other words, parent class calls the the operations of a subclass and not the other way around.

Template methods call the following operations:

- Concrete operations
- Concrete AbstractClass operations
- Primitive operations
- Factory methods
- Hook operations, which provide default behavior that subclasses can extend if necessary. Hook operation does nothing by default.

### Example

```py
from abc import ABC, abstractmethod


class AbstractClass(ABC):
    "Skeleton that composes of calls to abstract primitive operations"

    def template_method(self):
        self.base_operation1()
        self.required_operation1()
        self.hook1()
        self.required_operations2()
        self.hook2()

    "Base operations already have implementations"
    def base_operation1(self):
        print("hello")

    "Required_operations have to be implemented in subclasses"
    @abstractmethod
    def required_operations1(self):
        pass

    @abstractmethod
    def required_operations2(self):
        pass

    "Subclasses may override hooks, but not mandatory. Have empty implementation"
    def hook1(self):
        pass

    def hook2(self):
        pass


class ConcreteClass1(AbstractClass):
    "Have to implement all abstract operations of base class"
    def required_operations1(self):
        print("hello world")

    def required_operations2(self):
        print("awesome")

    def hook1(self):
        print("some hook")
```
