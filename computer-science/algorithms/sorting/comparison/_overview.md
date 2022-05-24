## Comparison Sorting Strategies

All sorting algorithms must make O(nlogn) comparisons in worst case to sort n elements.

### Enumeration

Considers all items. If there are N items which are smaller than the ones we are currently considering, then its final position will be at (N+1).

### Exchange

If two items are found to be out of order, exchange them. Repeat till all items are in order.

### Selection

Find smallest item, put in first position. Find the smallest of remaining items, and put in second position. Repeat till all items are in order.

### Insertion (Incremental Approach)

Take items one at a time and insert them into an initially empty data structure such that data structure continues to be sorted at each stage.

### Divide and Conquer (DAC)

Recursively split the problem into small sub-problems till you just have single items that are trivial to sort. Then put sorted parts together in a way that preserves the sorting. Algorithms that are recursive in nature follow DAC approach. Involves three steps at each level of recursion:

1. **Divide** the problem into a number of subproblems that are smaller instances of the same problem.
2. **Conquer** the subproblems by solving them recursively.
3. **Combine** the solutions to subproblems into the solution for the original problem.

## Sort Comparison

| Algorithm | 128 | 256 | 512 | 1024 | 1024(ordered) | 1024(Reversed) | 2048  |
| --------- | --- | --- | --- | ---- | ------------- | -------------- | ----- |
| Bubble    | 54  | 221 | 881 | 3621 | 1284          | 5627           | 14497 |
| Insertion | 15  | 69  | 276 | 1137 | 6             | 2200           | 4536  |
| Selection | 12  | 45  | 164 | 634  | 643           | 833            | 2497  |
