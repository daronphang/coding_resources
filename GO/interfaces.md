### Interfaces
Interface types express generalizations or abstractions about the behaviors of other types. GO's interfaces are distinctive from other OOP langauges is that they are satisfied implicitly i.e. no need to declare all interfaces that a given concrete type satisfies but simply possessing the necessary methods is enough. Interfaces are about helping you to reuse code i.e. form a contract between different functions and types.

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

### Interface Satisfaction
Only depends on the methods of the two types involved; hence, do not need to declare the relationship between concrete type and the interface it satisfies. Nonetheless, it is useful to document and assert the relatiosnhip when it is intended. 

```go
// declaration asserts at compile time that value of type *bytes.Buffer satisfies io.Writer
var w io.Writer = new(bytes.Buffer)
var _ io.Writer = (*bytes.Buffer)(nil)  // another way without allocating a new variable
```

### Parsing Flags with flag.Value
Standard interface flag.Value helps define new notations for command-line flags.

```go
var period = flag.Duration("period", 1*time.Second, "sleep period")

func main() {
  flag.Parse()
  fmt.Printf("sleeping for %v...", *period)
  time.Sleep(period)
  fmt.Println()
}
```
```
./sleep
Sleeping for 1s...

./sleep -period 2m30s
Sleeping for 2m30s...
```
```go

// defining new flag notations for own data types
// need define a type that satisfies flag.Value interface
package flag

// Value is the interface to the value stored in a flag
type Value interface {
  String() string
  Set(string) error
}

// defining celsiusFlag type that allows temp to be specified in Celsius
// inherits String() method so need only to satisfy the Set() method
type celsiusFlag struct { Celsius }

func (f *celsiusFlag) Set(s string) error {
  var unit string
  var value float64
  fmt.Sscanf(s, "%f%s", &value, &unit)  // no error check needed as default switch will match
  switch unit {
  case "C", "oC":
    f.Celsius = Celsius(value)
    return nil
  case "F", "oF":
    f.Celsius = FToC(Fahrenheit(value))
    return nil
  }
  return fmt.Error("invalid temperature %q", s)
}
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

### Sorting with sort.Interface
In many languages, sorting algorithm is associated with sequence data type, while ordering function is associated with type of elements. GO's sort.Sort function assumes nothing about the representation of either sequence or its elements. Instead, it uses an interface, sort.Interface, to specify the contract between generic sort algorithm and each sequence type that may be sorted. Package sort provides StringSlice type and function called Strings() so the call can be simplified to sort.Strings().

```go
package sort 

// sort algo requires length of sequence, means of comparing two elements, and way to swap two elements
type Interface interface {
  Len() int
  Less(i, j int) bool   // i, j are indices of sequence elements
  Swap(i, j int)
}

// to sort any sequence, need to define a type that implements the three methods
type StringSlice []string
func(p StringSlice) Len() int { return len(p) }
func(p StringSlice) Less(i, j int) bool { return p[i] < p[j] }
func(p StringSlice) Swap(i, j int) { p[i], p[j] = p[j], p[i] }

sort.Sort(StringSlice(names))
```
```go
// more complicated sorting; better to use pointer than element directly as it will run faster
type Track struct {
  Title string
  Artist string
  Album string
  Year int
  Length time.Duration
}

var tracks = []*Track{
  {"Go", "delilah", "From the roots up", 2012, length("3m38s")}
  // ...
}

func length(s string) time.Duration{
  d, err := time.ParseDuration(s)
  if err != nil {
    panic(s)
  }
  return d
}

type byArtist []*Track

func (x byArtist) Len() int { return len(x) }
func (x byArtist) Less(i, j int) bool { return x[i].Artist < x[j].Artist }
func (x byArtist) Swap(i, j int) { x[i], x[j] = x[j], x[i] }

sort.Sort(byArtist(tracks))
// dont need to provide byReverseArtist since the sort package provides Reverse()
sort.Sort(sort.Reverse(byArtist(tracks)))
```

For multi-tier ordering function, can define customSort.
```go
type customSort struct {
  t []*Track
  less func(x, y *Track) bool   // comparison function defines a new sort order 
}

func (x customSort) Len() int { return len(x.t) }
func (x customSort) Less(i, j int) bool { return x.less(x.t[i], x.t[j]) }
func (x customSort) Swap(i, j int) { x.t[i], x.t[j] = x.t[j], x.t[i] }

sort.Sort(customSort{tracks, func(x, y *Track) bool {
  if x.Title != y.Title {
    return x.Title < y.Title
  }
  if x.Year != y.Year {
    return x.Year < y.Year
  }
  if x.Length != y.Length {
    return x.Length < y.Length
  }
  return false
}})
```

### Http.Handler Interface
```go
package http

