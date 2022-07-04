## Objects

Simple types are numbers, strings, booleans, null and undefined. All other values are objects i.e. arrays, functions, regular expressions, and objects. Objects are mutable keyed collections. Javascript includes prototype linkage feature that allows one object to inherit properties of another which reduces initialization time and memory consumption.

```js
const objectLiteral = {};

objectLiteral.firstProp = "hello";

// Copies all enumerable own properties and returns modified object
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const modifiedTarget = Object.assign(target, source);

console.log(target); // both the same; {a: 1, b: 4, c: 5}
console.log(modifiedTarget);

objectLiteral["nickname"] = undefined; // for performance boost but key still exists
delete objectLiteral.nickname; // deleting property
```

### Prototype

Every object is linked to a prototype object from which it can inherit properties. All objects created from object literals are linked to Object.prototype. Prototype link has no effect on updating i.e. making changes to an object (adding/deleting properties) won't affect its prototype.

Prototype link is used only in retrieval. When retrieving a property value from object, if the object lacks the name, Javascript will attempt to retrieve the property from the prototype object. If it is still lacking, Javascript goes to its prototype until the process bottoms out with Object.prototype. This process is known as delegation.

As best practice, do not change Object.prototype as future libraries or Javascript versions may incorporate similar naming.

```js
const person = {
    isHuman: false,
    printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    },
};

// creates new object by using an existing object as prototype of newly created object
const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"
```

### Property Reflection

```js
// Checking if property exists
const hero = { name: "Batman" };

// does not look at prototype chain i.e. checks the direct object
// ignores inherited properties
// returns false for ES6 class getters and methods
hero.hasOwnProperty("name");

if ("name" in hero) {
    console.log("hello");
}

// undefined and TypeError exception
objectLiteral.name; // undefined
objectLiteral.name.model; // throws TypeError
objectLiteral.name && objectLiteral.name.model; // guards exception
```

### Object Enumeration

```javascript
let user = {
  name: "John",
  age: 30
};
Object.keys(user)       // ["name", "age"]
Object.values(user)     // ["John", 30]
Object.entries(user)    // [["name","John"], ["age",30]]

// Looping over keys and values
const openingHours = {restaurant.openingHours};
for (const day of Object.keys(openingHours) {
console.log(day);

for (const day of Object.values(openingHours) {
console.log(day);
}

// Looping over entire object
// entries method returns an array of [key, value] pairs
const entries = Object.entries(openingHours)
for (const [key, {open, close}] of entries) {
    console.log(`on ${key} we open at ${open} and close at ${close}`);
}
```
