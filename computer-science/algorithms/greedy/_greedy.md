## Greedy Algorithms

A greedy algorithm always makes the choice that looks best at the current moment i.e. makes a locally optimal choice in the hope that this choice will lead to a globally optimal solution. Though they do not always yield optimal solutions, for many problems they do. For many optimization problems, greedy algorithm is simpler and more efficient than dynamic programming. Typically have top-down design i.e. make a choice and then solve a subproblem, rather than bottom-up technique which involves solving subproblems before making a choice.

### Elements of the Greedy Strategy

Greedy-choice property and optimal substructure are two key ingredients to tell whether a greedy algorithm will solve a particular optimization problem. Sequence of steps as follows:

1. Cast the optimization problem as one in which we make a choice and are left with one subproblem to solve.
2. Prove that there is always an optimal solution to the original problem that makes the greedy choice, so that the greedy choice is always safe.
3. Demonstrate optimal substructure by showing that, having made the greedy choice, what remains is a subproblem with the property that if we combine an optimal solution to the subproblem with the greedy choice we made, we arrive at an optimal solution.

### Greedy-Choice Property

In a greedy algorithm, we make whatever choice seems best at the moment and then solve the subproblem that remains in a top-down fashion.

### Optimal Substructure

A problem exhibits an optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems. For instance, the shortest path problem has the following substructure property:

- If a node x lies in the shortest path from node u to node v.
- Shortest path from u to v contains shortest path from u to x, and x to v.
