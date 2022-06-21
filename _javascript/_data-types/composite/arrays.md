## Arrays

Mutable object that allows different types of elements to be stored. Items are accessible by index.

### APIs

```
concat()              Produces new array containing shallow copy of concatanated array
join(sep)             Makes a string from an array, default separator is ','
push(x)               Adds element to end of array
pop()                 Removes last element in array
shift()               Removes first element in array
unshift()             Adds one or more elements to beginning of an array
includes(x)           Boolean to check if element exists
sort()                Sorts strings only, for integers need use function
flat(level)           Level refers to the number of nested arrays
flatMap(function)     Combines both map and flat
reverse()             Reverses an array in place

slice(number)                          Removes x number of elements at front
splice(start, deleteCount, item1)       Deletes elements in original array

map(function)                  Creates new array containing results of applying function operation
filter(array => condition)     Creates new array containing elements passing specified condition
find(function)                 Same as filter but returns first element instead of new array
findIndex(function)
some(function)                Same as .includes(), but function is a condition instead of equality
every(function)               Function is a boolean condition; return false is equivalent to break
reduce(prev, next => {})      final result is single value; useful for sum

fill(value,start,end)
from(object,function)      Creates array from array-like objects i.e. Array.from('foo') // ['f', 'o', 'o']
```

### Unpacking Arrays

```js
// Spread operator to unpack an array
const arr = [4, 5, 6];
const newArr = [1, 2, 3, ...arr]; // [1, 2, 3, 4, 5, 6]

// Rest pattern which is opposite of spread
const [a, b, ...others] = [1, 2, 3, 4, 5]; // others = [3, 4, 5]
```

### Comparing Arrays

```js
var a1 = ["a", "b"];
var a2 = ["a", "b", "c", "d"];

// intersection
let intersection = arr1.filter((x) => arr2.includes(x));

// difference
let difference = arr1.filter((x) => !arr2.includes(x));

// symmetric difference
let difference = arr1.filter((x) => !arr2.includes(x)).concat(arr2.filter((x) => !arr1.includes(x)));
```

## Examples

### Sorting

```js
// a - b > 0: sort b before a (return 1)
// a - b < 0: sort a before b (return -1)
// a - b === 0: keep original order (return 0)

// sort by string
arr.sort((a, b) => a.value.localeCompare(b.value));
const sortArr = arr.sort((a, b) => a - b); // ascending order

// by multiple fields
finalRes.sort((x: GcpTracking, y: GcpTracking) => {
    return x.status.localeCompare(y.status) || Date.parse(y.createDate) - Date.parse(x.createDate);
});
```

### Reduce

```js
// filter and map with reduce()
const updateData = data.reduce((result: PortfolioMeta[], cur, i) => {
    if (i > delIndex) {
        cur.orderId -= 1;
        result.push(cur);
    }
    return result;
}, []);
```

### Others

```js
const a = ['a', 'b', 'c'];
const b = ['d', 'e', 'f'];

const c = a.concat(b, true); // ['a', 'b', 'c', 'd', 'e', 'f', true]
const d = a.join('');   // 'abc'

const movementsUSD = arr.map(mov => Math.abs(mov) * 1.1);
const deposits = arr.filter(mov => mov > 0);    // boolean condition
const balance = arr.reduce((acc, cur, i, arr) => acc + cur, 0);     // accumulator value set at end

const arr1 = [[[1, 2], 3], [4, 5, 6], 7, 8];
console.log(arr1.flat(2))   // [1, 2, 3, 4, 5, 6, 7, 8]

Array.from('foo');                              // [ "f", "o", "o" ]
Array.from([1, 2, 3], x => x + x);              // [2, 4, 6]
Array.from({length: 7}, (cur, i) => i + 1);     // [1, 2, 3, 4, 5, 6, 7]

// finding array in array
req.body.deleteItems.forEach((itemID) => {
    const itemExists = req.user.cartProducts.some(
        (item) => item._id === itemID
);
```
