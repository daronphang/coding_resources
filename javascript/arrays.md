## Array Operations:
```
.push(x)          Adds element to array
.pop()            Removes last element in array
.shift()          Same as push() but puts element at front
.unshift()        Same as pop() but removes first element
.includes(x)      Boolean to check if element exists

.slice(number)    Removes x number of elemenets at front
.splice(number)   Deletes elements in original array
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
    tues: {open: 10, close: 23),
    wed: {open: 15, close: 24),
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
For-of loops iterates over values of object. For-in iterates over enumerable property of an object.
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
