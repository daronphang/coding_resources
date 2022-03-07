### Binomial Heaps

Similar to binary heap, but has advantage of more efficient procedures for insertion/merging. A binomial heap is implemented as a collection of binomial trees and defined recusrively as follows:

- Binomial tree of order 0 is a single node.
- Binomial tree of order k has a root node with children that are roots of binomial trees of orders k-1, k-2, ..., 2, 1, 0 (in that order).
- Binomial tree of order k has height k, contains 2^k nodes.
- There can only be zero or one binomial tree of each order.
- Each constituent binomial tree must satisfy the priority ordering property.

![nodes](../../images/binomial-heaps.PNG)

Most important operation for binomial heaps is merge as it can be used as a sub-process for most other operations. Has O(log2n) time complexity which is better than O(n) complexity of merging binary heaps.
