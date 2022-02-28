### Graphs

A graph is a data structure where a node can have zero or more adjacent elements. Terminology as follows:
- Edge: Connection between two nodes.
- Vertices: Alternative term for nodes; can have edges that coonnect to itself i.e. self-loop.
- Degree: Number of edges connected to a vertex.

Not all vertices have to be connected in the graph. Can have isolated nodes or separated subgraphs.

https://adrianmejia.com/data-structures-for-beginners-graphs-time-complexity-tutorial/#Depth-first-search-DFS-Graph-search

#### Types of Graphs
- Undirected: Edges are bi-directional.
- Directed: Edges have a direction.
- Cyclic: Graph with cycles i.e. can get same node more than once. 
- Acyclic: Graph without cycles.
- Connected: All nodes have at least one edge.
- Complete: All nodes are connected to all other nodes i.e. each node has (#nodes-1) edges.
- Weighted: Edges have values/cost assigned to them; if absent, can assume it is 1.

An acyclic undirected graph is also a tree. 

#### Weighted Graph Application

| Application      | Node/Vertex       | Edges                               | Weight                          |
|------------------|-------------------|-------------------------------------|---------------------------------|
| Airline Traffic  | Airport           | Direct flights between two airports | Distance between two airports   |
| GPS Navigation   | Road intersection | Road                                | Time taken between destinations |
| Networks Routing | Server            | Data link                           | Connection speed                |


### Graphs Representation

#### Adjacency List


#### Adjacency Matrix
