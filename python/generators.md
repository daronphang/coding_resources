## Generators:
Used to create lazy iterators that do not store contents in memory. common use of generators is to work with data streams or large files like CSV.  
Uses yield instead of return.
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
