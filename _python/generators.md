## Generators

Used to create lazy iterators that do not store contents in memory. Common use of generators is to work with large files like CSV. A generator is a function that returns an object (iterator) which we can iterate over (one value at a time).

Uses yield instead of return. Difference is that return statement terminates a function entirely while yield statement pauses the function by saving all its states and continues from there on successive calls.

```python
def csv_reader(file_name):
    for row in open(file_name, "r"):
        yield row

# Generator expression/comprehension:
csv_gen = (row for row in open(file_name))

# Infinite sequence:
def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1
```

### Methods

```
.send()         # used to pass data
.throw()        # throw an error
.close()        # stop a generator

# pal_gen.throw(ValueError("We don't like large palindromes"))
# pal_gen.close()
```
