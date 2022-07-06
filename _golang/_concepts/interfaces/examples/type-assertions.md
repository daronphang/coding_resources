## Type Assertions

An operation applied to an interface value.

```go
// x.(T) where x is an expression of interface type and T is the asserted type (concrete/dynamic)

var w io.Writer
w = os.Stdout
f := w.(*os.File)   // success: f == os.Stdout
c := w.(*bytes.Buffer)  // panic: interface holds *os.File, not *bytes.Buffer

// rw exposes both Read() and Write() while w exposes Write() only
rw := w.(io.ReadWriter) // success: *os.File has both read and write

// test interface type
var w io.Writer = os.Stdout
f, ok := w.(*os.File)       // success: ok, f == os.Stdout
b, ok := w.(*bytes.Buffer)  // failure: !ok, b == nil

if f, ok := w.(*os.File); ok {
  // use f...
}
```

### Discriminating Errors with Type Assertions

For I/O operations, more reliable approach for error handling is to represent structured error values with type.

```go
package os

// struct preserves underlying components of the error
// clients can distinguish one kind of failure from another using type assertion to detect specific type of error
type PathError struct {
  Op string
  Path string
  Err error
}
func (e *PathError) Error() string {
  return e.Op + " " + e.Path + ": " + e.Err.Error()
}

_, err := os.Open("/no/such/file")
fmt.Prntln(err) // "open /no/such/file: No such file or directory"
fmt.Printf("%#v\n", err)
// Output:
// &os.PathError{Op:"Open, Path:"/no/such/file", Err: 0x2}
```

```go
package os
import (
  "errors"
  "syscall"
)

// provides 3 helper functions
func IsExist(err error) bool
func IsNotExist(err error) bool
func IsPermission(err error) bool

// naive error implementation!
func IsNotExist(err error) bool {
  return strings.Contains(err.Error(), "file does not exist")
}

// using PathError
var ErrNotExist = errors.New("file does not exist")
func IsNotExist(err error) bool {
  if pe, ok := err.(*PathError); ok {   // type assertion
    err = pe.Err
  }
  return err == syscall.ENOENT || err == ErrNotExist
}

_, err := os.Open("/no/such/file")
fmt.Println(os.IsNotExist(err))   // true
```

### Checking Behaviors with Interface Type Assertions

Can use type assertion to test whether a dynamic type has a method by defining a new interface.

```go
// example of writing HTTP headers to response with io.Writer
// Write() requires byte slice but output value is a string and hence, requires []byte(...) conversion
// this conversion allocates memory and makes a copy but thrown away after

// writeString writes s to w
// if w has WriteString(), it is invoked instead of w.Write
func writeString(w io.Writer, s string) (n int, err error) {
  type stringWriter interface {
    WriteString(string) (n int, err error)
  }
  if sw, ok := w.(stringWriter); ok {
    return sw.WriteString(s)  // avoid a copy
  }
  return w.Write([]byte(s)) // allocate temporary copy
}

func writeHeader(w io.Writer, contentType string) error {
  if _, err := writeString(w, " Content-Type: "); err != nil {
    return err
  }
  if _, err := writeString(w, contentType); err != nil {
    // some code here
  }
}

// standard library provides io.WriteString as recommended way to write string to io.Writer
```
