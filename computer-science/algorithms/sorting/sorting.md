### Sorting

A collection of data is called a record, whereby each record contains a key and remainder as satellite data. In practice, when a sorting algorithm permutes keys, it must permute satellite data as well. If each record includes large amount of satellite data, normally permute an array of pointers to the records.

When focusing on the problem of sorting, we assume that the input consists only of numbers.

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
