### Bubble Sort

Follows exchange sort approach. Easy to implement but slow to run. Worst case and average case number of comparisons have time complexities of O(n^2). Given an array a with size n:

- Compares a[n-1] with a[n-2] and swaps if they are in wrong order.
- Compares a[n-2] with a[n-3] and swaps if need to be.
- Once it reaches a[0], smallest item will be in correct place.
- Starts back again but leaves zeroth entry alone.
- Keeps making passes over the array until it is sorted.

```
for ( i = 1 ; i < n ; i++ )
    for ( j = n-1 ; j >= i ; j-- )
        if ( a[j] < a[j-1] )
            swap a[j] and a[j-1]
```

### Insertion Sort

Worst case and average case number of comparisons have time complexities of O(n^2).

- Starts by treating first entry a[0] as an already sorted array.
- Checks the second entry a[1] and compares it with first.
- If wrong order, remembers old a[1], moves a[0] up to a[1] slot, and move old a[1] to a[0].
- Repeats until whole array is sorted.

```
for ( i = 1 ; i < n ; i++ ) {
    for( j = i ; j > 0 ; j-- )
        if ( a[j] < a[j-1] )
            swap a[j] and a[j-1]
        else break
}
```

### Selection Sort

Worst case and average case number of comparisons have time complexities of O(n^2).

- Finds the smallest item and swaps it with item in a[0].
- Finds the second smallest item and swaps it with a[1].

```
for ( i = 0 ; i < n-1 ; i++ ) {
    k = i
    for ( j = i+1 ; j < n ; j++ )
        if ( a[j] < a[k] )
            k = j
    swap a[i] and a[k]
}
```

### Sort Comparison

| Algorithm | 128 | 256 | 512 | 1024 | 1024(ordered) | 1024(Reversed) | 2048  |
| --------- | --- | --- | --- | ---- | ------------- | -------------- | ----- |
| Bubble    | 54  | 221 | 881 | 3621 | 1284          | 5627           | 14497 |
| Insertion | 15  | 69  | 276 | 1137 | 6             | 2200           | 4536  |
| Selection | 12  | 45  | 164 | 634  | 643           | 833            | 2497  |

### Sorting Stability

A sorting algorithm is stable if it can never swap identical items past each other:

- Bubble: Stable, items with identical keys will have their original order preserved.
- Insertion: Stable, items with identical keys will have their original order preserved.
- Selection: Unstable as nothing can stop an item from being swap past an identical item.

### Treesort

Another way of implementing an insertion sorting algorithm using binary search tree.

```
treeSort(array a) {
    t = EmptyTree
    for ( i = 0 ; i < size(a) ; i++ )
        t = insert(a[i],t)
    fillArray(t,a,0)
}

fillArray(tree t, array a, int j) {
    if ( not isEmpty(t) ) {
        j = fillArray(left(t),a,j)
        a[j++] = root(t)
        j = fillArray(right(t),a,j)
    }
    return j
}
```

### Heapsort

Achieves the best average and worst-case complexities with both of O(nlog2n). Makes use of binary heap trees as follows:

- Takes an unsorted array and re-arranging it so that it satisfies the heap tree priority ordering.
- Largest item in heap is always in a[1].
- Largest item in sorted array is always in a[n].
- Swaps both items and hence, will have item at right position of the array.
- Second largest item will be in a[1], and its final position in sorted array is a[n-1].
- Repeat using bubble down procedure.

```
heapSort(array a, int n) {
    heapify(a,n)
        for( j = n ; j > 1 ; j-- ) {
            swap a[1] and a[j]
            bubbleDown(1,a,j-1)
    }
}
```

### Divide and Conquer

Recursively splits the sorting problem into more manageable sub-problems. Idea is that it will usually be easier to sort many smaller collections of items than one big one.

### Quicksort

Idea is to repeatedly split/partition given array such that all items in first sub-array are smaller than all items in second sub-array, and then concatenate all sub-arrays to give sorted full array. At each stage, need to choose an item in array as pivot item which is kept in between and separate from both sub-arrays. During each stage, need to tell algorithm which part of array is under consideration. Average time complexity of O(nlog2n) and worst-case of O(n^2).

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

### Mergesort

Based on repeatedly splitting the array of items into two sub-arrays. As there is no reordering of items in sub-arrays, requires another procedure "merge" that merges two sorted sub-arrays into another sorted array.

```
mergesort(array a, int left, int right) {
    if ( left < right ) {
        mid = (left + right) / 2
        mergesort(a, left, mid)
        mergesort(a, mid+1, right)
        merge(a, left, mid, right)
    }
}
```

#### Merge Algorithm

Principle is as follows:

- Since both sub-arrays are sorted, the smallest item overall must be either smallest item in first or second collection.
- Second-smallest item is likewise in either first/second collection.
- Work through both collections until one sub-array is finished.
- Remainder of unfinished sub-array is copied.

```
merge(array a, int left, int mid, int right) {
    create new array b of size right-left+1
    bcount = 0
    lcount = left
    rcount = mid+1
    while ( (lcount <= mid) and (rcount <= right) ) {
        if ( a[lcount] <= a[rcount] )
            b[bcount++] = a[lcount++]
        else
        b[bcount++] = a[rcount++]
        }
    if ( lcount > mid )
        while ( rcount <= right )
            b[bcount++] = a[rcount++]
    else
        while ( lcount <= mid )
            b[bcount++] = a[lcount++]
    for ( bcount = 0 ; bcount < right-left+1 ; bcount++ )
        a[left+bcount] = b[bcount]
}
```
