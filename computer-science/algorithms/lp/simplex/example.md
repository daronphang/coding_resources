## Example

```
Maximize
    3x1 + x2 + 2x3
Subject to
    x1 + x2 + 3x3 <= 30
    2x1 + 2x2 + 5x3 <= 24
    4x1 + x2 + 2x3 <= 36
    x1,x2,x3 >= 0
```

### Slack form

System of contraints has 3 equations and 6 variables i.e. infinite number of solutions. A solution is feasible of all x1,x2,..., x6 are nonnegative.

```
z = 3x1 + x2 + 2x3
x4 = 30 - x1 - x2 - 3x3
x5 = 24 - 2x1 - 2x2 - 5x3
x6 = 36 - 4x1 - x2 - 2x3
```

### Basic solution

Setting all nonbasic variables to 0 and then compute the values of basic variables. If a basic solution is feasible, we call it a **basic feasible solution**.

```
Objective solution is (0,0,0,30,24,36)
Objective value = 3*0 + 1*0 + 2*0 = 0
```

### Iterations

Our goal in each iteration is to reformulate the linear program so that the basic solution has a greater objective value. We select a nonbasic variable Xe whose coefficient in the objective function is positive, and we increase it as much as possible without violating any of the constraints. This variable Xe then becomes basic, and some other variable Xt becomes nonbasic.

#### First iteration

```
// increasing X1 to tightest constraint
X1 = 30: X5, X6 < 0
X1 = 12: X6 < 0
X1 = 9 (tightest constraint)

x1 = 9 - (1/4)x2 - (1/2)x3 - (1/4)x6

// perform pivot for all other equations by substituting x1 with the above eq
```

```
// pivot

z = 27 + (1/4)x2 + (1/2)x3 - (3/4)x6
x1 = 9 - (1/4)x2 - (1/2)x3 - (1/4)x6
x4 = 21 - (3/4)x2 - (5/2)x3 + (1/4)x6
x5 = 6 - (3/2)x2 - 4x3 + (1/2)x6

Objective solution is (9,0,0,21,6,0)
Objective value = 3*9 + 1*0 + 2*0 = 27
```

#### Second iteration

We do not wish to increase x6 since as its value increases, the objective value decreases. We can attempt to increase either x2 or x3.

```
// tightest constraint for x3 is 3/2

Equation
    x5 = 6 - (3/2)x2 - 4x3 + (1/2)x6
Rewritten into
    x3 = 3/2 - (3/8)x2 - (1/4)x5 + (1/8)x6

// pivot
z = 111/4 + (1/16)x2 - (1/8)x5 - (11/16)x6
x1 = 33/4 - (1/16)x2 + (1/8)x5 - (5/16)x6
x3 = 3/2 - (3/8)x2 - (1/4)x5 + (1/8)x6
x4 = 69/4 + (3/16)x2 + (5/8)x5 - (1/16)x6

Objective solution is (33/4,0,3/2,69/4,0,0)
```

#### Third iteration

Increase x2 to 4.

```
z = 28 - (1/6)x3 - (1/6)x5 - (2/3)x6
x1 = 8 + (1/6)x3 + (1/6)x5 - (1/3)x6
x2 = 4 - (8/3)x3 - (2/3)x5 + (1/3)x6
x4 = 18 - (1/2)x3 + (1/2)x5

Objective solution is (8,4,0,18,0,0)
Objective value is 3*8 + 1*4 + 2*0 = 28
```

#### Solution

At this point, all coefficients in the objective function are negative i.e. increasing any variable will decrease the basic solution. This situation occurs only when we have rewritten the linear program so that the basic solution is an optimal solution of 28.
