## Square Root Decomposition

Technique is one of the most commonly used to reduce Time Complexity by a factor of sqrt(n) for query range optimizations. Key concept is to decompose a given array into small chunks of size sqrt(n).

Given a query for elements in range l to r, the answer can be calculated by combining the answers of the chunks that lie in between that range. We are jumping sqrt(n) steps at a time instead of jumping 1 step at a time in naive approach.

When given a range that is not on boundaries, need to perform three for-loops.

```py
arr = [1,5,2,4,6,1,3,5,7]

blk1 = 1 + 5 + 2 = 8
blk2 = 4 + 6 + 1 = 11
blk3 = 3 + 5 + 7 = 15

# find range between idx=1 and 6
sum = arr[1] + arr[2] + blk2 + arr[6] = 5 + 2 + 11 + 3 = 20
```

```py
from math import sqrt



class SqrtDecomp:
    arr = [1,5,2,4,6,1,3,5,7]
    blk_sz = ceil(sqrt(len(arr)))
    block = [0] * blk_sz

    # building the decomposed array
    blk_idx = 0
    for i in range(len(arr)):
        if i % blk_sz == 0:
            blk_idx += 1

        block[blk_idx] += arr[i]

    def update(idx, val):
        block_no = idx // self.blk_sz
        block[block_no] += val - self.arr[idx]
        self.arr[idx] = val

    def query(l, r):
        sum = 0

        # get left boundary
        while l < r and l % self.blk_sz != 0:
            sum += self.arr[l]
            l += 1

        # get completely overlapped block
        sum += self.block[l // self.blk_sz]
        l += self.blk_sz

        # get right boundary
        while l < r:
            sum += self.arr[l]
            l += 1

        return sum
```
