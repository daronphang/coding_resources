## Updating:
Can use updateOne() or updateMany(). 

https://docs.mongodb.com/manual/reference/operator/update/

### Field Update Operators: 
https://docs.mongodb.com/manual/reference/operator/update-field/
```
$currentDate        Set value of field to current date, either as Date (default) or timestamp
$inc                Increments a field value by a specified value
$min
$max
$mul
$rename
$set                Set new values for new/existing fields (fields not part of document will remain as they are)
$setOnInsert
$unset
```
```js
db.products.update(
   { _id: 100 },
   { $set: { "details.make": "zzz" } }
)
```

### Array Update Operators:


