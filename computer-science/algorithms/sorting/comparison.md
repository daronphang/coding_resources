## Comparison Sorting Strategies
#### Enumeration
Considers all items. If there are N items which are smaller than the ones we are currently considering, then its final position will be at (N+1).

#### Exchange
If two items are found to be out of order, exchange them. Repeat till all items are in order.

#### Selection
Find smallest item, put in first position. Find the smallest of remaining items, and put in second position. Repeat till all items are in order.

#### Insertion (Incremental Approach)
Take items one at a time and insert them into an initially empty data structure such that data structure continues to be sorted at each stage.

#### Divide and Conquer (DAC)
Recursively split the problem into small sub-problems till you just have single items that are trivial to sort. Then put sorted parts together in a way that preserves the sorting. Algorithms that are recursive in nature follow DAC approach. Involves three steps at each level of recursion:
1) **Divide** the problem into a number of subproblems that are smaller instances of the same problem.
2) **Conquer** the subproblems by solving them recursively.
3) **Combine** the solutions to subproblems into the solution for the original problem.

### Bubble Sort

Follows exchange sort approach. Easy to implement but slow to run. Worst case and average case number of comparisons have time complexities of O(n^2). 

1. Compares a[n-1] with a[n-2] and swaps if they are in wrong order.
2. Compares a[n-2] with a[n-3] and swaps if need to be.
3. Once it reaches a[0], smallest item will be in correct place.
4. Starts back again but leaves zeroth entry alone.
5. Keeps making passes over the array until it is sorted.

```
for ( i = 1 ; i < n ; i++ )
    for ( j = n-1 ; j >= i ; j-- )
        if ( a[j] < a[j-1] )
            swap a[j] and a[j-1]
```

### Insertion Sort

Worst case and average case number of comparisons have time complexities of O(n^2).

1. Starts by treating first entry a[0] as an already sorted array.
2. Checks the second entry a[1] and compares it with first.
3. If wrong order, remembers old a[1], moves a[0] up to a[1] slot, and move old a[1] to a[0].
4. Repeats until whole array is sorted.

```
// i represents index of original array, starts from beginning
// j represents index of sorted array; starts from end
for ( i = 1 ; i < n ; i++ ) {
    key = a[i]
    for( j = i; j > 0 ; j-- )
        if ( a[j] < a[j-1] )
            swap a[j] and a[j-1]
            a[j] = a[j-1]
            a[j-1] = key
        else break
}
// loop invariant is that for each iteration, A[1, ..., j-1] consists of elements
// originally in A[1, ..., j-1] but in sorted order
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

Follows DAC paradigm:
- Divide array into two subsequences of n/2 elements each.
- Conquer by sorting the two subsequences recusrively using mergesort.
- Combine by merging the two sorted subsequences to produce sorted answer.

Recursion bottoms out when sequence to be sorted has length of one. Key operation is merged two sorted sequences in "combine" step:
- Since both sub-arrays are sorted, the smallest item overall must be either smallest item in first or second collection.
- Second-smallest item is likewise in either first/second collection.
- Work through both collections until one sub-array is finished.
- Remainder of unfinished sub-array is copied.

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

```
// MERGE(A, p, q, r) where p <= q < r
// assumes subarrays A[p...q] and A[q+1...r] are in sorted order
// takes O(n) where n = r-p+1

merge(array a, p left, q mid, r right) {
    n1 = q - p + 1
    n2 = r - q
    create L = [] and R = []
 
    for (i=1; i <= n1; i++) {
        L[i] = A[p+i-1]
    }
    
    for (j=1; i <= n2; i++) {
        R[i] = A[R+j]
    }
    
    // sentinel card at bottom of each pile that cannot be smaller unless both piles are exposed
    L[n1+1] = INFINITY
    R[n2+1] = INFINITY
    
    let i = j = 1
    for (k=p, k <= r, k++} {
        if (L[i] <= R[j]) {
            A[k] = L[i]
            i++
        } else {
            A[k] = R[j]
            j++
        }
    }
}
```
