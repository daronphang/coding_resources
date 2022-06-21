### Converting Types

JS does not define different types of numbers like integers, short, long, float, etc. All JS numbers are 64-bit floating point that can either have decimals or without.

```js
Number("3.14"); // 3.14
Number(" "); // 0
parseFloat();
parseInt();

String(123)(123).toString()(123.456).toFixed(2); // returns a string with specified number of decimals
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
