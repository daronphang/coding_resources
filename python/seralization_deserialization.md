## Serialization and Deserialization:
Serialization is the process of converting app-level objects to primitive types such as dictionary, text, string, etc. Serialized objects can the nbe rendered to standard formats such as 
JSON for use in HTTP API. Often used in database management whereby custom objects are converted into dictionaries and then into texts before storing into database.

Deserialization is the reverse process whereby data such as dictionaries or JSON objects are converted back into app-level objects. Often used in web development when backend receives input data 
from frontend or retrieving data from database, and then converting them back into custom objects.

Several Python libraries that support both deserialization and serialization such as pickle, json, cattrs, and marshmallow.
