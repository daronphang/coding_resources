### Shortest Paths (Dijkstra's Algorithm)

For two particular vertices S and Z in a graph with non-negative numbers, the compute the shortest route (adding up weights that gives smallest overall weight), it is most convenient to compute the shortest paths from S to all other nodes. All information is maintained in simple arrays, which are iteratively updated until solution is reached.

### Overestimation of Shortest Paths

We keep an array D of distances indexed by vertices. D[z] will hold the distance of shortest path from S to Z when the algorithm finishes. However, before the algorithm finishes, D[z] is the best overestimate we currently have of the distance from S to Z. Steps as follows:

- Initially have D[s] = 0 and set D[z] = INFINITY for all other vertices z.
- Path length of neighbours are updated.
- If path length of adjacent vertex is lesser than new path length, no update is performed.
- Algorithm repeatedly decreases overestimates until it is no longer possible to decrease further.
- Algorithm terminates, with each estimate fully constrained and tight.

### Improving Estimates

General idea is to look systematically for shortcuts.

```
// given three vertices s, u, z where s is the starting point
if (D[u] + weight[u][z] < D[z])
    D[z] = D[u] + weight[u][z]
```
