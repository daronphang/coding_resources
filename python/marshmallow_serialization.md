## Marshmallow:
Marshmallow is an object-relational mapping library which is used to convert objects to and from Python data types. Often used alongside with SQLAlchemy, an ORM that maps
database schemas to Python objects. Used primarily in commmunication between backend and frontend to:
- Validate input data.
- Deserialize input data to app-level objects.
- Serialize app-level objects to primitive Python types.

### Schema:
Introduces schema which can be used to apply rules to validate the data being deserialized or change the way they are serialized. A schema defines the rules that guides deserialization called load and serialization, called dump. 
```python 
from marshmallow import Schema, fields
class PersonSchema(Schema):
    name = fields.Str()
    age = fields.Int()
```
### Validating Inputs:
```python
data = {
    'name': 'bill',
    'age': 'nineteen'
}
person = PersonSchema().load(data)
# ValidationError: {'age': ['Not a valid integer.']}

# Successful deserialziation output:
{'name': 'bill', 'age': 19}
```
### Serializing Objects:
```python
person = Person(name='bill', age=19)
serialized_value = PersonSchema().dump(person)
# { 
#    'name': 'bill',
#    'age': 19,
# }
```
