### Rod Cutting

Given a rod of length n inches and a table of prices Pi, determine the maximum revenue obtainable by cutting up the rod and selling the pieces. Can cut up a rod of length n in 2^(n-1) ways.

``` 
Length  1   2   3   4   5   6   7   8   9   10
Price   1   5   8   9   10  17  17  20  24  30
```

### Example (n = 4)

Since we don't know ahead of time which value of i optimizes revenue, have to consider all possible values of i. Once the first cut is made, we may consider the two pieces as independent instances of the rod-cutting problem i.e. subproblems. The overall optimal solution incorporates optimal solutions to the two related subproblems, maximizing revenue from each of those two pieces.

<img src="../../images/dp-rod-cutting-example.PNG" >

```
Rn = max(Pn, R1 + Rn-1, R2 + Rn-2, ..., Rn-1 + R1)

R4 = max(
  P4,
  R1 + R3,
  R2 + R2,
  R3 + R1, 
)
```
```
cutRod(p,n) {
  if n == 0
    return 0
  q = -INFINITY
  for i = 1 to n
    q = max(q, p[i], cutRod(p, n-i))
  return q
}
```
