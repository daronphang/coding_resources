## Mongo DB:
Stores data in BSON (binary json).
Has GUI called MonogoDB Compass. For relations, can have nested/embedded documents or references.

```
// nested document 
{
  userName: 'John',
  age: 29,
  address: {
    city: 'Singapore'
  }
}

// references
{
  userName: 'john',
  favBooks: ['id1', 'id2']
}

{
  _id: 'id1',
  name: 'Lord of the Rings'
}
```
