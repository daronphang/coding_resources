### Arrays

Come in either vectors (1-D) or matrices (2-D). Difference with Python list is that arrays have ability to broadcast.

```python
import numpy as np

list = [1,2,3]
np.array(list)

matrix = [[1,2,3],[4,5,6]]
np.array(matrix)

np.random.rand(5)
np.random.randint(1,100,10)
np.arrange(0,11,2)              # same as python range
np.zeros(3)                     # [0,0,0]
np.zeros((5,5))                 # 5 rows and columns of 0
np.ones()
np.eye(3)                       # identity matrix
np.linspace(0,5,10)             # 10 points between 0-5

# broadcasting
arr = np.arange(0,11)
arr[:5] = 1                     # [1,1,1,1,1,5,6,7,8,9,10]
```

### Methods

```python
# methods
arr.max()
arr.min()
arr.argmax()                    # index location of value
arr.shape()
arr.dtype()
arr.copy()
arr.reshape(3,3)                # converts np.arange(0,10)

np.arange(6).reshape(2,3)

# inserting arrays
arr1 = [[1,2], [4,5]]
arr2 = [3,6]
arr1 = arr1.append(arr1, arr2, axis=1)    # axis=1 for column
```
