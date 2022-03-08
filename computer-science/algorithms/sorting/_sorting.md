### Sorting

A collection of data is called a record, whereby each record contains a key and remainder as satellite data. In practice, when a sorting algorithm permutes keys, it must permute satellite data as well. If each record includes large amount of satellite data, normally permute an array of pointers to the records.

When focusing on the problem of sorting, we assume that the input consists only of numbers.

### Basic Sorting

If given an array of sequential orders that are jumbled up, the simplest way is to put the items directly in the appropriate places:

```
for ( i = 0 ; i < n; i++ ) {
    while ( a[i] != i )
        swap a[a[i]] and a[i]
}
```

### Sorting Stability

A sorting algorithm is stable if it can never swap identical items past each other i.e. members with the same value appear in the output array in the same order as they do in the input array. 

- Bubble: Stable, items with identical keys will have their original order preserved.
- Insertion: Stable, items with identical keys will have their original order preserved.
- Selection: Unstable as nothing can stop an item from being swap past an identical item.

### Time Complexities Comparison

| Algorithm      | Worst-case Running Time | Average Case |
| -------------- | ----------------------- | ------------ |
| Insertion Sort | O(n^2)                  | O(n^2)       |
| Merge Sort     | O(nlogn)                | O(nlogn)     |
| Heapsort       | O(nlogn)                | -            |
| Quicksort      | O(n^2)                  | O(nlogn)     |
| Counting Sort  | O(k+n)                  | O(k+n)       |
| Radix Sort     | O(d(n+k))               | O(d(n+k))    |
| Bucket sort    | O(n^2)                  | O(n)         |
