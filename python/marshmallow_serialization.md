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
### Validating Inputs (Deserialization):
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

# Result is dictionary which can be converted easily into text for database storage.
```
### Schema Field Arguments:
```
many                Boolean, whether resulting schema is an array of the instantiated schema
load_only           Boolean, to be considered only during load
dump_only           Boolean, to be considered only during dump
required            Boolean, specify whether the field is required in deserialization
data_key            String, specify the alternative field key in input data
allow_none          Boolean, whether None is allowed for field's value
validate            Validator, used as function for value validation
default             Value used in serialization (dump) when the value is missing
missing:            Value used in deserialization (load) when value is missing
error_messages      Dictionary, error messages to override default messages on errors
```
```python
from marshmallow import Schema, fields, validate
class EmployeeSchema(Schema):
    name = fields.Str(
        required=True, 
        error_messages={
            "required": "Name is missing.", 
            "type": "Name must be a string."
        }
    )
    age = fields.Int(required=True, validate=validate.Range(min=18))
    skills = fields.Str(many=True, allow_none=True)
    home_address = fields.Str(data_key='address', default='Hanoi')
```
### Nest Schemas:
To nest a schema inside another so that the new schema inherits attributes of the one being nested.
```python
from marshmallow import Schema, fields
class PersonSchema(Schema):
    name = fields.Str()
    age = fields.Int()
class HouseSchema(Schema):
    address = fields.Str()
class FamilySchema(HouseSchema):
    people = fields.Nested(PersonSchema, many=True)
    
# FamilySchema inherits HouseSchema and hance, has field 'address'
```
### Performing Transformation Before/After:
Allows to perform transformation before or after serialization and deserialization by using hooks.
```
@pre_load       Before deserializing
@post_load      After deserializing
@pre_dump       Before serializing
@post_dump      After serializing
```
```python
from marshmallow import Schema, fields, post_load
class PersonSchema(Schema):
    name = fields.Str()
    age = fields.Int()
    
    @post_load
    def make_person(self, data, **__):
        return Person(**data)

# when deserialzing, output is directly an instance of class Person
```
