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
Functions in Javascript form closures. Closure is the combination of a function and the lexical environment within which that function was declared (access to global variables). This environment consists of any local variables that were in-scope at the time the closure was created. When nested functions are created, the inner function has access to scope "above" it. 

Closure is a feature where an inner function has access to outer (enclosing) function's variables. When a function renders a function, the rendered function has access to variables not defined in global scope. Closure makes a function remember all variables that existed at the function's birthplace (parent function) i.e. closure of a function remembers variables from the place where it was defined, regardless of where it is executed later. Closures are created every time a function is created. In some languages, local variables within a function exist for just the duration of that function's execution.

Every closure has three scopes:
1) Local Scope (own scope).
2) Outer Functions Scope.
3) Global Scope.

```js
function outerFunc() {
  // the outer scope
  let outerVar = 'I am outside!';
  function innerFunc() {
    // the inner scope
    console.log(outerVar); // => logs "I am outside!"
  }
  innerFunc();
}
outerFunc();
```

### Lexical Scoping:
Lexical (static) scoping means that inside the inner scope you can access variables of outer scopes. Lexical scope consists of outer scopes determined statically.

```js
// lexical scoping uses the location where a variable is declared within the source code to determine where it is available
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init();
```

### Sequence of Events from Closure:
```js
function outer() {
var b = 10;
var c = 100;
   function inner() {
        
         var a = 20; 
         console.log("a= " + a + " b= " + b);
         a++;
         b++;
    }
   return inner;
}
var X = outer();  // outer() invoked the first time, X is referenced to the inner function
var Y = outer();  // outer() invoked the second time
//end of outer() function executions
X(); // X() invoked the first time
X(); // X() invoked the second time
X(); // X() invoked the third time
Y(); // Y() invoked the first time

// a=20 b=10
// a=20 b=11
// a=20 b=12
// a=20 b=10
```

Sequence of events:
1) Variable b created and set to 10, and variable c is created and set to 100.
2) variable a is created and set to 20.
3) Next line is function declaration which is returned from the outer function.
4) Return statement does not execute the function (only when it is followed by () but returns entire body of function).
5) Inner function is returned and assigned to X where only variable b is enclosed and still exists as a closure within inner.
6) Closure captures variable b from the lexical scope. 
7) Outer function completes execution, and variable c no longer exist.
8) When X() is invoked, variable a is created and set to 20, and value of b is from closure value.
9) X() completes execution and variable a ceased to exist but b is preserved as closure and continues to exist.


### Examples:
```js
// global scope
var e = 10;
function sum(a){
  return function sum2(b){
    return function sum3(c){
      // outer functions scope
      return function sum4(d){
        // local scope
        return a + b + c + d + e;
      }
    }
  }
}

var sum2 = sum(1);
var sum3 = sum2(2);
var sum4 = sum3(3);
var result = sum4(4);
console.log(result) //log 20
```

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