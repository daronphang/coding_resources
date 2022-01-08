### Error Object

```js
// Creates a new error object
const error = new Error("hello world");
error.statusCode = 500;
console.log({ message: error.message, status: error.statusCode });

// get full stack trace
error.stack;
```

### Promise Reject

Inbuilt function that returns a Promise object which has been rejected.

```js
const p = new Promise((resolve, reject) => {
  reject("promise failed!"); // or Promise.reject()
});
p.catch((err) => {
  console.log(err);
});
```

### Throw

Execution of current function will stop when throw() is used (statements after throw() won't be executed). Control will be passed in first catch block in callstack. If no catch block exists, program will terminate. Throw() can be used in try-catch block and not only with promises.

```js
function getRectArea(width, height) {
  if (isNaN(width) || isNaN(height)) {
    throw "Parameter is not a number!";
  }
}

try {
  getRectArea(3, "A");
} catch (e) {
  console.error(e);
  // expected output: "Parameter is not a number!"
}
```

### Reject vs Throw

1. Cannot use throw() if there is an async callback function inside the Promise (uncaught exception).

```js
const p = new Promise((resolve, reject) => {
  // Asynchronous function called within the Promise.
  setTimeout(() => {
    throw "promise failed!";
  }, 1000);
});

// The catch block will not be able to recognize the
// error thrown. It will become an uncaught exception.
p.catch((err) => {
  console.log(err);
});
```
