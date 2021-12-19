### Declarations
in GO, special names such as _this_ or _self_ for receiver but instead we choose receiver names. Common choice is the first letter of type name. In method call, receiver argument appears before method name. Selectors are used to select fields of struct type i.e. p.X and also select methods i.e. p.Distance; since both methods and fields inhabit the same name space, cannot declare as the same name.

Methods can be declared on any named type defined in same package i.e. slice, struct, etc. 
```go
package geometry

import "math"

type Point struct { X, Y float64 }

// traditional function, no conflict with method below
// declared as package-level function called geometry.Distance
func Distance(p, q Point) float64 {
  return math.Hypot(q.X-p.X, q.Y-p.Y)
}

// method of Point, p is receiver 
// declared as method of type Point, Point.Distance
func (p Point) Distance (q Point) float64 {
  return math.Hypot(q.X-p.X, q.Y-p.Y)
}

p := Point{1, 2}
q := Point{4, 6}
fmt.Println(p.Distance(q))  // p.Distance is called a selector as it selects the appropriate Distance method for receiver p
```
