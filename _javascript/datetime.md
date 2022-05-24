### Datetime

```javascript
const date1 = new Date("06/30/2019");
const date2 = new Date("07/30/2019");

const timeDiff = date2.getTime() - date1.getTime();
const daysDiff = timeDiff / (1000 * 3600 * 24);
```

### Built-in Functions

```js
d = new Date();
d.setUTCFullYear(2004);
d.setUTCMonth(1);
d.setUTCDate(29);
d.setUTCHours(2);
d.setUTCMinutes(45);
d.setUTCSeconds(26);

console.log(d); // -> Sat Feb 28 2004 23:45:26 GMT-0300 (BRT)
console.log(d.toLocaleString()); // -> Sat Feb 28 23:45:26 2004
console.log(d.toLocaleDateString()); // -> 02/28/2004
console.log(d.toLocaleTimeString()); // -> 23:45:26

const month = date.toLocaleString("default", { month: "long" }); // long, short, narrow; default is en-us
```

### Best Practices

When dealing with multiple programming languages, best way is to use epoch time to account for different local timezones.
