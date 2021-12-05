### Storing Data
MongoDB encourages embedding of data (arrays) instead of relations as it allows to get all relevant data with a single query. Arrays take up less disk space than objects with keys and values, and tend to be lightning fast for both data storage and retrieval. However, for documents gradually grows over its lifetime, database has to reallocate hard drive space frequently which slows down writes and leads to database fragmentation. Documents also have a hardcoded size limit of 16MB to discourage document growth.

### Indexing
In any database, indexes support the efficient execution of queries. Without them, database must scan every document in a collection or table to select those that match the query statement. Indexes improve the speed of search operations as it is performed on indexes that holds only few fields. A unique index ensures that indexed fields do not store duplicate values. MongoDB creates a unique index on the \_id field during creation of a collection.

However, indexing comes with a performance cost (indexes are resource-intensive), but are more than worth the cost for frequent queries on large data sets. For instance, having too many indexes can hamper the performance of insert, update and delete operations due to the additional write and data space used by indexes. 

Default name for an index is the concatenation of indexed keys and each key's direction in the index, using underscores as separator.

```mongodb
// members collection
db.members.createIndex( { "user_id": 1 }, { unique: true } )  // user_id_1

// creating indexes with custom name 
db.products.createIndex(
  { item: 1, quantity: -1 } ,
  { name: "query for inventory" }
)
```

#### Example
```mongodb
db.users.insert(
	{
		"address": {
			"city": "Los Angeles",
			"state": "California",
			"pincode": "123"
		},
		"tags": [
			"music",
			"cricket",
			"blogs"
		],
		"name": "Tom Benzamin"
	}
)

// creating index on tags field
db.users.createIndex({"tags":1})

// returns user that contains cricket in tags field
db.users.find({tags:"cricket"}).pretty()
{
	"_id" : ObjectId("5dd7c927f1dd4583e7103fdf"),
	"address" : {
		"city" : "Los Angeles",
		"state" : "California",
		"pincode" : "123"
	},
	"tags" : [
		"music",
		"cricket",
		"blogs"
	],
	"name" : "Tom Benzamin"
}
```

#### Compound Indexing
Can enforce a unique constraint on compound indexes i.e. combination of index key values is unique.

```mongodb
db.members.createIndex({groupNumber: 1, lastName: 1, firstName: 1}, {unique: true})
```

### Handling Growing Arrays
Key points to consider when using arrays for storage:
- Expansion: Instead of being rewritten, the document will instead be moved on the disk. This movement tends to be slower as it requires every index to also be updated. 
- Indexing: If an array field is indexed, MongoDB indexes each value of the array so you can query individual items
- BSON Format: Finding one or more elements in a large array can take a long time as BSON uses linear memory scan to manipulate documents.
