### Pickling
Pickle is used for serializing and de-serializing Python object structures, also called marshalling or flattening. Serialization refers to the process of converting an object in memory to a byte stream that can be stored on disk or sent over a network. This character stream can then be later retrieved and de-serialized back to a Python object.

Pickling: conversion of an object from one representation (data in RAM) to another (text on disk)  
Compression: process of encoding data with fewer bits in order to save space

### Data Storage
Can pickle objects with following data types. Generators, inner classes, lambda functions (require additional package called dill) and defaultdicts cannot be pickled easily. 
```
Booleans
Integers
Floats
Complex numbers
Strings (normal/unicode)
Tuples
Lists
Sets
Dictionaries
```

### When to Use Pickle
Useful for applications where you need some degree of persistency in data. Data can be saved to disk or sent over a TCP or socket connection.

### When Not to Use Pickle
If data needs to be used across different programming languages, Pickle is not recommended as its protocol is specific to Python.

### Pickling Files
```py
import pickle

dogs_dict = { 'Ozzy': 3, 'Filou': 8, 'Luna': 5, 'Skippy': 10, 'Barco': 12, 'Balou': 9, 'Laika': 16 }

```
