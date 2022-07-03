## Closures

Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope. **Closures are not a snapshot but a direct link** and preservation of the variable itself i.e. able to update the variable defined.

Functions in Javascript form closures, not objects. Closure is the combination of a function and the lexical environment within which that function was declared (access to global variables). This environment consists of any local variables that were in-scope at the time the closure was created. When nested functions are created, the inner function has access to scope "above" it.

Closure is a feature where an inner function has access to outer (enclosing) function's variables. When a function renders a function, the rendered function has access to variables not defined in global scope. Closure makes a function remember all variables that existed at the function's birthplace (parent function) i.e. closure of a function remembers variables from the place where it was defined, regardless of where it is executed later. Closures are created every time a function is created. In some languages, local variables within a function exist for just the duration of that function's execution.

Every closure has three scopes:

1. Local Scope (own scope).
2. Outer Functions Scope.
3. Global Scope.

```js
function greeting(msg) {
    return function who(name) {
        console.log(`${msg}, ${name}!`);
    };
}

var hello = greeting("Hello");
var howdy = greeting("Howdy");

/* 
When greeting() finishes, we expect all its variables to be garbage collected
However, they don't because of closure as the inner function instances are still alive
Their closures are still preserving the 'msg' variables from outer function 
*/

hello("Kyle");
// Hello, Kyle!

hello("Sarah");
// Hello, Sarah!

howdy("Grant");
// Howdy, Grant!
```

## Lexical Scoping

Lexical (static) scope is the ability for a function to access variables from the parent scope i.e. the child function is lexically bound by that of the parent function. No scope may access any variables from the functions defined inside it.

An item's lexical scope is the place in which the item got created. Only code within an item's lexical scope can access it.

```js
// lexical scope for myName is global scope
const myName = "hello world";

function init() {
    var name = "Mozilla"; // name is a local variable created by init
    function displayName() {
        // displayName() is the inner function, a closure
        alert(name); // use variable declared in the parent function
    }
    displayName();
}
init();
```

## Sequence of Events from Closure

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
var X = outer(); // outer() invoked the first time, X is referenced to the inner function
var Y = outer(); // outer() invoked the second time
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

1. Variable b created and set to 10, and variable c is created and set to 100.
2. variable a is created and set to 20.
3. Next line is function declaration which is returned from the outer function.
4. Return statement does not execute the function (only when it is followed by () but returns entire body of function).
5. Inner function is returned and assigned to X where only variable b is enclosed and still exists as a closure within inner.
6. Closure captures variable b from the lexical scope.
7. Outer function completes execution, and variable c no longer exist.
8. When X() is invoked, variable a is created and set to 20, and value of b is from closure value.
9. X() completes execution and variable a ceased to exist but b is preserved as closure and continues to exist.

## Examples

```js
// global scope
var e = 10;
function sum(a) {
    return function sum2(b) {
        return function sum3(c) {
            // outer functions scope
            return function sum4(d) {
                // local scope
                return a + b + c + d + e;
            };
        };
    };
}

var sum2 = sum(1);
var sum3 = sum2(2);
var sum4 = sum3(3);
var result = sum4(4);
console.log(result); //log 20
```

```javascript
const secureBooking = function () {
    let passCount = 0;
    return function () {
        passCount++;
        console.log(`${passCount} passengers`);
    };
};

const booker = secureBooking();
booker(); // 1 passengers
booker(); // 2 passengers
```
