## Javascript

Lightweight, asynchronous, prototyped-based, interpreted language with first-class functions. First-class functions are treated like other variables i.e. functions can be assigned to variable or passed as an argument or can be returned by another function. Supports multi-paradigms including OO, procedural and FP.

JS is a compiled langauge i.e. source code is parsed before executed, and we are informed of static errors before execution. The parsed code is then converted into a binary form, which is subsequently executed and does not switch back line-by-line execution.

Flow for a JS source program:

1. After a program leaves a developer's editor, it gets transpiled by Babel, then packed by Webpack (along with other build processes), and finally gets delivered in a different form to a JS engine.
2. JS engine parses the code to an AST (Abstract Syntax Tree).
3. The engine converts that AST to an optimized (binary) form, which is then refined/converted further by the optimizing JIT compiler.
4. Finally, the JS VM executes the program.

### Strict Mode

Applies to entire scripts or to individual functions. Doesn't apply to block statements. Makes several changes to normal JS semantics:

1. Eliminates JS silent errors by changing them to throw errors i.e. using undeclared variables.
2. Fixes mistakes that make it difficult for JS engines to perform optimizations.
3. Prohibits some syntax defined in future versions of ECMA.

## Function Expressions/Declarations

A declared function is "saved for later use" and will be executed later when invoked. A function expression can be stored in a variable which can be used as a function.

Differences are as follows:

-   Function declarations are hoisted while expressions are not.
-   With function expressions, you can use it immediately after it is defined, but function declarations have to wait until the entire script has been parsed.
-   Function expressions can be used as an argument to another function.
-   Function expressions can be anonymous.

```js
// declaration
function myFunction() {
    // do something
}

// expression
const getRectArea = function (width, height) {
    return width * height;
};

console.log(getRectArea(3, 4));
```

## Assigning to Multiple Variables

```js
x = y = 15;
{ a, b } = someObject
```

## Check Similar Conditions of Multiple Variables

If want to check conditions of multiple variables that are similar, can perform arithmetic operations.

```js
const arr1 = [];
const arr2 = [];

if (arr1.concat(arr2).length === 0) {
    // do something
}
```

## Immediately Invoked Function Expressions

Executing a function without having to save it to memory.

```js
(function () {
    console.log("once");
})();

(() => console.log("once"))();
```

## Shortcircuiting

Returns first value if it's truthy value for || operator. For AND operator, returns falsy value if one of them is false, else the last value.

```javascript
console.log(3 || "Jonas"); // 3
console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); // Jonas
```

## Optional Chaining

Returns undefined if a certain property does not exist i.e. null or undefined.

```javascript
console.log(restaurant.openingHours?.monday?.open);
```

## Deep vs Shallow Copying

Shallow copy is bit-wise copy of an object (copying reference address only) i.e. both variables have same address and hence point to same memory location. Deep copy (cloning) means all values of new variable are copied and disconnected from original variable (different addresses are allocated).

When copying primitive data types (number, string, boolean, undefined, null), it will be deep copy.

```js
const a = 5;
let b = a;
b = 6;
console.log(a); // 5
```

### Objects

Assigning a new variable (shallow copy) just creates a pointer (reference) to that value.

```js
const person = {
    firstName: "John",
    lastName: "Doe",
};

// shallow copy using spread operator
let p1 = { ...person };

// shallow copy using object.assign()
let p2 = Object.assign({}, person);

// deep copy using JSON
let p3 = JSON.parse(JSON.stringify(person));
```

### Arrays

Shallow copy of an array means only top-level elements containing primitive values (strings, integers) are copied, but nested objects or arrays inside the array will still be referenced.

```js
// shallow copy
let shallowArr = [...fruits];

shallowArr = fruits.slice();

shallowArr = Array.from(fruits);

// deep copy
let deepCopyArr = JSON.parse(JSON.stringify(fruits));
```