type Handler interface {
  ServeHTTP(w ResponseWriter, r *Request)
}
func ListenAndServe(address string, h Handler) error

func main() {
  db := database{"shoes": 50, "socks": 5}
  log.Fatal(http.ListenAndServe("localhost:5000", db))
}

func (db database) ServeHTTP(w http.ResponseWriter, req *http.Request) {
  switch req.URL.Path {
  case "/list":
    for item, price := range db {
      fmt.Fprintf(w, "%s: %s\n", item, price)
    }
    case "/price":
      item := req.URL.Query().Get("item")
      price, ok := db[item]
      if !ok {
        w.WriteHeader(http.StatusNotFound) // 404
        fmt.Fprintf(w, "no such item: %q\n", item)
        return
      }
      fmt.Fprintf(w, "%s\n", price)
     default:
      w.WriteHeader(http.StatusNotFound) // 404
      fmt.Fprintf(w, "no such page: %s\n", req.URL)
      // or can use httpError utility function
      http.Error(w, msg, http.StatusNotFound) // 404
  }
}
```
```
./fetch http://localhost:8000/list
shoes: $50.00
socks: $5.00
./ fetch http://localhost:8000/price?item=hat
no such item: "hat"
```

The http package provides ServeMux, a request multiplexer, to simplify the association between URLs and handlers i.e. ServeMux aggregates a collection of http.Handlers into a single http.Handler. GO does not have canonical web framework analogous to Ruby's Rails or Python's Django; building blocks in GO's standard library are flexible enough that frameworks are not necessary. 

```go
func main() {
  db := database{"shoes": 50, "socks": 5}
  mux := http.NewServeMux()
  mux.Handle("/list", http.HandlerFunc(db.list))      // db.list does not have any methods 
  mux.Handle("/price", http.HandlerFunc(db.price))    // does not satisfy http.Handler interface alone and cant be passed directly 
  log.Fatal(http.ListenAndServe("localhost:5000", mux))
}

type database map[string]dollars
func (db database) list(w http.ResponseWriter, req *http.Request) {
  for item, price := range db {
    fmt.Fprintf(w, "%s: %s\n", item, price)
  }
}

func (db database) price(w http.ResponseWriter, req *http.Request) {
  item := req.URL.Query().Get("item")
  price, ok := db[item]
  if !ok {
    w.WriteHeader(http.StatusNotFound) // 404
    fmt.Fprintf(w, "no such item: %q\n", item)
    return
  }
  fmt.Fprintf(w, "%s\n", price)
}

// an adapter that lets a function value satisfy an interface
type HandlerFunc func(w ResponseWriter, r *Request)
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
  // adapter adds ServeHTTP to db.list/price function to satisfy http.Handler interface
  // behavior of ServeHTTP is to call the underlying db.list or db.price function
  f(w, r)
}
```

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

errors.New('hello world') // returns a new error
fmt.Println(errors.New("EOF") == errors.New("EOF"))   // false
``` 
``` go
package fmt
import errors

// more convenient wrapper function fmt.Errorf rather than calling errors.New
func Errorf(format string, args ...interface{}) error {
  return errors.New(Sprintf(format, args...))
}
``` 

### Type Assertions
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

### Type Switches
```go
import "database/sql"

func listTracks(db sql.DB, artist string, minYear, maxYear int) {
  result, err := db.Exec(
    "SELECT * FROM tracks WHERE artist = ? AND ? <= year AND year ?",
    artist, minYear, maxYear
  )
  // ...
}

// within Exec
func sqlQuote(x interface{}) string {
  if x == nil {
    return "NULL"
  } else if _, ok := x.(int); ok {
    return fmt.Sprintf("%d", x)
  } else if _, ok := x.(uint); ok {
    return fmt.Sprintf("%d", x)
  } else if b, ok := x.(bool); ok {
    if b {
      return "TRUE"
    }
    return "FALSE"
  } else if s, ok := x.(string); ok {
    return sqlQuoteString(s)
  } else {
    panic(fmt.Sprintf("unexpected type %T: %v", x, x))
  }
}

// type switch
func sqlQuote(x interface{}) string {
  // each case implicitly creates a separate lexical block
  // x.(type) is type switch
  switch x := x.(type) {
  case nil:
    return "NULL"
  case int, uint:
    return fmt.Sprintf("%d", x)
  case bool:
    if x {
      return "TRUE"
    }
    return "FALSE"
  }
  case string:
    return sqlQuoteString(x)
  default:
    panic(fmt.Sprintf("unexpected type %T: %v", x, x))
}
```

### Advice
Interfaces that has only a single implementation are unnecessary abstractions and have run-time cost. Interfaces are only needed when there are two or more concrete types that must be dealt with in a uniform way. An exception to this rule is when an interface is satisfied by a single concrete type but that type cannot live in the same package as interface because of its dependencies.
