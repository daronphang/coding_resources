### Maps vs Objects

Map object holds key-value pairs and remembers the original insertion order of keys. Differences between maps and objects:

|                       | Map                                                                                        | Object                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Keys                  | Map does not contain any keys by default.                                                  | Object has prototype which contains default keys (possible of collision). |
| Key Types             | Allows both objects and primitive types to be used.                                        | Must either be string or symbol.                                          |
| Key Order             | Maps are ordered and remembers original insertion of keys.                                 | Keys of ordinary Object are ordered in ECMA2015.                          |
| Size                  | Can be retrieved easily with size().                                                       | Must be determined manually.                                              |
| Iteration             | Can be directly iterated.                                                                  | Need convert to array using Object.entries().                             |
| Performance           | Performs better in scenarios involving frequent additions and removals of key-value pairs. | Not optimized for frequent changes.                                       |
| Serialization/Parsing | No native support for serialization and parsing.                                           | Object to JSON using JSON.stringify(). JSON to object using JSON.parse(). |
| Prototype             | Inherits from Map.prototype.                                                               | Inherits from Object.prototype.                                           |
| Storage               | Able to store 16.7 million key/value pairs.                                                | Able to store 11.1 million key/value pairs.                               |

### APIs

```
set(key, value)    Correct way of setting property
has(key)
get(key)
delete(key)
clear()            Removes all elements from Map object
size               Returns current element count
keys()             Returns an array of keys
values()           Returns an array of values
entries()          Returns an array of [key, value]
forEach()
```

### Examples

```js
const contacts = new Map();
contacts.set('Jess', {phone: '1234567', address: '123 Ave'})
contacts.set('1', 'str1')
  .set(1, 'num1');
  .set(true, 'bool1');

const object = {
  name: "John",
  age: 30
};
const objMap = new Map(Object.entries(object));
```

```js
let recipeMap = new Map([
    ["cucumber", 500],
    ["tomatoes", 350],
    ["onion", 50],
]);

// iterate over keys
for (let vegetable of recipeMap.keys()) {
    alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values
for (let amount of recipeMap.values()) {
    alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) {
    // the same as of recipeMap.entries()
    alert(entry); // cucumber,500 (and so on)
}

// use .forEach() method as shortcut for iterations
recipeMap.forEach((value, key, map) => {
    alert(`${key}: ${value}`); // cucumber: 500 etc
});
```
