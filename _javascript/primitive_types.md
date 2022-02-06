### Overview

Primitive is data that is not an object and has no methods including string, number, bigint, boolean, undefined, symbol and null. Primitives are immutable.

### String Manipulation

```js
let str = "Hello world!";
str.slice(-4); // "rld!"
str.substr(1, 4); // "ello"
str.substr(0, str.length - 3); // "Hello wor"
str.substr(2); // "llo world!"
str.substr(0, -2);

// convert number to string with prefix 0
let no = 6;
no.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

// getting character of string
const anyString = "hello world";
console.log(anyString.charAt(0));
```

### Type Conversions

JS does not define different types of numbers like integers, short, long, float, etc. All JS numbers are 64-bit floating point that can either have decimals or without.

```js
Number("3.14"); // 3.14
Number(" "); // 0
parseFloat();
parseInt();

String(123)(123).toString()(123.456).toFixed(2); // returns a string with specified number of decimals
```

### Truthy/Falsey

```
// Truthy
Object: {}
Array: []
"anything"
3.14
new Date()

// Falsey
0
null          An object with no value; typeof null is object
undefined     Property type; typeof undefined is undefined
NaN
```

#### Comparison

To cast a variable to be explicitly boolean, use !! instead of comparison operators which provides more freedom.

```
Strictly equal: ===         Checks if both type and values are same
Strictly unequal: !==
```

```js
function() {
  var name = 'Brian';
  //alert 'string'
  window.alert(typeof name);
  //cast to boolean
  var bool = !!name;
  //alert 'boolean'
  window.alert(typeof bool);
}
```
