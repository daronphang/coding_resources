## Shorthand Notations:
### Ternary Operator:
```javascript
const x = 20;
let answer;

if (x > 10) {
    answer = "greater than 10";
} else {
    answer =  "less than 10";
}

// Shorthand
const answer = x > 10 ? "greater than 10" : "less than 10";

// Nested if
const answer = x > 10 ? "greater than 10" : x < 5 ? "less than 5" : "between 5 and 10";
```
### Short-Circuit Evaluation:
When assigning a variable value to another variable, you may want to ensure that the source variable is not null, undefined, or empty. You can either write a long if statement with multiple conditionals, or use a short-circuit evaluation.
```javascript
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}

// Shorthand
const variable2 = variable1  || 'new';

let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}

// Shorthand
const dbHost = process.env.DB_HOST || 'localhost';
```
### Declaring Variables:
```javascript
let x;
let y;
let z = 3;

// Shorthand
let x, y, z=3;
```
### If Presence:
```javascript
if (likeJavaScript === true)

// Shorthand
if (likeJavaScript) or if (!likeJavaScript) // latter for checking if false
```
### For Loop:
```javascript
const fruits = ['mango', 'peach', 'banana'];
for (let i = 0; i < fruits.length; i++)

// Shorthand
for (let fruit of fruits)

// Accessing index only
for (let index in fruits)

// Accessing keys in dictionaries
const obj = {continent: 'Africa', country: 'Kenya', city: 'Nairobi'}
for (let key in obj)
  console.log(key) // output: continent, country, city
  
// Array.forEach
function logArrayElements(element, index, array) {
  console.log("a[" + index + "] = " + element);
}
[2, 5, 9].forEach(logArrayElements);
// a[0] = 2
// a[1] = 5
// a[2] = 9
```
### Decimal Base Exponents:
```javascript
for (let i = 0; i < 10000; i++) {}

// Shorthand
for (let i = 0; i < 1e7; i++) {}

// All the below will evaluate to true
1e0 === 1;
1e1 === 10;
1e2 === 100;
1e3 === 1000;
1e4 === 10000;
1e5 === 100000;

```
### Object Property:
```javascript
const x = 1920, y = 1080;
const obj = { x:x, y:y };

// Shorthand
const obj = { x, y };
```
### Arrow Functions:
```javascript
function sayHello(name) {
  console.log('Hello', name);
}

setTimeout(function() {
  console.log('Loaded')
}, 2000);

list.forEach(function(item) {
  console.log(item);
});

// Shorthand
sayHello = name => console.log('Hello', name);

setTimeout(() => console.log('Loaded'), 2000);

list.forEach(item => console.log(item));
```
### Implicit Return:
```javascript
function calcCircumference(diameter) {
  return Math.PI * diameter
}

// Shorthand
calcCircumference = diameter => (
  Math.PI * diameter;
)
```
### Default Parameter:
Can define default values in the function declaration itself.
```javascript
function volume(l, w, h) {
  if (w === undefined)
    w = 3;
  if (h === undefined)
    h = 4;
  return l * w * h;
}

// Shorthand
volume = (l, w = 3, h = 4 ) => (l * w * h);

volume(2) //output: 24
```
### Template Literals:
```javascript
const welcome = `You have logged in as ${first} ${last}`;
```
### Destructuring Assignemnts:
```javascript
const observable = require('mobx/observable');
const action = require('mobx/action');
const runInAction = require('mobx/runInAction');

const store = this.props.store;
const form = this.props.form;
const loading = this.props.loading;
const errors = this.props.errors;
const entity = this.props.entity;

// Shorthand
import { observable, action, runInAction } from 'mobx';

const { store, form, loading, errors, entity } = this.props;
```
### Multi-line String:
```javascript
// Use backticks
const lorem = `Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor`
```
### Spread Operator:
```javascript
// joining arrays
const odd = [1, 3, 5];
const nums = [2 ,4 , 6].concat(odd);

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice()

// Shorthand
// joining arrays
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];       // can insert anywhere inside another array
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = [...arr];
```
### Mandatory Parameter:
```javascript
function foo(bar) {
  if(bar === undefined) {
    throw new Error('Missing parameter!');
  }
  return bar;
}

// Shorthand
mandatory = () => {
  throw new Error('Missing parameter!');
}

foo = (bar = mandatory()) => {
  return bar;
}
```
### Array.find:
```javascript
const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
]

function findDog(name) {
  for(let i = 0; i<pets.length; ++i) {
    if(pets[i].type === 'Dog' && pets[i].name === name) {
      return pets[i];
    }
  }
}

// Shorthand
pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }
```
### Object[key]:
Foo.bar can be written as Foo['bar']. 
```javascript
function validate(values) {
  if(!values.first)
    return false;
  if(!values.last)
    return false;
  return true;
}

console.log(validate({first:'Bruce',last:'Wayne'})); // true

// Shorthand for generic validation function that can be configured at runtime
// object validation rules
const schema = {
  first: {
    required:true
  },
  last: {
    required:true
  }
}

// universal validation function
const validate = (schema, values) => {
  for(field in schema) {
    if(schema[field].required) {
      if(!values[field]) {
        return false;
      }
    }
  }
  return true;
}


console.log(validate(schema, {first:'Bruce'})); // false
console.log(validate(schema, {first:'Bruce',last:'Wayne'})); // true
```
### Double Bitwise NOT:
Use as a replacement for Math.floor() which performs operation much faster.
```javascript
Math.floor(4.9) === 4  //true

// Shorthand
~~4.9 === 4  //true
```
### Converting String into Number:
```javascript
const num1 = parseInt("100");
const num2 =  parseFloat("100.01");

\\ Shorthand
const num1 = +"100"; // converts to int data type
const num2 =  +"100.01"; // converts to float data type
```
### Object Property:
```javascript
let fname = { firstName : 'Black' };
let lname = { lastName : 'Panther'}

let full_names = Object.assign(fname, lname);   // merge into one object


