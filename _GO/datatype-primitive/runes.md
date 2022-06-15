## Runes

A rune is an alias to the int32 data type and represents a Unicode point. A unicode point is a numerical value that is usually used to represent a Unicode character. The int32 is large enough to represent the current volume of 140,000 unicode characters.

```go
import (
    "fmt"
    "reflect"
)

func main() {
    // Creating a rune
    rune1 := 'B'
    rune2 := 'g'
    rune3 := '\a'

    // Displaying rune and its type
    fmt.Printf("Rune 1: %c; Unicode: %U; Type: %s", rune1, rune1, reflect.TypeOf(rune1))
    // Rune 1: B; Unicode: U+0042; Type: int32

    fmt.Printf("\nRune 2: %c; Unicode: %U; Type: %s", rune2, rune2, reflect.TypeOf(rune2))
    // Rune 2: g; Unicode: U+0067; Type: int32

    fmt.Printf("\nRune 3: Unicode: %U; Type: %s", rune3, reflect.TypeOf(rune3))
    // Rune 3: Unicode: U+0007; Type: int32
}
```
