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

### Looping Strings (Decoding UTF-8)

In Golang, string literal is represented as a sequence of bytes. If iterating through string, using len(str) is not accurate as it prints the number of bytes.

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
