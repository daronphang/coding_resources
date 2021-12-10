### Deep vs Shallow Copying
Shallow copy is bit-wise copy of an object (copying reference address only) i.e. both variables have same address and hence point to same memory location. Deep copy (cloning) means all values of new variable are copied and disconnected from original variable (different addresses are allocated).

When copying primitive data types (number, string, boolean, undefined, null), it will be deep copy. 
```js
const a = 5;
let b = a;
b= 6;
console.log(a) // 5
```

For arrays and objects, assigning a new variable (shallow copy) just creates a pointer (reference) to that value.
```js
const person = {
    firstName: 'John',
    lastName: 'Doe'
};

// shallow copy using spread operator
let p1 = {...person};

// shallow copy using object.assign()
let p2 = Object.assign({}, person);

// deep copy using JSON
let p3 = JSON.parse(JSON.stringify(person));
```
