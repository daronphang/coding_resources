### Javascript
Lightweight, asynchronous, prototyped-based, interpreted, OOP langauge with first-class functions. First-class functions are treated like other variables i.e. functions can be assigned to variable or passed as an argument or can be returned by another function.

### Type Conversions
JS does not define different types of numbers like integers, short, long, float, etc. All JS numbers are 64-bit floating point that can either have decimals or without.
```js
Number('3.14')    // 3.14
Number(' ')       // 0
parseFloat()
parseInt()

String(123)
(123).toString()
(123.456).toFixed(2)    // returns a string with specified number of decimals
```

### Checking Types
```js
Array.isArray([1,2,3])      // true
Array.isArray({foo:123})    // false
typeof(x)   // number, string, boolean, undefined 
instanceof(x) // check if variable is an instance of a given class
```

### Assigning to Multiple Variables
```js
x = y = 15;
{ a, b } = someObject
```

### String Manipulation
```js
let str = "Hello world!";
str.slice(-4)                   // "rld!"
str.substr(1, 4)                // "ello"
str.substr(0, str.length - 3)   // "Hello wor"
str.substr(2)                   // "llo world!"
str.substr(0, -2)               // "Hello worl"

// convert number to string with prefix 0
(6).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

// getting character of string
const anyString = "hello world";
console.log(anyString.charAt(0));
```

### Web Workers
Thread refers to a unit capable of executing code. JS was conceived as single-threaded programming language that ran in browser between all tabs i.e. only one set of instructions is executed at any time. However, modern JS offers ways to create additional threads, each executing independently while possibly communicating between one another through use of web workers.

Web Workers are JS scripts executed from HTML page that runs on a background thread away from main execution thread. Can utilize web workers to run process intensive tasks from browser without creating blocking instances.

### Shortcircuiting
Returns first value if it's truthy value for || operator. For AND operator, returns falsy value if one of them is false, else the last value.

```javascript
console.log(3 || 'Jonas')   // 3
console.log(0 && 'Jonas')   // 0
console.log(7 && 'Jonas')   // Jonas
```

### Nullish Coalescing Operator
```javascript
const x = 0 ?? 10   // checks for null or undefined, returns 0
```
### Optional Chaining
Returns undefined if a certain property does not exist i.e. null or undefined.
```javascript
console.log(restaurant.openingHours?.monday?.open); 
```

### Callback Function
A function passed into another function as an argument which is then invoked inside the outer function. Is utilized to limit function from happening as it is not called until the previous line of code is executed. If callback returns a promise, to avoid callback hell, return callback function.
```javascript
function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);
```

