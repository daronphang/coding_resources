## Interfaces

Interface types express generalizations or abstractions about the behaviors of other types. GO's interfaces are distinctive from other OOP langauges is that they are satisfied implicitly i.e. no need to declare all interfaces that a given concrete type satisfies but simply possessing the necessary methods is enough. Interfaces are about helping you to reuse code i.e. form a contract between different functions and types. Interfaces are able to take different sources of input and provide a common output i.e. Reader interface takes any type of data as input and outputs as []byte for anyone to work with.

Interface is an abstract custom type that is used to specify a set of one or more method signatures i.e. collection of methods. Necessary to implement all the methods declared in the interface for implementing the interface. They are implemented implicitly.

When an interface contains zero methods, such types of interface is known as the empty interface i.e. all types implement the empty interface. Interface itself is a static type, but it does not have a static value and always points to dynamic values.

```go
package main

import (
    "fmt"
    "math"
)

type geometry interface {
    area() float64
    perim() float64
}

type rect struct {
    width, height float64
}
type circle struct {
    radius float64
}

func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perim() float64 {
    return 2*r.width + 2*r.height
}

func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
    return 2 * math.Pi * c.radius
}

func measure(g geometry) {
    fmt.Println(g)
    fmt.Println(g.area())
    fmt.Println(g.perim())
}

func main() {
    r := rect{width: 3, height: 4}
    c := circle{radius: 5}

    measure(r)
    measure(c)
}
```

```go
// not ideal!
func (d deck) shuffle() {}
func (i []int) shuffle() {}
func (s string) shuffle() {}

// as long as concrete type has function called createCardDeck(), it is also an honorary member of type Card
type Card interface {
  createCardDeck() []string
}

func shuffle(c Card) {
  // some common shuffle logic
}
```

### Compile Errors

Arises when you try to assign/pass a concrete type to an interface type and the concrete type does not implement the interface, or if you are passing a pointer to the type.

```go
type Stringer interface {
    String() string
}

type MyType struct {
    value string
}

func (m *MyType) String() string { return m.value }

func main() {
    var s Stringer
    m := MyType{value: "something"}
    s = m   // error!
    s= &m   // ok!
}
```

### Concrete Type

Concrete type specifies the exact representation of its values and exposes the intrinsic operations of that representation i.e. arithmetic for numbers, indexing/append/range for slices.

### Contracts Type

Abstract interface that reveals only some of the methods.

```go
package fmt

// abstract interface {}
var any interface{}
any = true
any = 12.34
any = "hello"

// F prefix stands for file and indicates the formatted output should be written to file provided as first arg
func Fprintf(w io.Writer, format string, args ...interface{}) (int, error)
// printf is a wrapper around Fprintf that is agnostic about what happens to the result it computes
func Printf(format string, args ...interface{}) (int, error) {
  return Fprintf(os.Stout, format, args...)
}
```

### Interface Types

The io.Writer type is one of the most widely used interface as it provides an abstraction of all the types to which bytes can be written, which includes files, memory buffers, network connections, HTTP clients, archivers, etc. The io package defines many other useful interfaces.

```go
package io

// Reader represents any time from which you can read bytes
type Reader interface {
  // byte slice is passed as arg where Read() will push data into byte slice; original gets updated as it is a reference type
  // int is the number of bytes pushed to byte slice
  Read(p []byte) (n int, err error)
}

// Closer is any value that you can close such as a file or network connection
type Closer interface {
  Close() error
}

// embedding interface
type ReadWriter interface {
  Reader
  Writer
}
```

```go
type logWriter struct {}

func main() {
  resp, err := http.Get("http://google.com")
  if err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
  /*
  bs := make([]byte, 99999)
  resp.Body.Read(bs)
  fmt.Println(string(bs))
  */
  io.Copy(os.Stdout, resp.Body) // shortcut where os.Stdout implements Writer interface and resp.Body the Reader interface

  lw := logWriter{}
  io.Copy(lw, resp.Body)  // works!
}

// logWriter implements Writer interface as it has Write()
func (logWriter) Write(bs []byte) (int, error) {
  fmt.Println(string(bs))
  return len(bs), nil
}
```

### Interface Satisfaction

Only depends on the methods of the two types involved; hence, do not need to declare the relationship between concrete type and the interface it satisfies. Nonetheless, it is useful to document and assert the relatiosnhip when it is intended.

```go
// declaration asserts at compile time that value of type *bytes.Buffer satisfies io.Writer
var w io.Writer = new(bytes.Buffer)
var _ io.Writer = (*bytes.Buffer)(nil)  // another way without allocating a new variable
```

### Caveat: Interface Containing Nil Pointer is Non-Nil

A nil interface value, which contains no value at all, is not the same as an interface value containing a pointer that happens to be nil.

```go
const debug = true

func main() {
  var buf *bytes.Buffer
  if debug {
    buf = new(bytes.Buffer)
  }
  f(buf)  // subtly incorrect
  // if debug is false, compiler assigns a nil pointer of type *bytes.Buffer to buf which is nil
  // however, its dynamic type is *bytes.Buffer, which is a non-nil interface containing a nil pointer value
}

func f(out io.Writer) {
  if out != nil {
    out.Write([]byte("done!\n"))  // since out is not nil, passes this check and panics: nil pointer dereference
  }
}
```

### Advice

Interfaces that has only a single implementation are unnecessary abstractions and have run-time cost. Interfaces are only needed when there are two or more concrete types that must be dealt with in a uniform way. An exception to this rule is when an interface is satisfied by a single concrete type but that type cannot live in the same package as interface because of its dependencies.
