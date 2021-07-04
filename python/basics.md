## Sequence Types:
An ordered list of items. String, list, tuple, range, bytes and bytearray.

## Operations:
```
a/b     # float
a//b    # integer
a % b   # remainder after integer division
```

## strings and Slices:
```
'this string\n has been\n split'
tabbed\t strings
"""He said, "no, he's resting""""

parrot = "norwegian blue"
parrot[3]       # 'w', strings are sequence types
parrot[:6]      # ' norweg' 
parrot[:6:2]    # 'nre'
parrot[5::-1]   # 'gewron' 
parrot[:-5:-1]  # 'eulb'
parrot[::-1]

str.casefold()          # convert to lowercase, same as islower()
str.capitalize()        # same as isupper() 
str.count()             # returns no. of times a specified value occurs in string
str.find()
str.isnumeric()
len(string)

'a,b,c'.split(',')      # returns a list
",".join(iterable)
",".join(x if x not in separators else " " for x in number)
```

## String Replacement:
```python
print('my age is {0}, born in {1}'.format('12', '1993')
print('pi is approx {0:12}'.format(22/7))   # defualt for 15 decimals
{0:12f}   # default for 6 decimals
{0:12.50f}    # precision of 50 i.e. 50 points after decimal point

name = 'john'
age = 23
print(f'my name is {name}, age {age}')
```

## True vs False:
False object are None, False, 0, 0.0, 0j, '', (), {}, range(0).

## Lists:
```
list = ['computer', 'monitor']
list[1][0]    # m

list.append(x)
list.sort(reverse=True)     # same as sorted(list, reverse=True)
```










