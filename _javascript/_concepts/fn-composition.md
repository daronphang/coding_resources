## Function Composition

Function composition is the process of combining two or more functions to produce a new function i.e. snapping together a series of pipes for our data to flow through.

```
f(g(x)) = f <- g <- x
```

### Without Composition

Converting user's full name to URL slugs:

1. Split name into an array on spaces.
2. Map the name to lower case.
3. Join with dashes.
4. Encode the URI component.

```js
const toSlug = (input) =>
    encodeURIComponent(
        input
            .split(" ")
            .map((str) => str.toLowerCase())
            .join("-")
    );
```

### With Composition

Functions are evaluated from right to left. For Lodash, provided by flowRight().

```js
import { curry, map, join, split, compose } from "lodash/fp";

const curry =
    (fn) =>
    (...args) =>
        fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const join = curry((str, arr) => arr.join(str));

const toLowerCase = (str) => str.toLowerCase();

const split = curry((splitOn, str) => str.split(splitOn));

const compose =
    (...fns) =>
    (x) =>
        fns.reduceRight((v, f) => f(v), x);

const toSlug = compose(encodeURIComponent, join("-"), map(toLowerCase), split(" "));

console.log(toSlug("JS Cheerleader")); // 'js-cheerleader'
```

### Pipe Operator (Left to Right)

Functions are evaluated from left to right. For lodash, "pipe" composition is provided by flow().

```js
const pipe =
    (...fns) =>
    (x) =>
        fns.reduce((v, f) => f(v), x);

const fn1 = (s) => s.toLowerCase();
const fn2 = (s) => s.split("").reverse().join("");
const fn3 = (s) => s + "!";

const newFunc = pipe(fn1, fn2, fn3);
const result = newFunc("Time"); // emit!

// slug function
const toSlug = pipe(split(" "), map(toLowerCase), join("-"), encodeURIComponent);

console.log(toSlug("JS Cheerleader")); // 'js-cheerleader'
```
