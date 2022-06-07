## Deep vs Shallow Copying

Shallow copy is bit-wise copy of an object (copying reference address only) i.e. both variables have same address and hence point to same memory location. Deep copy (cloning) means all values of new variable are copied and disconnected from original variable (different addresses are allocated).

When copying primitive data types (number, string, boolean, undefined, null), it will be deep copy.

```js
const a = 5;
let b = a;
b = 6;
console.log(a); // 5
```

### Objects

Assigning a new variable (shallow copy) just creates a pointer (reference) to that value.

```js
const person = {
  firstName: "John",
  lastName: "Doe",
};

// shallow copy using spread operator
let p1 = { ...person };

// shallow copy using object.assign()
let p2 = Object.assign({}, person);

// deep copy using JSON
let p3 = JSON.parse(JSON.stringify(person));
```

### Arrays

Shallow copy of an array means only top-level elements containing primitive values (strings, integers) are copied, but nested objects or arrays inside the array will still be referenced.

```js
// shallow copy
let shallowArr = [...fruits];

shallowArr = fruits.slice();

shallowArr = Array.from(fruits);

// deep copy
let deepCopyArr = JSON.parse(JSON.stringify(fruits));
```
