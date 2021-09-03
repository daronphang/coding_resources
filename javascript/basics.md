## Javascript:
Lightweight, asynchronous, prototyped-based, interpreted, OOP langauge with first-class functions. First-class functions are treated like other variables i.e. functions can be assigned to variable or passed as an argument or can be returned by another function.

## Type Conversions:
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


## Web Workers:
Thread refers to a unit capable of executing code. JS was conceived as single-threaded programming language that ran in browser between all tabs i.e. only one set of instructions is executed at any time. However, modern JS offers ways to create additional threads, each executing independently while possibly communicating between one another through use of web workers.

Web Workers are JS scripts executed from HTML page that runs on a background thread away from main execution thread. Can utilize web workers to run process intensive tasks from browser without creating blocking instances.

## Shortcircuiting:
Returns first value if it's truthy value for || operator. For AND operator, returns falsy value if one of them is false, else the last value.

```javascript
console.log(3 || 'Jonas')   // 3
console.log(0 && 'Jonas')   // 0
console.log(7 && 'Jonas')   // Jonas
```

## Nullish Coalescing Operator:
```javascript
const x = 0 ?? 10   // checks for null or undefined, returns 0
```
## Optional Chaining:
Returns undefined if a certain property does not exist i.e. null or undefined.
```javascript
console.log(restaurant.openingHours?.monday?.open); 
```

## Callback Function:
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

## Scope:
Scope is the context in which a variable exists; can be local or global. Assignments are not scoped. Variables can be declared in two ways:
1) Using VAR which is function scoped.
2) Using LET and CONST (ES6) which are block scoped {} i.e. within loops, conditionals (for, while, if, switch).
3) LET allows mutation while CONST doesn't.
4) For VAR, will result in undefined if referenced before declaration.
5) For LET and CONST, stay uninitialized (ReferenceError) until declared (ensures variables are declared first).

```javascript
(function() {              //IIFE
    console.log(hero);     //ReferenceError and not undefined as variable has to be declared first though hoisted
    let hero = "Atom";
})();
```

```javascript
var hero = "Batman";
let antiHero = "Captain Cold";
if (true) {
    var hero = "The Flash";         //scope is global as this is declared in block and not function
    let antiHero = "Reverse Flash"; //scope is (local) block-level
    console.log(hero);              //The Flash
    console.log(antiHero);          //Reverse Flash
}
console.log(hero);                  //The Flash
console.log(antiHero);              //Captain Cold
```

## Hoisting:
Behavior in Javascript in which variable and function declarations are moved to the top of their scope i.e. variable can be used before it has been declared. Variables defined with LET and CONST are hoisted but not initialized i.e. cannot be used until it has been declared. However, assigning value to undeclared variable implicitly creates it as a global variable.

```javascript
// hoisting
console.log(x);
var x = 100;

// How JavaScript interpreted it
var x;
console.log(x);   // undefined
x = 100;


// undeclared variables
function hoist() {
  a = 20;
  var b = 100;
}

hoist();
console.log(a); // 20 as 'a' variable is global
console.log(b); // ReferenceError


// example
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element

var x; // Declare x
```
```javascript
carName = "Volvo";
let carName;  // reference error

carName = "Volvo";
const carName;  // code will not run, syntax error
```

### Hoisting Functions:
Function declarations are hoisted, while function expressions are not.

```javascript
// function declaration
hoisted(); // Output: "This function has been hoisted."

function hoisted() {
  console.log('This function has been hoisted.');
};

// function expression
expression(); //Output: "TypeError: expression is not a function

var expression = function() {
  console.log('Will this work?');
};
```

## Closures:
Gives acesss to an outer function's scope from an inner function. When a function renders a function, the rendered function has access to variables not defined in global scope. Closure makes a function remember all variables that existed at the function's birthplace (parent function).

```javascript
const secureBooking = function() {
  let passCount = 0;
  return function() {
    passCount ++; 
    console.log(`${passCount} passengers`);
  };
};

const booker = secureBooking();
booker();   // 1 passengers
booker();   // 2 passengers
```

## Data Storage:
### Cookies:
Employed to store user data (password, preferences, IP address, date/time of visit, etc). Cookies are sent from server via response header. When user loads website, browser sends cookies back to server to notify website of user's previous activity. Have certain life span defined by creators. Stored in server and client browser. Clients can manipulate cookies and hence, should not store sensitive data. On every page visited, cookies can also be sent to another page/server for tracking purposes. Works well together with sessions. Expires when browser is closed on default.

### Cache: 
Temporary storage of web documents such as HTML pages and images in client's browser. Purpose is to reduce bandwidth usage, server load and browser loading. Web cache system stores copies of documents passing through it; subsequent requests may be satisfied from cache if conditions are met. Cache is kept indefinitely. 

### Session: 
Data is stored on server and not on client. Cannot be viewed/manipulated by users and hence, useful for storing sensitive data that should survive across requests. Sessions are identified via Cookies which has an \_id value. Can either be saved on server's memory or in database. 

### Local Storage:
Store data without an end.

## Error Handling:
For synchronous code, use try-catch; then-catch for asynchronous. Can also throw errors to trigger in catch block.
