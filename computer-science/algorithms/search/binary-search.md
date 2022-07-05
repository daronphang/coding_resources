### Binary Search

Can use binary search with divide and conquer strategy. Only works if list is sorted. Has time complexity of O(log2n) as compared to linear with O(n).

```js
var binarySearch = function (nums, target) {
    let start = 0;
    let end = nums.length;
    let mid = Math.floor(end / 2);

    while (start < end) {
        if (nums[mid] === target) break;

        if (target < nums[mid]) {
            end = mid - 1;
            mid = start + Math.floor((end - start) / 2);
        } else {
            start = mid + 1;
            mid = start + Math.ceil((end - start) / 2);
        }
    }

    if (nums[mid] === target) return mid;
    return false;
};
```

```py
def binary_search(self, candidates, target):
    # return idx of element that is largest in list but smaller than target
    # i.e. idx+1 element is larger than target and cannot be used in sum
    mid = len(candidates) // 2
    left = 0
    right = len(candidates) - 1

    while left < right:
        if candidates[mid] == target:
            # since all elements are distinct, can stop here
            break
        elif candidates[mid] < target:
            # continue checking on right as there may exist an element that meets criteria
            left = mid
            mid = left + (right-left + 1) // 2
        else:
            # element > target, find next valid element
            right = mid - 1
            mid = left + (right-left) // 2

    return mid
```
