### Non-Comparison Sorts

For sorting integers sequentially, the simplest way is to put the items directly in the appropriate places:

```
for ( i = 0 ; i < n; i++ ) {
    while ( a[i] != i )
        swap a[a[i]] and a[i]
}
```

### Bin, Bucket, Radix Sorts

Works well when items are labelled by small sets of values.

