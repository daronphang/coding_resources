## ES6 Classes and Prototype:
All objects inherit properties and methods from a prototype. Object.prototype is on top of the prototype inheritance chain. Prototype allows adding new properties or methods to objects constructors. Prototype property allows new properties to be added to object constructors. Classes are introduced in ES6.
```javascript
// constructor function
const Person = function(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}

// ES6
class Person {
    constructor(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

Person.prototype.calcAge = function(){
    console.log(2021 - this.birthYear);
};

Person.prototype.language = "English";

const jonas = new Person('Jonas', 1993);
console.log(jonas.hasOwnProperty('firstName'));     // true
console.log(jonas.hasOwnProperty('language'));      // false
```

## Class Inheritance:
Use extends and super.
```javascript
class Car {
  constructor(brand) {
    this.carname = brand;
  }
  present() {
    return 'I have a ' + this.carname;
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  show() {
    return this.present() + ', it is a ' + this.model;
  }
}

let myCar = new Model("Ford", "Mustang");
document.getElementById("demo").innerHTML = myCar.show();
```
## Getters and Setters:
Getters are used to bind an object property to a function that is called when that property is looked up. Setters are used to execute a function whenever a property is attempted to be changed.

```javascript
let user = {
  name: "John",
  surname: "Smith"
  
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
  
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

alert(user.fullName);
user.fullName = "Alice Cooper";
```

## Call, Apply and Bind Methods:
Used to set this keyword to the provided value. The call() takes arguments separately while apply() takes arguments as an array. Bind method creates a new function
with an explicitly bound this; call and apply are one-time use methods.
```javascript
var person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}
var person1 = {
  firstName:"John",
  lastName: "Doe"
}
person.fullName.call(person1, "Oslo", "Norway");

// Another example
const book = {
  title: 'Brave New World',
  author: 'Aldous Huxley',
}

function summary(genre, year) {
  console.log(
    `${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`,
  )
}

const book1 = summary.apply(book, ['dystopian', 1932]);
const book2 = summary.call(book, 'dystopian', 1932);
const book3 = summary.bind(book, 'dystopian', 1932);
```
