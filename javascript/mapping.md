## Mapping:
Data structure to map values to keys. Collection of keyed data items that allows keys of any type.
```javascript
const contacts = new Map();
contacts.set('Jess', {phone: '1234567', address: '123 Ave'})
contacts.set('1', 'str1')
  .set(1, 'num1');     
  .set(true, 'bool1'); 



const objMap = new Map(Object.entries(object));
```
## Map Iterations:
```javascript
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable);   // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount);    // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) {          // the same as of recipeMap.entries()
  alert(entry);                         // cucumber,500 (and so on)
}
``` 
``` 
.set(key, value)
.has(key)
.get(key)
.delete(key)
.clear()
.size               Returns current element count
``` 
