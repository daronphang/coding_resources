## Strings and Slices

```py
'this string\n has been\n split'
tabbed\t strings
"""He said, "no, he's resting""""

parrot = "norwegian blue"
parrot[3]       # 'w', strings are sequence types
parrot[-4:]     # blue
parrot[10:]     # blue
parrot[:-4]     # 'norwegian ', removes last 4 characters in string
parrot[:6:2]    # 'nre', extract at intervals of 2
parrot[5::-1]   # 'gewron', starts at 5th index, ends at first character
parrot[:-5:-1]  # 'eulb', ends at 5th last character, starts at last index
parrot[::-1]    # prints entire string backwards

str.casefold()          # convert to lowercase, same as islower()
str.capitalize()        # same as isupper()
str.count()             # returns no. of times a specified value occurs in string
str.find()
str.isnumeric()
len(string)

'a,b,c'.split(',')      # returns a list
",".join(iterable)
",".join(x if x not in separators else " " for x in number)

# find substrings in string
any(substring in string for substring in substring_list)
```

### String Replacement

```py
txt = "one one was a race horse, two two was one too."
x = txt.replace("one", "three", 2)

print('my age is {0}, born in {1}'.format('12', '1993')
print('pi is approx {0:12}'.format(22/7))   # defualt for 15 decimals
{0:12f}   # default for 6 decimals
{0:12.50f}    # precision of 50 i.e. 50 points after decimal point

name = 'john'
age = 23
print(f'my name is {name}, age {age}')

print(x,y, sep='\n')
```

## Truthy Falsey

Use any() or all() to check for truth in lists.

```
None
False
0
0.0
0j
''
()
{}
```

### Combining Boolean Operators

```py

user = "Ahmed"
age = 30
job = "data scientist"

# bad practice

if age > 30:
    if user == "Ahmed":
        if job == "data scientist":
            access = True
        else:
            access = False

# good practice

access = age > 30 and user == "ahmed" and job == "data scientist"
```

## Arithmetic Operations

```python
a/b     # float
a//b    # integer
a % b   # remainder after integer division

sevens = range(7, 1000, 7)      // divisble by 7
```
