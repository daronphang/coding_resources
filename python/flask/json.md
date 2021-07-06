## JSON Payload & Overhead:
JSON data consists of two essential parts: header/overhead identifier and actual information payload. Must have "" for JSON format. 

Overhead is to indicate the source and destination of the information being transmitted; this section is stripped off once the message reaches its destination.

Payload refers to an integral part of each unit of data being transmitted.
```
{
  "Content-Type": "application/json",
  "Cache-Control": "True",
  "status": "OK",
  "data": "Hello, World!"
}
```
## Converting Data Types to JSON:
```python
import json
from flask import jsonify

dict = {'test': 'hello world'}

json_object = json.dumps(dict)  # serializing JSON, converts dict to JSON
python_dict = json.loads(json_object) # deserializing JSON, converts JSON to dict

jsonify(dict)
```
