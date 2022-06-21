### Updating

Can use updateOne() or updateMany().

https://docs.mongodb.com/manual/reference/operator/update/

### Field Update Operators

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
db.products.update({ _id: 100 }, { $set: { "details.make": "zzz" } });
```

### Array Update Operators

```
$                    Identifies the first element in an array to update without specifying element position
$[]                  Modifies all elements in specified array field
$[<identifier>]      Identifies array elements that match arrayFilters condition
$addToSet            Adds value to array unless have duplicate; can combine with $each to add each element to array
$pop                 Removes first or last element of an array
$pull                Removes all instances from an array of a value or values that match specified condition
$pullAll             Removes all elements that match listed values as compared to $pull which uses query
$push                Append specified value to array
$position            Specifies location in array at which $push operator inserts elements
$slice               Limits number of array elements during $push operation
$sort                Orders elements of an array during $push operation
```

```js
// $[]
db.collection.update(
   { myArray: [ 5, 8 ] },
   { $set: { "myArray.$[]": 10 } },
   { upsert: true }
)
// { "_id" : ObjectId(...), "myArray" : [ 10, 10 ] }

// $[<identifier>]
db.collection.update(
   { myArray: [ 0, 1 ] },
   { $set: { "myArray.$[element]": 2 } },
   { arrayFilters: [ { element: 0 } ],
     upsert: true }
)

//addToSet with $each
{ _id: 2, item: "cable", tags: [ "electronics", "supplies" ] }
db.inventory.update(
   { _id: 2 },
   { $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } }
 )


// $pull
{
   _id: 1,
   fruits: [ "apples", "pears", "oranges", "grapes", "bananas" ],
   vegetables: [ "carrots", "celery", "squash", "carrots" ]
}

db.stores.update(
    { },
    { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } },
    { multi: true }
)

// $pullAll
{ _id: 1, scores: [ 0, 2, 5, 5, 1, 0 ] }
db.survey.update( { _id: 1 }, { $pullAll: { scores: [ 0, 5 ] } } )

```
