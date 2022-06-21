## Sets

Allows storing of unique values, whether primitive (data that is not an object, no methods and immutable) or object references.

```js
const mySet = new Set();
mySet.add(1); // Set [1]
mySet.add("hello"); // Set [1, 'hello']

mySet.has(1); // true
mySet.size; // 2
mySet.delete(1);

const myArr = Array.from(mySet);
```
