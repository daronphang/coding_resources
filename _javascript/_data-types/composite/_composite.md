## Destructuring Arrays/Objects

Destructuring allows us to unpack values from arrays or object properties and store them in distinct variables.

```js
const restaurant = {
    name: "Pizzerio",
    location: "23 West Virginia",
    categories: ["Italian", "Western", "Chinese"],
    menu: ["Pizza", "Bread", "Steak", "Noodles"],
    openingHours: {
        mon: { open: 12, close: 22 },
        tues: { open: 10, close: 23 },
        wed: { open: 15, close: 24 },
    },
};

// Destructuring arrays
const [first, second] = restaurant.categories; // 'Italian', 'Western'
const [first, , third] = restaurant.categories; // 'Italian', 'Chinese'

// Destructuring objects
const { name: resName, menu: resMenu, location: resLoc } = restaurant; // order doesn't matter
({ a, b } = { a: 10, b: 20 });

// {} is for declaring key-value object
// [] is for declaring array
```

## Iterations

For-in loop iterates over enumerable property of an object. If an array or string variable is provided, indexes are taken as keys. For-of (ES6 feature) creates a loop on iterable objects (string, array, map, set).

```js
var foo = new Array(45);

for (var i = 0; i < foo.length; i++) {
    document.write("Item: " + (i + 1) + " of " + foo.length + "<br/>");
}

// OBJECTS
let obj = { a: 1, b: 2 };

for (let prop in obj) {
    console.log(prop); // a, b
}

// ARRAYS
let list = [4, 5, 6];

// iterates over indexes as an array is provided as variable
for (let i in list) {
    console.log(i); // "0", "1", "2",
}

// iterates over values in the array
for (let i of list) {
    console.log(i); // "4", "5", "6"
}
```

### Breaking Out of Loops

To break out of loops, need to use for-of loops instead of Array prototype functions.

```js
// breaking out of loop
for (let i = 0; i < 10; i++) {
    if (i === 3) {
        break;
    }
    text += "The number is " + i + "<br>";
}

// Breaking one iteration of loop i.e. continues with next iteration
for (let i = 0; i < 10; i++) {
    if (i === 3) {
        continue;
    }
    text += "The number is " + i + "<br>";
}
```
