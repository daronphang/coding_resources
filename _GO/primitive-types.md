## Integers

GO provides both signed and unsigned integer arithmetic.

```
int8 int16 int32 int64
uint8 uint16 uint32 uint64

RANGE OF VALUES
signed integers     -2^(n-1) to 2^(n-1)-1     int8 has -128 to 127
unsigned integers   0 to 2^n -1               int8 has 0 255, uses full range of bits for non-negative values
```

## Binary Operators

```
&     bitwise AND
|     bitwise OR
^     bitwise XOR
&^    bit clear (AND NOT)
<<    Left shift, number of bit positions
>>    Right shift
```

```GO
var apples int32 = 1
var oranges int16 = 2
var compote int = apples + oranges // compile error

var compote = int(apples) + int(oranges)
```

## Floating-Point Numbers

GO provides float32 and float64.

```
float32   math.MaxFloat32 = 3.4e38    6 decimals
float64   math.MaxFloat64 = 1.8e308   15 decimals   Preferred usage
```

```GO
for x := 0; x < 8; x++ {
  fmt.Printf("x = %d e A = %8.3f\n", x, math.Exp(float64(x)))
}

// x = 0 e^x = 1.000
// x = 7 e^x = 1096.633
```

## Strings

Immutable sequence of bytes. Index operation retrieves the i-th byte of string which may not necessarily be the i-th character of string as UTF-8 encoding of a non-ASCII code requires two or more bytes.

```GO
s := "hello, world"
fmt.Println(len(s))     // "12"
fmt.Println(s[0], s[7]) // "104 119"  ('h' and 'w')
fmt.Println(s[0:5])   // "hello", yields a new string
```

Within a double-quoted string literal, escape sequences that begin with \ can be used to insert arbitrary byte values into the string.

```
\a    alert or bell
\b    backspace
\f    form feed
\n    newline
\r    carriage return
\t    tab
\v    vertical tab
\'    single quote (only in rune literal '\'')
\"    double quote (only within "" literals)
\\    backslash
```

### Runes

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

### Looping Strings (Decoding UTF-8)

In Golang, string literal is represented as a sequence of bytes. If iterating through string, using len(str) isnot accurate as it prints the number of bytes.

A string may contain Unicode text encoded in UTF-8; nonetheless, Go source code encodes all strings as UTF-8.

Best is to convert string to rune array. Each rune in array corresponds to an Unicode character.

```go
sample := "a£c"
fmt.Printf("Length is %d\n", len(sample)) // 4 bytes so returns 4, not 3

func loopString () {
  sample := "hello world!!!"
  runeSample := []rune(sample)

  for i:=0; i < len(runeSample); i++ {
    fmt.Println(string(runeSample[i]))
  }
}
```

```go
import "unicode/utf8"

s := "Hello, 世界"
fmt.Println(len(s)) // "13" as string contains 13 bytes
fmt.Println(utf8.RuneCountInString(s))  // "9" if interpreted as UTF-8, encodes 9 points/runes

for i := 0; i < len(s); {
  r, size := utf8.DecodeRuneInString(s[i:])   // can use Go's range loop which performs UTF-8 decoding implicitly
  fmt.Printf("%d\t%c\n", i, r)
  i+= size
}

for i, r := range "Hello, 世界" {
  fmt.Printf("%d\t%c\n", i, r, r)
}
```

### Strings and Byte Slices

```go
// basename function removes prefix with components separated by /, and suffix that looks like file type
fmt.Println(basename("a/b/c.go")) // "c"
fmt.Println(basename("c.d.go"))   // "c.d"
```

### String and Byte Functions

```go
func Contains(s, substr string) bool
func Count(s, sep string) int
func Fields(s string) []string
func HasPrefix(s, prefix string) bool
func Index(s, sep string) int
func Join(a []string, sep string) string
```

### Strings and Numbers Conversion

```go
x := 123

// can use either functions to convert integer to string
y := fmt.Sprintf("%d", x)
fmt.Println(y, strconv.Itoa(x)) // "123 123", itoa refers to integer to ASCII

// format to change to different base
fmt.Println(strconv.FormatInt(int64(x), 2)) // "1111011"

// convert string to integer
x, err := strconv.Atoi("123")
y, err := strconv.ParseInt("123", 10, 64) // base 10, up to 64 bits
```

### Substrings

```go
w := "hello world!"
strings.Contains(w, "hello")
```

## Constants

Can declare a sequence of constants as a group. Can also use constant generator iota which is used to create a sequence of related values. Value of iota begins at 0 and increments by 1 for each item in sequence i.e. enumerator.

```go
const (
  a = 1
  b
  c = 2
  d
)

fmt.Println(a, b, c, d)   // 1 1 2 2

// iota generator
type Weekday int
const (
  Sunday Weekday = iota // 0
  Monday                // 1
  Tuesday               // 2
)
```
