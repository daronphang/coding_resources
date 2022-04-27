### Init Functions

Each variable declared at package level starts life with the value of its initializer expression. However, for some variables like table values, it may not be the simplest way to set its initial value. Init function mechanism may be simpler for doing so. 

Init functions cannot be called or referenced, cannot take arguments, and doesn't return any value. They are automatically executed when the program starts, in the order in which they are declared. 

```go
var pc [256]byte

func init() {
  for i := range pc {
    pc[i] = pc[i/2] + byte(i&1)
  }
}
```
