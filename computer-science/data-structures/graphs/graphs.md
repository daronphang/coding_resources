### Graphs

A graph is a data structure where a node can have zero or more adjacent elements. Consists of series of nodes. Terminology as follows:

- Edge: Connection between two nodes.
- Vertices: Alternative term for nodes/vertex; can have edges that coonnect to itself i.e. self-loop.
- Degree: Number of edges connected to a vertex.
- Path: Sequence of nodes such that Vi and Vi+1 are connected by an edge for 1<=i<= n-1.
- Neighbors: When two vertices are connected by an edge.
- Adjacent: Two edges that have a vertex in common.

Not all vertices have to be connected in the graph. Can have isolated nodes or separated subgraphs.

https://adrianmejia.com/data-structures-for-beginners-graphs-time-complexity-tutorial/#Depth-first-search-DFS-Graph-search

![b-nodes](../images/graphs.PNG)

#### Types of Graphs

- Simple: Graph with no self-loops and no more than one edge connecting any pair of vertices.
- Weighted: Edges have values/cost assigned to them; if absent, can assume it is 1.
- Undirected: Edges are bi-directional i.e. can be viewed as going both ways.
- Directed (Digraphs): Edges have a direction i.e. indicated by arrows.
- Cyclic: Graph with cycles i.e. can get same node more than once.
- Acyclic: Graph without cycles.
- Connected: All nodes have at least one edge.
- Sparse: Few connections in graph.
- Dense: Many conenctions i.e. close to max number of links.
- Complete: All nodes are connected to all other nodes i.e. each node has (#nodes-1) edges.

An acyclic undirected graph is also a tree. For directed graphs, notion of connectedness has two versions:

- Weakly Connected: there is either a path from A to B or B to A.
- Strongly Connected: there are paths leading both ways.

#### Weighted Graph Application

| Application      | Node/Vertex       | Edges                               | Weight                          |
| ---------------- | ----------------- | ----------------------------------- | ------------------------------- |
| Airline Traffic  | Airport           | Direct flights between two airports | Distance between two airports   |
| GPS Navigation   | Road intersection | Road                                | Time taken between destinations |
| Networks Routing | Server            | Data link                           | Connection speed                |

### Implementing Graphs

#### Adjacency Matrix

A way of representing graph using two-dimensional array (N\*N matrix). Add 1 if connected and 0 or - if not connected. Only works if the graph is given explicitly i.e. we know in advance how many vertices there are and their edges.

```
  a b c d e
a 1 1 - - -
b - - 1 - -
c - - - 1 -
d - 1 1 - -
```

However, there is a potential problem whereby if the graph has many vertices, the array will be very large. If the graph has relatively few edges or sparse, the matrix will contain many 0s and it will be a waste of space to reserve so much memory for so little information.

#### Mixed Implementation

Solution to above problem is to use mixed implementation. Instead of using two-dimensional array, use one-dimensional array that points to a linked list of neighbours for each vertex.

#### Pointer-Based Implementation

The standard pointer-based implementation of binary trees i.e. generalization of linked lists. When each vertex/node is created, an array of neighbours big enough to accomodate all its neighbours is allocated.

#### Adjacency List

One of the most common ways to represent graphs. Each node has a list of all the nodes connected to it. Can be represented using an array or hashmap. Each node includes a list (array, linked list, set, etc.) that lists its adjacent nodes. Has time complexity of O(n) as you have to go through the list.

```
a -> { a b }
b -> { c }
c -> { d }
d -> { b c }
```

```js
// as hashmap
const graph = {
  a: ["a", "b"],
  b: ["c"],
  c: ["d"],
  d: ["b", "c"],
};
```

### Relations Between Graphs

Two graphs are said to be **isomorphic** if they contain the same number of vertices with same pattern of adjacency i.e. there is bijection between their vertices which perseves the adjacency relations.

A **subgraph** of G is defined as any graph that has a vertex set which is a subet of G. A **supergraph** of G is defined as any graph which has G as a subgraph.

If nodes U and V are connected by edge E, and U and W are connected by edge E1, and W and V are connected by edge E2, then both E1 and E2 are subdivions of E. **Smoothing** refers to a process of removing vertex (W) which leaves an edge connecting the remaining adjacent vertices.

![b-nodes](../images/subdivision.PNG)

A subdivision of graph G can be defined as a graph resulting from the subdivision of edges in G. Two graphs G and H can be defined as **homeomorphic** if there is a graph isomorphism from some subdivision of G to some subdivision of H.

An **edge contraction** removes an edge from a graph and merges the two vertices previously connected by it. This can lead to multiple edges between a pair of vertices, or self-loops connecting a vertex to itself.

### Planarity

A planar graph is one that can be embedded in a plane i.e. can be drawn on a sheet of paper in such a way that no edges cross each other. This is important in applications such as printed circuit design. Though planar graphs can have edges that cross each other, they can be transformed by moving vertices or deforming the edges.

![b-nodes](../images/planar.PNG)

To prove a finite graph is planar, it must not contain a subgraph that is homeomorphic to, or a subdivision of K5 (fully connected graph with five vertices) or K3,3 (three vertices fully connected to three other vertices).

### Traversals

In order to traverse a graph i.e. systematically visit all its vertices, need a strategy for exploring which guarantees that we do not miss any edges or vertices. Graphs do not have roots like trees and hence, there is no natural place to start a traversal.

#### Breadth-First Search (BFS)

For circles in graphs, would end in infinite loop. To avoid this, can create a second array "done" of booleans, where done[j] is true if we have already visited the vertex with number j. Steps as follows:

- Start from an initial vertex.
- Visit all adjacent nodes/neighbors one by one by placing them in an initially empty queue (FIFO).
- Remove first vertex from queue and one by one put its neighbours at end of queue.
- Once vertex is visited, set done[j] as true.
- Only add vertex to queue if done[j] is false.
- Repeat until queue is empty.

#### Depth-First Search (DFS)

- Start from an initial vertex.
- Put vertex on a stack (FILO).
- Take the item from stack, mark it as done, look up its neighbours and add them onto the stack.
- Repeatedly pop the next vertex from the stack and repeat previous step.

A way to navigate a graph from an initial vertex by recursively calling the first adjacent node of each vertex found.

#### Example

For unweighted graph below, using two approaches starting from A yields:

- BFS: A, B, D, C, E.
- DFS: A, B, C, E, D

Order of vertices depends on implementation.

![b-nodes](../images/unweighted-graph.PNG)
