## List Comprehensions

Contains expression and iteration.

```python
numbers = [1, 2, 3, 4, 5]

squares = [number ** 2 for number in numbers]   # [1, 4, 9, 16, 25]
```

### Conditional

Order is expression, iteration and filter. Cannot add 'else' clause and unable to support statements i.e. x += 5.

```python
menu = [
    ['egg', 'bacon'],
    ['egg', 'spam'],
    ['egg', 'bacon']
]

meals = [meal for meal in menu if 'spam' not in meal]   # [['egg', 'bacon']]

# Multiple filters:
[if 'spam' not in meal and 'chicken' not in meal]
[if ('spam' in meal or 'egg' in meal) and not ('bacon' in meal and 'sausage' in meal)]
```

### Nested

```python
entries = [[1,2,3], [4,5,6]]
placeholder = []
for entry in entries:
    for x in entry:
        placeholder.append(x)   # For nested comprehensions, move this at top of chain

placeholder = [x for entry in entries for x in entry]


burgers = ['beef', 'chicken', 'bean']
toppings = ['cheese', 'egg', 'bean', 'spam']

meals = [(burger, topping) for burger in burgers for topping in toppings]
# [('beef', 'cheese'), ('beef', 'egg'), ('beef', 'bean'), ('beef', 'spam'), ('chicken', 'cheese'), ('chicken', 'egg'), ('chicken', 'bean'), ('chicken', 'spam'), ('bean',
# 'cheese'), ('bean', 'egg'), ('bean', 'bean'), ('bean', 'spam')]

meals = [[(burger, topping) for burger in burgers] for topping in toppings]
# [[('beef', 'cheese'), ('chicken', 'cheese'), ('bean', 'cheese')], [('beef', 'egg'), ('chicken', 'egg'), ('bean', 'egg')], [('beef', 'bean'), ('chicken', 'bean'), ('bean',
# 'bean')], [('beef', 'spam'), ('chicken', 'spam'), ('bean', 'spam')]]
```
