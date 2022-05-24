## Bubble Sort

Follows exchange sort approach. Easy to implement but slow to run. Worst case and average case number of comparisons have time complexities of O(n^2).

1. Compares a[n-1] with a[n-2] and swaps if they are in wrong order.
2. Compares a[n-2] with a[n-3] and swaps if need to be.
3. Once it reaches a[0], smallest item will be in correct place.
4. Starts back again but leaves zeroth entry alone.
5. Keeps making passes over the array until it is sorted.

### Algorithm (Pseudo)

```
for ( i = 1 ; i < n ; i++ )
    for ( j = n-1 ; j >= i ; j-- )
        if ( a[j] < a[j-1] )
            swap a[j] and a[j-1]
```
