### Binary Search

Can use binary search with divide and conquer strategy. Only works if list is sorted. Has time complexity of O(log2n) as compared to linear with O(n).

```js
const list = [1, 3, 4, 5, 17, 18, 30];
const n = list.length;
const x = 17; // find index given x

let left = 0;
let right = n - 1;
let mid;

while (left < right) {
  mid = (left + right) / 2;
  if (x > list[mid]) {
    left = mid + 1;
  } else {
    right = mid;
  }
}

if (list[left] === x) {
  return left;
} else {
  return -1;
}
```
