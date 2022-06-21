## Functions

Functions are objects that are linked to Function.prototype (which is itself linked to Object.prototype). Every function is also created with two hidden properties: the function's context and the code that implements the function's behavior. As functions are objects, they can be stored in variables, objects, arrays, and passed as arguments to functions and returned from functions, and can also have methods.

```js
const someFunc = () => {};
someFunc.prototype; // value is an object with .constructor property whose value is the function
```

## Invocation

Special feature about functions is that they can be invoked. Invoking a function suspends the execution of current function and passing control/parameters to new function. Every function receives two additional parameters: _this_ and _arguments_. _This_ parameter's value is determined by invocation pattern.

Javascript does not produce run-time error when number of arguments and parameters do not match. Additional parameters supplied will be ignored, and missing parameters will be substituted with _undefined_.

### Method Invocation Pattern

When a function is stored as property of an object, it is called a _method_. When the method is invoked, _this_ is bound to that object.

### Function Invocation Pattern

When a function is invoked as a function, _this_ is bound to the global object which is a design error. A consequence of this error is that a method cannot employ an inner function to help it do its work as the inner function does not share the method's access to the object. Workaround is to define a variable and assign its value of _this_.

```js
someObject.double = function () {
    const that = this;
    const helper = function () {
        that.value = add(that.value, that.value);
    };
    helper();
};
```

## Arguments

Bonus parameter available to functions. Gives the function access to all arguments that were supplied with invocation, including excess arguments that were not assigned to parameters.

```js
const sum = function () {
  const i, sum = 0;
  for (i = 0, i < arguments.length, i+=1) {
    sum += arguments[i];
  }
}

document.writeIn(sum(4, 8, 15, 16, 23, 42));  // 108
```

## Memoization

Functions can use objects to remember the results of previous operations and making it possible to avoid unncessary work.

```js
var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for (var i = 0; i <= 10; i += 1) {
    // called 11 times, but function is called 453 times
    document.writeln(i + fibonnacci(i));
}

// can keep memoized results in memo array that is hidden in closure
// called 11 times but fib function now is called only 29 times
var fibonacci = (function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== "number") {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
})();
```
