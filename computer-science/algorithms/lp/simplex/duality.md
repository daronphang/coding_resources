## Duality

Duality is a powerful concept that enables us to prove that a solution is indeed optimal. Given a linear program in which the objective is to maximize, we can formulate a dual linear program in which the objective is to minimize and whose optimal value is identical to that of the original linear program. When referring to dual linear programs, we call the original linear program **primal**.

To form the dual:

1. Change the maximization to a minimization.
2. Exchange the roles of coefficients on the right-hand sides and the objective function.
3. Replace (<=) with (>=).
4. Each of the m constraints in the primal has an associated variable yi in the dual.

The optimal value of the dual linear program is always equal to the optimal value of the primal linear program. Moreover, the simplex algorithm implicitly solves both the primal and dual linear programs simultaneously, thereby providing a proof of optimality.

```
// primal
Maximize
    3x1 + x2 + 2x3
Subject to
    x1 + x2 + 3x3 <= 30
    2x1 + 2x2 + 5x3 <= 24
    4x1 + x2 + 2x3 <= 36
    x1,x2,x3 >= 0

// dual
Minimize
    30y1 + 24y2 + 36y3      // coefficients swap with right-hand sides
Subject to
    y1 + 2y2 + 4y3 >= 3     // from primal, extract coefficients downwards x1 + 2x1 + 4x1
    y1 + 2y2 + y3 >= 1
    3y1 + 5y2 + 2y3 >= 2
    y1,y2,y3 >= 0
```
