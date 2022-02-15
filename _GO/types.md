### Type Assertions

Type assertions are used to assert that a variable is of some type, and can only take place on interfaces. If variable to be asserted is nil, will panic.

```go
type Data struct {
  value string
}

var data interface{}
typedData := data.(string)
typedData := data.(int)
if typedData, ok := data.(Data); !ok {
  // if type asserted is wrong, will end up here
}

// assertion
```
