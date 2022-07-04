## this Keyword

When a function is defined, it is attached to its enclosing scope via closure. Scope is the set of rules that controls how references to variables are resolved. However, functions also have another characteristic besides their scope that influences what they can access: the **execution context**, and it is exposed to the function via 'this' keyword.

Scope is static and contains a fixed set of variables available at the moment and location you define a function, but a function's execution context is dynamic (regardless of where it is defined or called from).

The 'this' keyword is not a fixed characteristic of a function based on the function's definition, but a dynamic characteristic that's determined each time the function is called.

```js
function classroom(teacher) {
    return function study() {
        console.log(`${teacher} says to study ${this.topic}`);
    };
}
var assignment = classroom("Kyle");

var homework = {
    topic: "JS",
    assignment: assignment,
};

homework.assignment(); // Kyle says to study JS

var otherHomework = {
    topic: "Math",
};

assignment.call(otherHomework); // Kyle says to study Math
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

## Bind, Call, Apply

If 'this' keyword is used inside a function, it will always refer to the object that invokes (calls) the function. However, sometimes we lose this reference.

Fortunately, we can use bind(), call() or apply() to couple a function with an object.

### Bind

Creates a new function that has this keyword set to the provided value. Sets this value now and allows to execute function in future.

```js
var obj = { num: 2 };

function add(a, b) {
    return this.num + a + b;
}

const func = add.bind(obj, 3, 5);

const altFunc = add.bind(obj);
altFunc(3, 5);
```

### Call and Apply

Calls a function with a given this value and arguments provided individually i.e. explicitly specify what this should reference within the calling function.

Difference between bind() and call() is that call() executes the function immediately and does not make a copy of the function it is being called on.

Apply() is same as call() but expects an array of parameters. Call and apply are one-time use methods.

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
    console.log(`${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`);
}

const book1 = summary.apply(book, ["dystopian", 1932]);
const book2 = summary.call(book, "dystopian", 1932);
const book3 = summary.bind(book, "dystopian", 1932);
```
