## Names:
Keywords that cannot be used as names.
```
break       case      chan      const         continue
default     defer     else      fallthrough   for
func        go        goto      if            import
interface   map       package   range         return
27          select    struct    switch        type
```

Constants, types and functions.
```
// CONSTANTS
true false iota nil

// TYPES
int int8 int16 int32 int64
uint uint8 uint16 uint32 uint64 uintptr
float32 float64 complex128 complex64
bool byte rune string error

// FUNCTIONS 
make len cap new append copy close delete
complex real ima
```

## Declarations:
```
var   const   type    func
```
```GO
func main() {
  const freezingF, boilingF = 32.0, 212.0
  fmt.Printf("%g°F = %g°C\n", freezingF, fToC(freezingF)) // "32°F = 0°C"
}

func fToC(f float64) float64 {
  return (f - 32) * 5 / 9
}
```

## Variables:
Either type or =expression may be omitted, but not both. If expression is omitted, initial value is 0/false/nil/"".
```GO
var name type = expression
var i, j, k int   // int, int, int
var b, f, s = true, 2.3, "four"   // bool, float64, string
```
