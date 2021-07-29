## Datetime:
```javascript
const date1 = new Date("06/30/2019");
const date2 = new Date("07/30/2019");

const timeDiff = date2.getTime() - date1.getTime();
const daysDiff = timeDiff / (1000*3600*24);
```
