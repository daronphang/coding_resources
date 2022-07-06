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
