### Minimal Spanning Trees (MST)

A spanning tree of a graph is a subgraph that is a tree which connects all the vertices together, so it 'spans' the original graph but using fewer edges. Minimal refers to the sum of all the weights of the edges contained in that tree, so a minimal spanning tree has total weight less than or equal to the total weight of every other spanning tree (V-1 edges). There may not be a unique MST for a given graph.

### Pictoral Representation

Task could be supplying each house (node) with some commodity (water, gas, electricity) but with minimum digging and laying of pipes. To find the best cable layout, can use MST.

![b-nodes](../../images/MST.PNG)


### Kruskal Algorithm (Greedy)

1. Sort all edges in increasing order of their weight.
2. Pick the smallest edge. Check if it forms a cycle with the spanning tree.
3. If cycle is not formed, include this edge; else discard it.
4. Repeat until there are V-1 edges in spanning tree.

#### Example

![b-nodes](../../images/kruskal-example.PNG)

``` 
Weight   Src    Dest
1         7      6
2         8      2
2         6      5
4         0      1
4         2      5
6         8      6
7         2      3
7         7      8
8         0      7
8         1      2
9         3      4
10        5      4
11        1      7
14        3      5
```

Steps as follows:
1. Pick edge 7-6: no cycle is formed, include it.
2. Pick edge 8-2: No cycle is formed, include it. 
3. Pick edge 6-5: No cycle is formed, include it. 
4. Pick edge 0-1: No cycle is formed, include it. 
5. Pick edge 2-5: No cycle is formed, include it. 
6. Pick edge 8-6: Since including this edge results in the cycle, discard it.
7. Pick edge 2-3: No cycle is formed, include it. 
8. Pick edge 7-8: Since including this edge results in the cycle, discard it.
9. Pick edge 0-7: No cycle is formed, include it. 
10. Pick edge 1-2: Since including this edge results in the cycle, discard it.
11. Pick edge 3-4: No cycle is formed, include it.

### Prim's Algorithm (Greedy)

Starts with an empty spanning tree that maintains two sets of vertices; first contains vertices included in MST, and the other not yet included. At every step, it considers all the edges that connect the two sets, and picks the minimum weight edge from these edges. After picking the edge, it moves the other endpoint of the edge to the set containing MST. Algorithm as follows:
- Create a set mstSet that keeps track of vertices already in MST.
- Assign a key value to all vertices in graph; initialize all as INFINITE and assign 0 to the first vertex.
- Pick a vertex U not inside mstSet and has minimum key value, and update key value of all adjacent vertices. 
- If weight of edge U-V < V, update key value as weight of U-V.

From the above example:
1. Keys assigned to vertices as {0, INF, INF, INF, INF, INF, INF, INF}.
2. Vertex 0 is picked and included in mstSet. 
3. Adjacent vertices are 1 and 7 and key values are updated as 4 and 8 respectively. 
4. Vertex with minimum key value (1) is picked and added to mstSet which becomes {0, 1}.
5. Adjacent vertices are 7 and 8 which both have key values of 8; can pick either one.
7. Repeat until mstSet contains all vertices of given graph.
8. Final mstSet becomes {0, 1, 7, 6, 5, 2, 8, 3, 4}.

![b-nodes](../../images/prim-example.PNG)
