## Mergesort

Follows DAC paradigm. Has time complexity of O(nlog2n).

- Divide array into two subsequences of n/2 elements each.
- Conquer by sorting the two subsequences recusrively using mergesort.
- Combine by merging the two sorted subsequences to produce sorted answer.

Recursion bottoms out when sequence to be sorted has length of one. Key operation is merged two sorted sequences in "combine" step:

- Since both sub-arrays are sorted, the smallest item overall must be either smallest item in first or second collection.
- Second-smallest item is likewise in either first/second collection.
- Work through both collections until one sub-array is finished.
- Remainder of unfinished sub-array is copied.

### Algorithm (Pseudo)

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
