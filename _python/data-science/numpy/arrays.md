## Creating Array

```py
import numpy as np

x1 = np.random.randint(10, size=6)  # 1D array
x2 = np.random.randint(10, size=(3,4))  # 2D array

x2 = np.array([[1, 2, 3], [4, 5, 6]])

x = np.arange(10)
```

### Array Attributes

```
.ndim           Number of dimensions
.shape
.size           Number of elements
.dtype          Data type of the array
.itemsize       Size of each array element in bytes
.nbytes         Total size of array in bytes
.reshape
.newaxis        Alternative for reshape
```

### Modifying values

When modifying the data type i.e. int64 to floating-point, the value will be truncated.

```py
# accessing index
# multi-dimensions can be accessed using comma-separated tuple
print(x2[2,0])
x2[0,0] = 12

x1[0] = 3.14159
print(X1)   # array([3,0,5])
```

### Array slicing

When slicing into subarrays, Numpy return them as views rather than copies. If modifying the subarray, it will modify the actual instance. This is useful when working with large datasets as we do not need to copy the subarray into an underlying data buffer.

```py
# 1D array
x[start:stop:step]

x = np.arange(10)   # array([0,1,2,3,4,5,6,7,8,9])
x[:5]
x[::2]      # array([0,2,4,6,8])
x[::-1]     # array([9,8,7,6,5,4,3,2,1,0])
x[5::-2]    # array([5,3,1])

# multi-dimensional
x2 = np.array([[12,5,2,4], [7,6,8,8], [1,6,7,7]])
x2[:2, :3]          # two rows, 3 columns
# array([[12,5,2], [7,6,8]])
x2[::-1, ::-1]      # reversing rows and columns
```

### Accessing rows/columns

```py
x2[:, 0]        # first column of x2
x2[0, :]        # first row of x2
x2[1, 2]
```

### Iterating

```py
A = np.arange(12)
for cell in A:
    print(cell, end=' ')
```

```py
# multi-dimensional
A = np.arange(12).reshape(4,3)
for row in A:
    print(row)

# iterating over each element in the array
# eliminates nested for loop
for cell in A.flatten():
    print(cell, end=' ')

# multi-dimensional iterator object provided by numpy
# treats elements as read-only i.e. cannot be modified
for cell in np.nditer(A):
    print(cell, end=' ')

# to modify
for cell in np.nditer(A, op_flags=['readwrite']):
    cell[...] =cell*2
```

#### Enumerate

```py
arr = np.array([1, 2, 3])

for idx, x in np.ndenumerate(arr):
  print(idx, x)
```

#### Iterating two arrays simultaneously

```py
for a,s in np.nditer([A,S]):
    print(a, s)
```

### Mapping

Though numpy does provide vectorize(), it is provided primarily for convenience and not for performance.

```py
x = np.array([1, 2, 3, 4, 5])

# Obtain array of square of each element in x
squarer = lambda x: x ** 2
squares = squarer(x)

# vectorize()
vfunc = np.vectorize(squarer)
vfunc(x)
```

### Creating copies of arrays

```py
x2_copy = x2[:2, :2].copy()
```

### Reshaping

```py
x = np.arange(1,10).reshape((3,3))  # [1,2,3], [4,5,6], [7,8,9]
```

### Adding

```py
out_arr = np.add(arr1, arr2)
```

### Concatenating arrays

```py
x = np.array([1, 2, 3])
y = np.array([3, 2, 1])
z = [99, 99, 99]
np.concatenate([x, y, z])  # array([1, 2, 3, 3, 2, 1, 99, 99, 99])
```

```py
# 2D arrays
grid = np.array([[1, 2, 3],
                 [4, 5, 6]])
np.concatenate([grid, grid])
# array([[1, 2, 3],
#       [4, 5, 6],
#       [1, 2, 3],
#       [4, 5, 6]])

np.concatenate([grid, grid], axis=1)    # concatenate along the columns
# array([[1, 2, 3, 1, 2, 3],
#       [4, 5, 6, 4, 5, 6]])
```

For arrays with mixed dimensions, used hstack, vstack or dstack (stack arrays along the third axis).

```py
# stacking vertically

x = np.array([1, 2, 3])
grid = np.array([[9, 8, 7],
                 [6, 5, 4]])

# vertically stack the arrays
np.vstack([x, grid])

# array([[1, 2, 3],
#       [9, 8, 7],
#       [6, 5, 4]])


# stacking horizontally
y = np.array([[99],
              [99]])
np.hstack([grid, y])

# array([[ 9,  8,  7, 99],
#      [ 6,  5,  4, 99]])
```

### Splitting arrays

Opposite of concatenation, implemented via np.split, np.hsplit, and np.vsplit. A list of indices is passed giving the split points.

```py
x = [1, 2, 3, 99, 99, 3, 2, 1]
x1, x2, x3 = np.split(x, [3, 5])
print(x1, x2, x3)
# [1 2 3] [99 99] [3 2 1]
```
