### Lambda function

Anonymous function that can take any number of arguments, but with one expression. Contrast to normal functions defined with def().

```py
# lambda arguments: expression

x = lambda a, b : a * b
print(x(5, 6))

# using it inside another function
def myfunc(n):
  return lambda a : a * n

mytripler = myfunc(3)
print(mytripler(11))

# used with filter/map
my_list = [1, 5, 4, 6, 8, 11, 3, 12]

even_list = list(filter(lambda x: (x%2 == 0), my_list))
new_list = list(map(lambda x: x * 2 , my_list))
```
