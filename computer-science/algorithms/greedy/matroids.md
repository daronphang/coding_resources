## Matroids

This theory describes many situations in which the greedy method yields optimal solutions. A matroid is an ordered pair M = (S,I) satisfying the following conditions:

1. S is a finite set.
2. I is a nonempty family of subsets of S i.e. independent subsets of S.
3. I is hereditary if B is an element of I, and A is a subset of B, then A is an element of I.
4. If x is an element of B - A, and A U {x} is an element of I, then M satisfies the exchange property.

An exampel of matroids is the graphic matroid Mg = (Sg, Ig), defined in terms of a given undirected graph G = (V,E) as follows:

- Set Sg = E, the set of edges of G.
- If A is a subset of E, then A is an element of Ig if A is acyclic.
