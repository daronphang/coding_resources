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

### Methods with Pointer Receiver
As calling a function makes a copy of each argument value, or if it needs to update a variable, must pass address of variable instead of copying it. If the receiver p has a method which requires a pointer, compiler will perform an implicit &p on the variable if shorthand is used. Only works for variables including struct, array and slices. 

In a realistic program, convention dictates that if any method of variable has a pointer receiver, then all methods should have a pointer receiver, even ones that don't strictly need it. If all methods of named type T have a receiver type T itself (not \*T), it is safe to copy instances of that type i.e. calling any of its methods makes a copy.

```go
func (p *Point) ScaleBy(factor float64) {
  p.X *= factor
  p.Y *= factor
  // name of method: (*Point).ScaleBy
}

r := &Point{1, 2}
r.ScaleBy(2)    // shorthand; compiler performs an implicit &p on the variable
fmt.Println(*r) // {2, 4}

// or this
p := Point{1, 2}
(&p).ScaleBy(2)
fmt.Println(p)  // {2,4}

Point{1, 2}.ScaleBy(2)    // compiler error; can't take address of Point literal

Point{1,2}.Distance(q)  // Point
pptr.ScaleBy(2)         // *Point
```
