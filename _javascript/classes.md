### ES6 Classes and Prototype

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

### Getters and Setters

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

### Bind

Creates a new function that has this keyword set to the provided value. Sets this value now and allows to execute function in future.

```javascript
var pokemon = {
  firstname: "Pika",
  lastname: "Chu ",
  getPokeName: function () {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  },
};

var pokemonName = function (snack, hobby) {
  console.log(this.getPokeName() + "I choose you!");
  console.log(this.getPokeName() + " loves " + snack + " and " + hobby);
};

var logPokemon = pokemonName.bind(pokemon); // creates new object and binds pokemon. 'this' of pokemon === pokemon now

logPokemon("sushi", "algorithms"); // Pika Chu  loves sushi and algorithms
```

### Call and Apply

Calls a function with a given this value and arguments provided individually i.e. explicitly specify what this should reference within the calling function. Difference between bind() is that call() can accept additional parameters, executes immediately and does not create a new function. Apply() is same as call() but expects an array of parameters. Call and apply are one-time use methods.

```javascript
var pokemon = {
  firstname: "Pika",
  lastname: "Chu ",
  getPokeName: function () {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  },
};

var pokemonName = function (snack, hobby) {
  console.log(this.getPokeName() + " loves " + snack + " and " + hobby);
}; // pokemon.getPokeName()

pokemonName.call(pokemon, "sushi", "algorithms"); // Pika Chu  loves sushi and algorithms
pokemonName.apply(pokemon, ["sushi", "algorithms"]); // Pika Chu  loves sushi and algorithms
```

```javascript
var person = {
  fullName: function (city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  },
};
var person1 = {
  firstName: "John",
  lastName: "Doe",
};
person.fullName.call(person1, "Oslo", "Norway");

// Another example
const book = {
  title: "Brave New World",
  author: "Aldous Huxley",
};

function summary(genre, year) {
  console.log(
    `${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`
  );
}

const book1 = summary.apply(book, ["dystopian", 1932]);
const book2 = summary.call(book, "dystopian", 1932);
const book3 = summary.bind(book, "dystopian", 1932);
```
