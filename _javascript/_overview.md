### Javascript

Lightweight, asynchronous, prototyped-based, interpreted, OOP langauge with first-class functions. First-class functions are treated like other variables i.e. functions can be assigned to variable or passed as an argument or can be returned by another function.

#### Strict Mode

Applies to entire scripts or to individual functions. Doesn't apply to block statements. Makes several changes to normal JS semantics:

1. Eliminates JS silent errors by changing them to throw errors i.e. using undeclared variables.
2. Fixes mistakes that make it difficult for JS engines to perform optimizations.
3. Prohibits some syntax defined in future versions of ECMA.

### Assigning to Multiple Variables

```js
x = y = 15;
{ a, b } = someObject
```

### Checking Types

```js
Array.isArray(someObj);
typeof obj === "string";

// Shorthand for generic validation function that can be configured at runtime
// object validation rules
const schema = {
  first: {
    required: true,
  },
  last: {
    required: true,
  },
};

// universal validation function
const validate = (schema, values) => {
  for (field in schema) {
    if (schema[field].required) {
      if (!values[field]) {
        return false;
      }
    }
  }
  return true;
};

console.log(validate(schema, { first: "Bruce" })); // false
console.log(validate(schema, { first: "Bruce", last: "Wayne" })); // true
```

### Check Similar Conditions of Multiple Variables

If want to check conditions of multiple variables that are similar, can perform arithmetic operations.

```js
const arr1 = []
const arr2 = []

if (arr1.concat(arr2).length === 0) {
  // do something
}
```

### Immediately Invoked Function Expressions

Executing a function without having to save it to memory.

```js
(function () {
  console.log("once");
})();

(() => console.log("once"))();
```

### Shortcircuiting

Returns first value if it's truthy value for || operator. For AND operator, returns falsy value if one of them is false, else the last value.

```javascript
console.log(3 || "Jonas"); // 3
console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); // Jonas
```

### Nullish Coalescing Operator

```javascript
const x = 0 ?? 10; // checks for null or undefined, returns 0
```

### Optional Chaining

Returns undefined if a certain property does not exist i.e. null or undefined.

```javascript
console.log(restaurant.openingHours?.monday?.open);
```

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
