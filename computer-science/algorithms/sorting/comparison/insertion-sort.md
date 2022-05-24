## Insertion Sort

Worst case and average case number of comparisons have time complexities of O(n^2).

1. Starts by treating first entry a[0] as an already sorted array.
2. Checks the second entry a[1] and compares it with first.
3. If wrong order, remembers old a[1], moves a[0] up to a[1] slot, and move old a[1] to a[0].
4. Repeats until whole array is sorted.

### Algorithm (Pseudo)

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
