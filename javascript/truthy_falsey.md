### Truthy:
```
Object: {}
Array: []
"anything"
3.14
new Date()
```

### Falsy:
```
0
null          An object with no value; typeof null is object
undefined     Property type; typeof undefined is undefined
NaN
```

Others:
To cast a variable to be explicitly boolean, use !! instead of comparison operators which provides more freedom.
```
Strictly equal: ===         Checks if both type and values are same
Strictly unequal: !==
```
```javascript
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
