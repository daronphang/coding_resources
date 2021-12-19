### Declarations
in GO, special names such as _this_ or _self_ for receiver but instead we choose receiver names. Common choice is the first letter of type name. In method call, receiver argument appears before method name.
```go
package geometry

import "math"

type Point struct { X, Y float64 }

// traditional function
func Distance(p, q Point) float64 {
  return math.Hypot(q.X-p.X, q.Y-p.Y)
}

// method of Point, p is receiver 
func (p Point) Distance (q Point) float64 {
  return math.Hypot(q.X-p.X, q.Y-p.Y)
}
```
