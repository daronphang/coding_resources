## Currying

A concept of functional programming. Currying is a function that takes one argument at a time and returns a new function expecting the next argument i.e. dividing function with multiple args into a sequence of smaller functions with a single arg, with each returning a new function. It is a transformation of functions that translates a function from callable as f(a,b,c) into callable as f(a)(b)(c).

Curried functions are constructed by chaining closures whereby the argument is saved in the lexical environment. Currying requires the function to have a fixed number of arguments.

Most implementations of currying are advanced and keeps the original function callable in the multi-argument variant i.e. allows a function to be called both normally and partially.

### Why use currying?

-   Checking method to ensure everything you need is present before proceeding.
-   Helps to avoid passing the same variable again and again.
-   Makes function pure and less prone to errors and side effects.
-   Used in functional programming to create a higher-order function (accepts fn as arg or returns fn).

### Use Cases

-   Can be used to manipulate DOM.
-   Can be used to trigger event listeners.
-   Can be used to when you want to create a function that receives single arg.

### Basic Implementation

```js
// non curried version
const sum = (a, b, c) => {
    return a + b + c;
};

// curried
// if it doesn't receive 3 args, it will not be complete
const addCurry = (a) => {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
};
console.log(addCurry(2)(3)(5)); // 10

// curried alternative
const addCurryAlt = (f) => {
    return function (a) {
        return function (b) {
            return function (c) {
                return f(a, b, c);
            };
        };
    };
};
let curriedSum = addCurryAlt(sum);
console.log(curriedSum(2)(3)(5));
```

```js
const sendRequest = (greet) => (name) => (message) => `${greet} ${name}, ${message}`;
sendRequest("Hello")("John")("Please can you add me to your Linkedin network?");
```

### Real Life Example

Instead of always passing date, we can curry it and avoid repeating.

```js
function log(date, importance, message) {
    alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

log = _.curry(log); // lodash library

// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message
```

### Advanced Implementation

Currying creates nesting functions according to the number of arguments of the function. If there is no argument, there is no currying.

If passed args count is the same or more than the original function has in its definition (func.length), then just pass the call to it using func.apply(). If called again, we either get a new partial (if not enough arguments), or the result itself.

```js
const curry = (fn) => {
    return (curried = (...args) => {
        if (fn.length !== args.length) {
            return curried.bind(null, ...args); // bind creates a new function
        }
        return fn(...args);
    });
};

const totalNum = (x, y, z) => {
    return x + y + z;
};

const curriedTotal = curry(totalNum);
console.log(curriedTotal(10)(20)(30));
```

```js
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            // pass the call to it using func.apply, no currying
            // 1 argument left in curried()
            return func.apply(this, args);
        } else {
            return function (...args2) {
                // do not call func yet, pass another wrapper, partial currying
                // muliple args left in curried() i.e. curried(a)(b)
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

function sum(a, b, c) {
    return a + b + c;
}

let curriedSum = curry(sum);

alert(curriedSum(1, 2, 3)); // 6, still callable normally
alert(curriedSum(1)(2, 3)); // 6, currying of 1st arg
alert(curriedSum(1)(2)(3)); // 6, full currying
```

### Currying vs Partial Application

Partial application transforms a function into another function with smaller arity (number of arguments a function takes). Currying transforms a function into a sequence of unary functions, each taking a single argument.

```js
// partial application
function volume(l) {
    return (w, h) => {
        return l * w * h;
    };
}

const hCy = volume(70);
hCy(203, 142);
```
