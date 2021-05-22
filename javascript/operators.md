## Shortcircuiting with OR and AND Operators:
For OR operator, returns first value if it is truthy value.  
For AND operator, returns falsy value if either is false. Returns last value if all operands are true.
```javascript
console.log(0 || 'Jonas');  // 'Jonas'
console.log(0 && 'Jonas'); // 0
```
## Nullish Coalescing Operator:
```javascript
const x = 0 ?? 10   // checks for null or undefined, returns 0
```
## Optional Chaining:
Returns undefined if a certain property does not exist i.e. null or undefined.
```javascript
console.log(restaurant.openingHours?.monday?.open); 
```
