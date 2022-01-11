### Tight-Coupling
When a group of classes are highly dependent on one another. Scenario arises when a class assumes too many responsibilities, or when one concern is spread over many classes rather than having its own class. Reduces flexibility and resusability of code, and makes changes more difficult and impedes testability. 

### Loose-Coupling
Achieved by means of design that promotes single-responsibility and separation of concerns. A loosely-coupled class can be consumed and tested independently of other concrete classes. Interfaces are a powerful tool to use for decoupling. Classes can communicate through interfaces rather than own concrete classes, and any class can be on the other end of that communication simply by implementing the interface.

When writing software, change is inevitable; loose-coupling enables changes to be made easily and quickly without bugs i.e. output response in CSV/JSON, connections to different databases, testing. 
