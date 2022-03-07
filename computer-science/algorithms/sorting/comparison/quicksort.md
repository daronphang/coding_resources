### Quicksort

Idea is to repeatedly split/partition given array such that all items in first sub-array are smaller than all items in second sub-array, and then concatenate all sub-arrays to give sorted full array.

At each stage, need to choose an item in array as pivot item which is kept in between and separate from both sub-arrays. During each stage, need to tell algorithm which part of array is under consideration. Average time complexity of O(nlog2n) and worst-case of O(n^2). Nonetheless, it generally outperforms heapsort in practice and is a popular algorithm for sorting large input arrays.

```
quicksort(array a, int left, int right) {
    if ( left < right ) {
        pivotindex = partition(a,left,right)
        quicksort(a,left,pivotindex-1)
        quicksort(a,pivotindex+1,right)
    }
}
```

#### Choosing Pivot

There is no quick guaranteed way of finding the optimal pivot. If keys are integers, finding the average value would require visiting all entries and adding considerable overhead to algorithm. Hence, some sensible heuristic pivot strategies are:

- Use random number generator to produce an index k and then use a[k].
- Take a key from the middle of the array i.e. a[(n-1)/2].
- Take a small sample ( e.g., 3 to 5 items) and take the middle key of those.

#### Partitioning

Given an array [c, fortran, java, pascal, basic, haskell, ocaml] with pivot fortran:

- Swap pivot value with last value.
- [|c, ocaml, java, pascal, basic, haskell| fortran]
- Start from left, and if less than pivot, move left marker one step to right.
- [c |ocaml, java, pascal, basic, haskell| fortran]
- If next item is bigger than pivot, stop and start from right.
- If bigger than pivot, move right marker to left by one step.
- [c |ocaml, java, pascal, basic | haskell, fortran]
- If next item on right is less than pivot, swap with left item that is also in wrong position.
- Move both markers one step in opposite direction.
- [|c, basic|, java, pascal| ocaml, haskell, fortran]
- Proceed with left again until both left and right markers are in the same place.
- [|c, basic | |java, pascal, ocaml, haskell, fortran]
- Swap pivot from last position with item at beginning of right marker.
- [|c, basic| |fortran, pascal, ocaml, haskell, java]

```
partition(array a, int left, int right) {
    pivotindex = choosePivot(a, left, right)
    pivot = a[pivotindex]
    swap a[pivotindex] and a[right]
    leftmark = left
    rightmark = right - 1
    while (leftmark <= rightmark) {
        while (leftmark <= rightmark and a[leftmark] <= pivot)
            leftmark++
    while (leftmark <= rightmark and a[rightmark] >= pivot)
        rightmark--
    if (leftmark < rightmark)
        swap a[leftmark++] and a[rightmark--]
    }
    swap a[leftmark] and a[right]
    return leftmark
}
```
