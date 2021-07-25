## Mongo DB:
For relations, can have nested/embedded documents or references.

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
