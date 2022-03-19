### Bellman-Ford Algorithm

Solves single-source shortest-paths problem in the general case in which edges can have negative weight. Is simple and has the further benefit of detecting whether a negative-weight cycle is reachable from the source by returning a boolean value. If there is such cycle, the algorithm indicates that no solution exists. Has time complexity of O(VE).

Uses dynamic programming to solve the problem in bottom-up manner i.e. first calculcates the shortest distances which have at-most one edge in the path, then it calculcates the shortest path with at-most two edges, and etc.

### Algorithm

```
bellmanFord(G,w,s){
    initializeSingleSource(G,s)
    for i=1 to |G.V| - 1
        for each edge (u,v) E G.E
            relax(u,v,w)

    // check if graph contains no negative-weight cycles
    for each edge (u,v) E G.E
        if v.d > u.d + w(u,v)
            return FALSE
    return TRUE
}
```

### Figure

<img src="../../../images/shortest-paths-bellman-ford.PNG">

### Sequence

#### First Iteration

(s,t) = 6
(s,y) = 7
(t,x) = 6 + INFINITY = INFINITY
(t,y) = INFINITY
(t,z) = INFINITY
(y,z) = INfINITY
(z,x) = INFINITY
(x,t) = INFINITY
(z,x) = INFINITY
(y,x) = INFINITY

#### Second Iteration

(s,t,x) = 11
(s,t,z) = 2
(s,t,y) = 6 + 8 = 14 > 7 (no change)
(s,y,x) = 7 - 3 = 4 (updated)
(s,y,z) = 7 + 9 = 16 > 2 (no change)

#### Third Iteration

(s,y,x,t) = 4 - 2 = 2 (updated)

#### Fourth Iteration

(s,y,x,t,z) = 2 - 4 = -2 (updated)
