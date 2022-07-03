## ES6 Classes and Prototype

All objects inherit properties and methods from a prototype. Object.prototype is on top of the prototype inheritance chain. Prototype allows adding new properties or methods to objects constructors. Prototype property allows new properties to be added to object constructors. Classes are introduced in ES6.

```javascript
// constructor function
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

// ES6
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
