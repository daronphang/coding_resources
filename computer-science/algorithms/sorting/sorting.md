### Sorting Strategies (Comparison)

#### Enumeration

Considers all items. If there are N items which are smaller than the one we are currently considering, then its final position will be at number N + 1.

#### Exchange

If two items are found to be out of order, exchange them. Repeat till all items are in order.

#### Selection

Find smallest item, put in first position. Find the smallest of remaining items, and put in second position. Repeat till all items are in order.

#### Insertion

Take items one at a time and insert them into an initially empty data structure such that data structure continues to be sorted at each stage.

#### Divide and Conquer

Recursively split the problem into small sub-problems till you just have single items that are trivial to sort. Then put sorted parts together in a way that preserves the sorting.

### Time Complexities

For computing time complexities, there is no general upper bound as a stupid algorithm can compare the same two items indefinitely. More interested in lower bound. For comparison algorithms, lower bound must be at least n, since we need n steps to examine every element. Nonetheless, no algorithm can take fewer than O(nlog2n) comparisons. To determine average and worst number of comparisons, best is to use decision tree (binary tree). Height of tree is equivalent to number of comparisons needed in worst case.

![b-nodes](../images/decision-tree.PNG)
