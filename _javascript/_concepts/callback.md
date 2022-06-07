### Callback Function

A function passed into another function as an argument which is then invoked inside the outer function. Is utilized to limit function from happening as it is not called until the previous line of code is executed. If callback returns a promise, to avoid callback hell, return callback function.

```javascript
function greeting(name) {
  alert("Hello " + name);
}

function processUserInput(callback) {
  var name = prompt("Please enter your name.");
  callback(name);
}

processUserInput(greeting);
```
