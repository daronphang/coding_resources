## ES6 Classes and Prototype

Classes are a template for creating objects. They encapsulate data with code to work on that data. Classes are built on prototypes.

All objects inherit properties and methods from a prototype. Object.prototype is on top of the prototype inheritance chain. Prototype allows adding new properties or methods to objects constructors. Prototype property allows new properties to be added to object constructors. Classes are introduced in ES6.

```javascript
// constructor function
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

// ES6 class declaration
class Person {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

Person.prototype.calcAge = function () {
    console.log(2021 - this.birthYear);
};

Person.prototype.language = "English";

const jonas = new Person("Jonas", 1993);
console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("language")); // false
```

### Hoisting

Classes must be defined before they can be constructed which is different from function declarations.

```js
const p = new Rectangle(); // ReferenceError

class Rectangle {}
```

### Constructor

Special method for creating and initializing an object created with a class. There can only be one special method with the name "constructor" in a class. Can use the 'super' keyword to call the constructor of the super class. Method is called automatically when a class is initiated.

Purpose is to create a new object and set values for any existing object properties i.e. constructor function runs after the object is created with predefined properties, and overwrites them.

### Static Members

Static keyword defines a static method or property for a class. Neither static methods/properties can be called on instances of class, but they are called on class itself.

```js
class Example {
    static staticProperty = "hello";
    static staticMethod() {
        return "hello world";
    }
}

console.log(Example.staticProperty);
```

### Class Inheritance

Use extends and super.

```javascript
class Car {
    constructor(brand) {
        this.carname = brand;
    }
    present() {
        return "I have a " + this.carname;
    }
}

class Model extends Car {
    constructor(brand, mod) {
        super(brand);
        this.model = mod;
    }
    show() {
        return this.present() + ", it is a " + this.model;
    }
}

let myCar = new Model("Ford", "Mustang");
document.getElementById("demo").innerHTML = myCar.show();
```
