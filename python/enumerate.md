## Enumerate:
Adds counter to an iterable and returns the object.
```python
grocery = ['bread', 'milk', 'butter']
egrocery = enumerate(grocery)   # [(0, 'bread'), (1, 'milk'), (2, 'butter')]
```
### Nested Arguments:
```python
first = ['a', 'b', 'c']
second = ['d', 'e', 'f']
third = ['g', 'h', 'i']

for count, (one,two,three) in enumerate(zip(first,second,third)):
    print(count, one, two, three)

# 0 a d g
# 1 b e h
# 2 c f i
```
