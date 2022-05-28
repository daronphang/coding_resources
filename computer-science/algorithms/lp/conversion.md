## Converting Linear Programs into Standard Form

It is always possible to convert a linear program into standard form. A linear program might not be in standard form for any of four possible reasons:

1. The objective function might be a minimization rather than a maximization.
2. There might be variables without non-negativity constraints.
3. There might be equality constraints (=).
4. There might be inequality constraints with greater than sign (>=) instead of less than (<=).

When converting one linear program L into another linear program L', we would like the property that an optimal solution to L' yields an optimal solution to L.

### Example

```
Minimize
    -2x + 3y
Subject to
    x + y = 7
    x - 2y <= 4
    x1 >= 0         // x2 does not have non-negativity constraint
```

### Step 1

```
Maximize
    2x - 3y
```

### Step 2

For variables that does not have non-negativity constriants, replace each occurrence Xj by Xj' - Xj''.

```
Maximize
    2x - 3y' + 3y''
Subject to
    x + y' - y'' = 7
    x - 2y' + 2y'' <= 4
    x, y', y'' >= 0
```

### Step 3

Convert equality constraints into inequality by replacing it with both greater-than and less-than.

```
Maximize
    2x - 3y + 3z
Subject to
    x + y - z <= 7
    x + y - z >= -7
    x - 2y + 2z <= 4
    x, y, z >= 0
```

### Step 4

Convert greater-than to less-than constraints by multiplying them by -1.

```
Maximize
    2x - 3y + 3z
Subject to
    x + y - z <= 7
    -x - y + z <= -7
    x - 2y + 2z <= 4
    x, y, z >= 0
```

## Converting Linear Programs into Slack Form

To efficiently solve a linear program with the simplex algorithm, we prefer to express it in a form in which some of the constraints are equality constraints i.e. non-negativity constraints are the only inequality constraints, and remaining constraints are equalities.

```
Summation(AijXj) <= Bi          // inequality constraint
Xn+i = Bi - Summation(AijXj)    // introduce a new slack variable
```

### Step 1

```
Maximize
    2x - 3y + 3z
Subject to
    x4 = 7 - x - y + z
    x5 = -7 + x + y - z
    x6 = 4 - x + 2y - 2z
    x, y, z, x4, x5, x6 >= 0
```

### Step 2 (slack form)

```
obj = 2x - 3y + 3z
x4 = 7 - x - y + z
x5 = -7 + x + y - z
x6 = 4 - x + 2y - 2z
```

### Concise notation for slack form

The sets of basic and nonbasic variables will change as the simplex algorithm runs.

The indices into A, b and c are not necessarily sets of contiguous integers; they depend on the index sets B and N.

```
Tuple = (N,B,A,b,c,v)

N = set of indices of nonbasic variables
B = set of indices of basic variables
```

```
// a different example of slack form

z = 28 - (1/6)x3 - (1/6)x5 - (2/3)x6
x1 = 8 + (1/6)x3 + (1/6)x5 - (1/3)x6
x2 = 4 - (8/3)x3 - (2/3)x5 + (1/3)x6
x4 = 18 - (1/2)x3 + (1/2)x5

B = {1,2,4}
N = {3,5,6}

// values in A are the negatives of the coefficients as they appear in the slack form
A= ((-1/6, -1/6, 1/3),
    (8/3, 2/3, -1/3),
    (1/2, -1/2, 0)
    )
b = (8, 4, 18)
c = (-1/6, -1/6, -2/3)  // coefficients of objective function
v = 28
```
