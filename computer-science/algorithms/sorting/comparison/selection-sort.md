## Selection Sort

Worst case and average case number of comparisons have time complexities of O(n^2).

- Finds the smallest item and swaps it with item in a[0].
- Finds the second smallest item and swaps it with a[1].

### Algorithm (Pseudo)

```
for ( i = 0 ; i < n-1 ; i++ ) {
    k = i
    for ( j = i+1 ; j < n ; j++ )
        if ( a[j] < a[k] )
            k = j
    swap a[i] and a[k]
}
```
