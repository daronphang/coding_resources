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
```
const restaurant = {
    name: 'Pizzerio',
    location: '23 West Virginia',
    categories: ['Italian', 'Western', 'Chinese'],
    menu: ['Pizza', 'Bread', 'Steak', 'Noodles'],
};

// Destructuring arrays
const [first, second] = restaurant.categories;  // 'Italian', 'Western'
const [first, , third] = restaurant.categories; // 'Italian', 'Chinese'

// Destructuring objects
const {name: resName, menu: resMenu, location: resLoc} = restaurant; // order doesn't matter

```
## Spread Operator and Rest Pattern:
```javascript
// Spread operator
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
