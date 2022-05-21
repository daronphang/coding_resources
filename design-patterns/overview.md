## Overview

Design patterns are reusable solutions to commonly occurring problems in software design. They are proven solutions, easily reusable and expressive. They lower the size of your codebase, prevent future refactoring, and make your code easier to understand by other developers. Design patterns can be creational, structural, behavioral, concurrency or architectural.

However, applying wrong pattern to given problem could lead to undesirable effects such as unnecessary code complexity, overhead on performance or spawning of new anti-pattern.

Design patterns are all about increasing abstraction in code and hence, objects have less dependencies between them. However, every extra layer of indirection will open up more places for developers to change code. Patterns are best in the hands of framework designers i.e. events as Observer pattern, Prototype pattern in JS, MVC pattern in server-side web frameworks.

The power of design patterns is in communication i.e. easier to say 'use a factory pattern' rather than describing in code. Moreover, these patterns are most likely being used in code long before you knew they had names. When coding web services, most likely are using Facade pattern.

### Creational

Focus on handling object creation mechanisms by controlling the creation process. A basic object creation approach in a program can lead to an added complexity. Patterns include Constructor, Factory, Prototype, Singleton, etc.

### Structural

Deal with object relationships. They explain simple ways to assemble objects and classes into larger structures. Help to ensure that when one part of system changes, the entire structure of system does not need to do the same, keeping them flexible and efficient. Patterns include Module, Decorator, Facade, Adapter, Proxy, etc.

### Behavioral

Patterns focus on improving communication and assignment of responsibilities between dissimilar objects in a system. Patterns include Chain of Responsibility, Command, Observer, Iterator, Strategy, Template, etc.

### Concurrency

Deal with multi-threaded programming paradigms; examples include Active Object, Nuclear Reaction and Scheduler.

### Architectural

Examples include Model-View-Controller, Model-View-Presenter, and Model-View-ViewModel.
