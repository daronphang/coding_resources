### Shortest Paths (Dijkstra's Algorithm)

For two particular vertices S and Z in a weighted graph with non-negative numbers, the compute the shortest route (adding up weights that gives smallest overall weight), it is most convenient to compute the shortest paths from S to all other nodes. All information is maintained in simple arrays, which are iteratively updated until solution is reached.

### Overestimation of Shortest Paths

We keep an array D of distances indexed by vertices. D[z] will hold the distance of shortest path from S to Z when the algorithm finishes. However, before the algorithm finishes, D[z] is the best overestimate we currently have of the distance from S to Z. Starts with initializing three values:

- D[s] = 0 and set D[z] = INFINITY for all other vertices z.
- As algorithm proceeds, distance from source to each node will be recalculated and updated when shortest distance is found.
- Q, a queue of all nodes in the graph (will be empty at end).
- S, an empty set, to indicate which nodes the algorithm has visited (contains all nodes at end).

The algorithm proceeds as follows:
- Initialize Q with adjacent nodes of source.
- While Q is not empty, pop node V if not in S and add to S to indicate node has been visited.
- If path length of adjacent vertex is lesser than new path length, no update is performed; else update D[v] to shortest length.
- Pick next node with minimal distance and repeat adjacent node calculations.
- Algorithm repeatedly decreases overestimates until it is no longer possible to decrease further.
- Algorithm terminates, with each estimate fully constrained and tight.

### Improving Estimates

General idea is to look systematically for shortcuts.

```
// given three vertices s, u, z where s is the starting point
if (D[u] + weight[u][z] < D[z])
    D[z] = D[u] + weight[u][z]
```

### Example

