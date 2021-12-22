### Interfaces
Interface types express generalizations or abstractions about the behaviors of other types. GO's interfaces are distinctive from other OOP langauges is that they are satisfied implicitly i.e. no need to declare all interfaces that a given concrete type satisfies but simply possessing the necessary methods is enough.

### Concrete Interface
Concrete type specifies the exact representation of its values and exposes the intrinsic operations of that representation i.e. arithmetic for numbers, indexing/append/range for slices.

### Contracts Interface
Abstract interface that reveals only some of the methods. 
```go
package fmt

// abstract interface {}
var any interface()
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
```

