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
