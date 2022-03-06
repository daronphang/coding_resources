### Minimal Spanning Trees (MST)

A spanning tree of a graph is a subgraph that is a tree which connects all the vertices together, so it 'spans' the original graph but using fewer edges. Minimal refers to the sum of all the weights of the edges contained in that tree, so a minimal spanning tree has total weight less than or equal to the total weight of every other spanning tree (V-1 edges). There may not be a unique MST for a given graph.

### Pictoral Representation

Task could be supplying each house (node) with some commodity (water, gas, electricity) but with minimum digging and laying of pipes. To find the best cable layout, can use MST.

![b-nodes](../../images/MST.PNG)


### Kruskal Algorithm

1. Sort all edges in non-decreasing order of their weight.
2. Pick the smallest edge. Check if it forms a cycle with the spanning tree.
3. If cycle is not formed, include this edge; else discard it.
4. Repeat until there are V-1 edges in spanning tree.
