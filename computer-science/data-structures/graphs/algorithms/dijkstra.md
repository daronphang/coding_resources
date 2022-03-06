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

#### Version 1

To kee
Time complexity is O(n^2) as there are operations O(n) nested within O(n).

```
// input: start vertex 's' and weight matrix 'weight'
// output: array 'D' of distances

D[s] = 0

for ( each vertex z of graph) {
    if (z not the start vertex s)
        D[z] = infinity     // an overestimate
}

// use an auxiliary array 'tight' indexed by vertices
// records which nodes the short path estimates are known

for (each vertex z of graph) {
    tight[z] = false
}

// repeatedly update arrays 'D' and 'tight' until all entries
// in 'tight' array hold true value

tight[u] = true
for (each vertex z adjacent to u) {
    if (D[u] + weight[u][z] < D[z] )
        D[z] = D[u] + weight[u][z]  // lower estimate exists
}
```

### Example (Version 1)

![b-nodes](../../images/dijkstra-example.PNG)

#### Stage 1

Vertex A has minimal estimate, and so is tight.
D[B] reduced from INFINITY to 1 via A.
D[D] reduced from INFINITY to 4 via A.

#### Stage 2

Vertex B has minimal estimate, and so is tight.
D[C] reduced from INFINITY to 3 via B.
D[D] reduced from 4 to 3 via B.
D[E] reduced from INFINITY to 7 via B.

#### Stage 3

Vertex C has minimal estimate, and so is tight.
D[D] increased from 3 to 5 via C, and hence remains unchanged.
D[E] reduced from 7 to 4 via C.

#### Stage 4

Vertex D has minimal estimate, and so is tight.
D[E] remains same as 4 via D.

#### Stage 5

Vertex E has minimal estimate, and so is tight.

![b-nodes](../../images/dijkstra-example-1.PNG)

### Example (Version 2)

Time complexity can be improved by making use of priority queue i.e. heap to keep track of which node's distance esitmate becomes tight next. If priority queue is implemened as Binary or Binomial Heap:

- initializing D and creating priority queue have both complexity O(n).
- Rearranging priority queu by bubbling up takes O(log2n) steps.
- Removals happen O(n) times.
- Priority changes happen O(e) times, where e is the number of edges.
- Total time complexity is O((e+n)log2n).

```
// create priority queue containing all vertices of graph, with entries D as priorities

while (priority queue is not empty) {
    // remove vertex with lowest priority as u
    for (each vertex z in queue adjacent to u) {
        if (D[u] + weight[u][z] < D[z]>) {
            D[z] = D[u] + weight[u][z]
            // change priority of vertex z in queue to D[z]
        }
    }
}
```
