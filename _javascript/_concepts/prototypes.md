## Prototypes

A characteristic of an object and resolution of a property access. Can be thought of as a linkage between two objects; the linkage occurs when an object is created and is linked to another object that already exists.

Purpose of prototype linkage is so that accesses against object B for properties/methods that B does not have, are delegated to object A to handle. Delegation through the prototype chain only applies for accesses to lookup the value in a property.

```js
var homework = {
    topic: "JS",
};

// default prototype linkage connects to Object.prototype
// which has built-in methods like toString(), valueOf()
homework.toString();
```
