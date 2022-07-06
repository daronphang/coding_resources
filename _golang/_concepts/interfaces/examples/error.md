### Error Interface

```go
type error interface {
  Error() string  // error interface has 1 method that returns string
}

// error package
package errors

type errorString struct { text string }  // struct to protect its representation from inadvertent updates
func New(text string) error { return &errorString{text} }

// pointer satisfies error interface and ensure every call to New allocates a distinct error
func(e *errorString) Error() string { return e.text }

errors.New("hello world") // returns a new error
fmt.Println(errors.New("EOF") == errors.New("EOF"))   // false
```

```go
package fmt
import errors

// more convenient wrapper function fmt.Errorf rather than calling errors.New
func Errorf(format string, args ...interface{}) error {
  return errors.New(Sprintf(format, args...))
}
```
