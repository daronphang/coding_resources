## Cookies vs Session vs Local:
- Cookies allow apps to store data in client's browser.
- Session storage allows apps to store data until window is closed.
- Local storage lets apps store data without an end.

## Callback Function:
A function passed into another function as an argument which is then invoked inside the outer function. Is utilized to limit function from happening as it is not called until the previous line of code is executed.
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
Collection of variables and rules for how they are accessed by name. Each function gets its own scope. Only code inside function can access the function's scoped variables. Two scopes are local and global (delcared outside of block). LET and CONST are block-scoped {} i.e. local scope is created from any kind of blocks like function, if statements, for and while loops. Variables declared inside a block cannot be accessed from outside.

## Hoisting:
Behavior in Javascript in which variable and function declarations are moved to the top of their scope i.e. variable can be used before it has been declared. Variables defined with LET and CONST are hoisted but not initialized i.e. cannot be used until it has been declared.
```javascript
console.log(x);
var x = 100;

// How JavaScript interpreted it
var x;
console.log(x);
x = 100;

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
