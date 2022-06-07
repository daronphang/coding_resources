## Reflection

Reflection is the ability of a program to manipulate variables, projects, and methods of objects at runtime.

Reflect is a built-in object that provides methods for interceptable JS operations. Unlike global objects, Reflect is not a constructor. Cannot be used with 'new' operator, and **all properties/methods are static**.

### API

```
Reflect.apply()             Call a fn with specified arguments
Reflect.construct()         Acts like 'new' operator but as a function
Reflect.defineProperty()    Check if property was successfully defined in object
Reflect.deleteProperty()
Reflect.get()               Return value of the property
Reflect.ownKeys()           Returns an array of owned property keys (not inherited) of an object
Reflect.set()
Reflect.getOwnPropertyDescriptor()
```

### Example

```js
const duck = {
    name: "Maurice",
    color: "white",
    greeting: function () {
        console.log(`Quaaaack! My name is ${this.name}`);
    },
};

Reflect.has(duck, "color"); // true
Reflect.has(duck, "haircut"); // false
Reflect.ownKeys(duck); // [ "name", "color", "greeting" ]
Reflect.set(duck, "eyes", "black");

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

let args = ["John", "Doe"];

let john = Reflect.construct(Person, args);

console.log(john instanceof Person);
console.log(john.fullName); // John Doe
```
