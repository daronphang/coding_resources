## Querying:
Find() returns a cursor. To get results, join it wtith toArray() which returns a promise.
Documentation: https://docs.mongodb.com/manual/tutorial/query-documents/
```js
const cursor = db.collection('inventory').find({
  status: 'A',
  qty: { $lt: 30 }
});

// OR condition
const cursor = db.collection('inventory').find({
  $or: [{ status: 'A' }, { qty: { $lt: 30 } }]
});

const array = cursor.toArray().then().catch();

```

### Comparison Query Operators:
```
$eq       Matches values equal to specified value
$gt       Greater than
$gte      Greater than or equal
$in       Matches any of values specified in an array
$lt       Less than
$lte      Less than or equal
$ne       Not equal
$nin      Not in values specified in an array
```
