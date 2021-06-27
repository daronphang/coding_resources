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
Scope is the context in which a variable exists; can be local or global. Assignments are not scoped. Variables can be declared in two ways:
1) Using VAR which is function scoped.
2) Using LET and CONST (ES6) which are block scoped {} i.e. within loops, conditionals (for, while, if, switch).
3) LET allows mutation while CONST doesn't.
4) For VAR, will result in undefined if referenced before declaration.
5) For LET and CONST, stay uninitialized (ReferenceError) until declared.

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
