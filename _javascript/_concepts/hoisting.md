### Hoisting

Behavior in Javascript in which variable and function declarations are moved to the top of their scope i.e. variable can be used before it has been declared. Variables defined with LET and CONST are hoisted but not initialized i.e. cannot be used until it has been declared. However, assigning value to undeclared variable implicitly creates it as a global variable.

```javascript
// hoisting
console.log(x);
var x = 100;

// How JavaScript interpreted it
var x;
console.log(x); // undefined
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
elem.innerHTML = x; // Display x in the element

var x; // Declare x
```

```javascript
carName = "Volvo";
let carName;  // reference error

carName = "Volvo";
const carName;  // code will not run, syntax error
```

### Hoisting Functions

Function declarations are hoisted, while function expressions are not.

```javascript
// function declaration
hoisted(); // Output: "This function has been hoisted."

function hoisted() {
  console.log("This function has been hoisted.");
}

// function expression
expression(); //Output: "TypeError: expression is not a function

var expression = function () {
  console.log("Will this work?");
};
```
