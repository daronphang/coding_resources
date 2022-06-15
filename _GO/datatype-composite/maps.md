## Maps

A reference to a hash table, an unordered collection of key/value pairs in which all keys are distinct. All keys in a given map are of the same type, and all values are of the same type. However, keys need not be of same type as values. Should not use floating-points for keys. Need to allocate the map first before can store into it.

```go
map[K]V

// initializing map with values
ages := map[string]int{
  "alice": 31,
  "charlie": 34,
}

ages := make(map[string]int)  // mapping from strings to ints
ages["alice"] = 31 // can only use square bracket syntax to access value, not dot notation

delete(ages, "alice")
```

```go
// enumerate all key/value pairs
for name, age := range ages {
  fmt.Printf("%s\t%d\n", name, age)
}

// enumerate in order
import "sort"

names := make([]string, 0, len(ages)) // more efficient to allocate an array of required size upfront
for name:= range ages {
  names = append(names, name)
}
sort.Strings(names)
for _, name := range names {
  fmt.Printf("%s\t%d\n", name, ages[name])
}

// Subscripting a map yields the value itself and a boolean that reports whether element was present
if age, ok := ages["bob"]; !ok {/* "bob" is not a key in this map /*}   // subscripting a map yields two values; second is a boolean
```

### Equivalent of Sets

GO does not provide set type; however, since keys of a map are distinct, a map can serve this purpose.

```go
func main() {
  seen: = make(map[string]bool)
  input := bufio.NewScanner(os.Stdin)
  for input.Scan() {
    line := input.Text()
    if !seen[line] {
      seen[line] = true
      fmt.Println(line)
    }
  }

  if err := input.Err(); err != nil {
    fmt.Fprintf(os.Stderr, "dedup: %v\n", err)
    os.Exit(1)
  }
}
```
