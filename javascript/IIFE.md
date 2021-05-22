## Immediately Invoked Function Expressions:
Executing a function without having to save it to memory.
```javascript
(function() {
  console.log('once');
})();

(() => console.log('once'))();
```
