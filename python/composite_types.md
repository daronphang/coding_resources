### Lists

```
append()
clear()
copy()
count()
extend()        Adds elements of a list/iterable to end of current list
index()         Returns index of first element with specified value
insert()        Adds element at specified position
pop()           Removes element at specified position
remove()        Removes first item with specified value
reverse()
sort()
```

```python
list = ['computer', 'monitor']
list[1][0]    # m

list.append(x)
list.sort(reverse=True)     # same as sorted(list, reverse=True)
list.sort(key=lambda x: x['some_key'])

del list[-n:]   # delete last n items from list

vowels = ['a', 'e', 'i', 'o', 'u']
vowels_iter = iter(vowels)

print(next(vowels_iter))    # 'a'
print(next(vowels_iter))    # 'e'

```

### Sets

Use sets to compare lists with lists or to output unique values only.

```py
query_op = {'AND': {'id': '123'}}
test_set = set(['AND', 'OR'])

print(set(query_op.keys()).intersection(test_set))
print(bool(set(query_op.keys()).intersection(test_set)))

# Retrieve an item in set
 all_ids = set(list(range(1, 5)))
order_ids = set(
    [item['orderId'] for item in current_portfolios]
)
del_id = next(iter(all_ids.difference(order_ids)))
```

### Tuples

Same as lists but immutable. Can be destructured. Accessed by []. When function returns multiple values, the result is a tuple.

```python
metallica = ('ride', 1984, ' metallica')
title, year, artist = metallica
print(title)
```

### Dictionaries

When converting Dictionaries to JSON, it doesn't respect order if use OrderedDict() and sorts key alphabetically. Best to use a list of dictionaries.

```python
ordered_dict = OrderedDict()

fruit = {'pear': 'green', 'apple': 'red'}
fruit_keys = list(fruit.keys())   # .keys(), .values(), .items()
veg = {}

fruit['pear']
fruit_keys[1]                 # 'apple'
fruit['orange'] = 'orange'    # either add or replace value
del fruit['pear]              # sane as fruit.pop('pear)
fruit.clear()

x = tuple(fruit.items())          # convert to tuples

veg.update(fruit)
x = fruit.copy()

if all(value is None for value in fruit.values()):
  print('dict is empty')


# to print an array of keys and values in a tuple
car = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}

x = car.items()   # dict_items([('brand', 'Ford'), ('model', 'Mustang'), ('year', 1964)])


# To test for keys
if 'some_key' in dict:  # cannot use hasattr() method
    return
```
