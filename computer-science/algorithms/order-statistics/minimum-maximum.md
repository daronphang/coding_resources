## Minimum and Maximum

```
// n-1 comparisons

minimum(A) {
    min = A[1]
    for (i=2; i<A.length; i++)
        if (min > A[i])
            min = A[i]
    return min
}
```

### Simultaneous

For finding minimum and maximum, will take 2n-2 comparisons. However, can find using at most 3(n/2) comparisons by maintaining both the minimum and maximum elements. Rather than comparing each element against current minimum and maximum, at a cost of two comparisons per element, can process the elements in pairs:

-   Compare first pair of elements.
-   Compare smaller with current minimum.
-   Compare larger with current maximum.
-   Cost of three comparisons for every two elements.
