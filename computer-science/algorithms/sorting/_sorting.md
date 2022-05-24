## Sorting

A collection of data is called a record, whereby each record contains a key and remainder as satellite data. In practice, when a sorting algorithm permutes keys, it must permute satellite data as well. If each record includes large amount of satellite data, normally permute an array of pointers to the records.

When focusing on the problem of sorting, we assume that the input consists only of numbers.

## Basic Sorting

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

## Comparison of Sorting Algorithms

| Algorithm      | Worst-case Running Time | Average Case | Space Complexity |
| -------------- | ----------------------- | ------------ | ---------------- |
| Bubble Sort    | O(n^2)                  | O(n^2)       | O(1)             |
| Insertion Sort | O(n^2)                  | O(n^2)       | O(1)             |
| Selection Sort | O(n^2)                  | O(n^2)       | O(1)             |
| Merge Sort     | O(nlogn)                | O(nlogn)     | O(n)             |
| Heapsort       | O(nlogn)                | -            | O(1)             |
| Quicksort      | O(n^2)                  | O(nlogn)     | O(1)             |
| Counting Sort  | O(k+n)                  | O(k+n)       | O(k)             |
| Radix Sort     | O(d(n+k))               | O(d(n+k))    | O(n+k)           |
| Bucket sort    | O(n^2)                  | O(n)         | O(n)             |

## Fastest Algorithm

The fastest sorting algorithm is one that exploits the peculiarities of the input data, subjected to external constraints. Hence, industrial-strength sort systems keep a close eye on the size of input data and adjust/retune its algorithm. Hence, there is no fastest sorting algorithm for ALL cases.

Besides the algorithm itself, there are other tradeoffs that needs to be considered such as the constraints under which the sort algorithm has to run i.e. size of input, type of input, buffer/memory space availability, write capacity, convenience for user.

For small size inputs i.e. 10-20, selection sort or insertion sort is usually preferred.

For large size inputs, quicksort is preferred but requires to select the pivot element correctly. Generally outperforms heapsort in practice and is remarkably efficient on average.
