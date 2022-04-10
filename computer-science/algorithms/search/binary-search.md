### Binary Search

Can use binary search with divide and conquer strategy. Only works if list is sorted. Has time complexity of O(log2n) as compared to linear with O(n).

```js
var binarySearch = function(nums, target) {
    let start = 0;
    let end = nums.length;
    let mid = Math.floor(end / 2);
    
    while (start < end) {
        if (nums[mid] === target) break;
        
        if (target < nums[mid]) {
            end = mid - 1;
            mid = start + Math.floor((end-start)/2);
        }
        else {
            start = mid + 1;
            mid = start + Math.ceil((end-start)/2);
        }
    }
    
    if (nums[mid] === target) return mid;
    return false;
};
```
