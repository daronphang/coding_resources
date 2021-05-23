## ES6 Classes and Prototype:
All objects inherit properties and methods from a prototype. Object.prototype is on top of the prototype inheritance chain. Prototype allows adding new properties or methods to objects constructors.
```javascript
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
