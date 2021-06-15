## Array Operations:
```
.push(x)                    Adds element to array
.pop()                      Removes last element in array
.shift()                    Same as push() but puts element at front
.unshift()                  Same as pop() but removes first element
.includes(x)                Boolean to check if element exists
.sort()                     Sorts strings only, for integers need use function
.flat(level)                Level refers to the number of nested arrays
.flatMap(function)          Combines both map and flat

.slice(number)              Removes x number of elements at front
.splice(index, number)      Deletes elements in original array

.map(function)              Creates new array containing results of applying function operation
.filter(function)           Creates new array containing elements passing specified condition
.reduce(function)           Boils down all elements to one single value
.find(function)             Same as filter but returns first element instead of new array
.some(function)             Same as .includes(), but function is a condition instead of equality
.every(function)            Function is a boolean condition

.fill(value,start,end)
.from(object,function)      Creates array from array-like objects i.e. Array.from('foo') // ['f', 'o', 'o']
```
```javascript
const arr = [10, 20, -30];

const movementsUSD = arr.map(mov => Math.abs(mov) * 1.1);
const deposits = arr.filter(mov => mov > 0);    // boolean condition
const balance = arr.reduce((acc, cur, i, arr) => acc + cur, 0);     // accumulator value set at end
const sortArr = arr.sort((a,b) => a - b);   // ascending order

const arr1 = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arr1.flat(2))   // [1, 2, 3, 4, 5, 6, 7, 8]

Array.from('foo');                              // [ "f", "o", "o" ]
Array.from([1, 2, 3], x => x + x);              // [2, 4, 6]
Array.from({length: 7}, (cur, i) => i + 1);     // [1, 2, 3, 4, 5, 6, 7]
```
## Destructuring Arrays/Objects:
```javascript
const restaurant = {
    name: 'Pizzerio',
    location: '23 West Virginia',
    categories: ['Italian', 'Western', 'Chinese'],
    menu: ['Pizza', 'Bread', 'Steak', 'Noodles'],
    openingHours: {
    mon: {open: 12, close: 22},
    tues: {open: 10, close: 23},
    wed: {open: 15, close: 24},
    },
};

// Destructuring arrays
const [first, second] = restaurant.categories;  // 'Italian', 'Western'
const [first, , third] = restaurant.categories; // 'Italian', 'Chinese'

// Destructuring objects
const {name: resName, menu: resMenu, location: resLoc} = restaurant; // order doesn't matter

// {} is for declaring key-value object
// [] is for declaring array
```
## Spread Operator and Rest Pattern:
```javascript
// Spread operator to unpack an array
const arr = [4, 5, 6];
const newArr = [1, 2, 3, ...arr]    // [1, 2, 3, 4, 5, 6]

// Rest pattern which is opposite of spread
const [a, b, ...others] = [1, 2, 3, 4, 5];  // others = [3, 4, 5]
```
## For-of and For-in Loops:
For-in loop iterates over values of an object. For-of used for looping arrays.
For-in iterates over enumerable property of an object.
```javascript
let list = [4, 5, 6];

for (let i in list) {
   console.log(i); // "0", "1", "2",
}

for (let i of list) {
   console.log(i); // "4", "5", "6"
}

// Similar to python enumerable
const menu = [...restaurant.menu];
for (const item of menu.entries()) {
    console.log(item);  // [0, 'Pizza], [1, 'Bread']
};

// use .forEach() shortcut for looping arrays
const arr = [200, 400, -5, 10];
arr.forEach((element, index, array) => console.log(element));
```
## Looping Objects:
```javascript
let user = {
  name: "John",
  age: 30
};
Object.keys(user)       // ["name", "age"]
Object.values(user)     // ["John", 30]
Object.entries(user)    // [["name","John"], ["age",30]]

// Looping over keys and values
const openingHours = {restaurant.openingHours};
for (const day of Object.keys(openingHours) {
console.log(day);

for (const day of Object.values(openingHours) {
console.log(day);
}

// Looping over entire object
// entries method returns an array of [key, value] pairs
const entries = Object.entries(openingHours)
for (const [key, {open, close}] of entries) {
    console.log(`on ${key} we open at ${open} and close at ${close}`);
}
```
