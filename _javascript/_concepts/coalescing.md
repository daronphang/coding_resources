### Nullish Coalescing Operator (??)

A logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined. Can be seen as a special case of logical OR (||) operator as you may encounter unexpected behaviors if you consider falsy values as usable i.e. 0, ''.

```js
let myText = ""; // An empty string (which is also a falsy value)

let notFalsyText = myText || "Hello world";
console.log(notFalsyText); // Hello world

// nullish avoids this pitfall
let preservingFalsy = myText ?? "Hi neighborhood";
console.log(preservingFalsy); // '' (as myText is neither undefined nor null)
```

### Chaining

```js
null || undefined ?? "foo"; // raises a SyntaxError
true || undefined ?? "foo"; // raises a SyntaxError

(null || undefined) ?? "foo"; // returns "foo"
```
