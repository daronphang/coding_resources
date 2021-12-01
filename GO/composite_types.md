## Basics:
Arrays and structs are aggregate types whereby their values are concatenations of other values in memory. Arrays are homogeneous (all elements have same type) while structs are heterogeneous. Both arrays and structs are fixed size as compared to slices and maps which cater for dynamic data structures.

## Arrays:
Rarely used directly in Go as they have fixed length; instead, slices are used which can grow and shrink.

```go
// if ellipsis is used, array length is determined by number of initializers
q := [...]int{1, 2, 3}

// element type is comparable
a := [2]int{1, 2}
b := [...]int{1, 2}

fmt.Println(a == b)   // true

c1 := sha256.Sum256([]byte("x"))
c2 := sha256.Sum256([]byte("X"))
fmt.Printf("%x\n%x\n%t\n%T\n", c1, c2, c1 == c2, c1)  // 2145,2312, false, [32]uint8
```

## Slices:
Has 3 components: pointer, length and capacity. Pointer points toe the first element of array that is reachable through slice, which is not necessarily the array's first element. Length cannot exceed capacity. Multiple slices can share the same underlying array and may refer to overlapping parts. Unlike arrays, slices cannot use == to compare with each other. Only legal comparison is to check for nil.
```
nonempty
copy
append
reverse
rotate
```
```go
months := [...]string{1: "Jan", /*...*/, 12: "Dec"}
s[i:j]  // creates a new slice

// to rotate elements, apply reverse func multiple times
s := []int{0, 1, 2, 3, 4, 5}
reverse(s[:2])  // [1 0 2 3 4 5]
reverse(s[2:])  // [1 0 5 4 3 2]
reverse(s)
fmt.Println(s)  // [2 3 4 5 0 1]

// use len(s) to check for empty slice
var s []int   // len(s) == 0, s == nil
s = []int{}   // len(s) == 0, s != nil
```
```go
// append
var x []int
x = append(x, 1)
x = append(x, x...) // append slice x, 
```

## Maps:
A reference to a hash table, an unordered collection of key/value pairs in which all keys are distinct. All keys in a given map are of the same type, and all values are of the same type. However, keys need not be of same type as values. Should not use floating-points for keys. Need to allocate the map first before can store into it.

```go
map[K]V

ages := map[string]int{
  "alice": 31,
  "charlie": 34,
}

ages := make(map[string]int)  // mapping from strings to ints
ages["alice"] = 31

delete(ages, "alice")

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

### Equivalent of Sets:
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

## Structs:
An aggregate data type that groups together zero or more named values of arbitrary types as a single entity. Each value is called a field. Field order is significant to type identity.

```go
type Employee struct {
  ID            int
  Name, Address string
  DoB           time.Time
  Position      string
  Salary        int
  ManagerID     int
}
var dilbert Employee  // dilbert is an instance of Employee
dilbert.Name = 'John'
position := &dilbert.Position // taking address and accessing it through pointer
*position = "Senior"

var employeeOfMonth *Employee = &dilbert  // pointer to a struct
employeeOfMonth.Position += "proactive team player"
// same as (*employeeOfMonth).Position += "proactive team player"
```

Named struct of type S cannot declare field of same type S i.e. an aggregate value cannot contain itself. However, it can declare a field of pointer type *S* and hence, allows to create recursive data structures like linked lists and trees.

```go
type tree struct {
  value       int
  left, right *tree
}

func appendValues(values []int, t *tree) []int {
  if t != nil {
    values = appendValues(values, t.left)
    values = append(values, t.value)
    values = appendValues)values, t.right)
  }
  return values
}
```

Struct type with no fields is called empty struct{} with size zero and carries no information. Can be used instead of bool as the value type of a map that represents a set, to emphasize that only the keys are significant. However, syntax is more cumbersome.

```go
seen := make(map[string]struct{})
if _, ok := seen[s]; !ok {
  seen[s] = struct{}{}
  // perform logic for first time seeing s
}
```

### Struct Literals:
```go
type Point struct{X, Y int}
// first form
P := Point{1, 2} // However, order is critical and makes code fragile should set of fields grow/reorder

// second form; both cannot be mixed in the same literal
P := Point{a: 1, b: 2} // if field is omitted, it is set to zero and order doesn't matter as names are provided

// struct values can be passed as arg and returned from functions directly/indirectly
func Bonus(e *Employee, percent int) int {
  return e.Salary * percent / 100
}

// Need use pointer as function receives a copy of arg, not reference to original arg
func AnnualRaise(e *Employee) {
  e.Salary = e.Salary * 105/100
}

// structs are commonly dealt with through pointers; shorthand notation
pp := new(Point)
*pp = Point{1, 2} // Can be shorted to pp := &Point{1, 2}
```

### Comparing Structs:
```go
type Point struct {X, Y int}
p := Point{1, 2}
q := Point{2, 1}
fmt.Println(p.X == q.X && p.Y == q.Y} // false
```

Can be used as key type of a map.
```go
type address struct {
  hostname  string
  port      int
}

hits := make(map[address]int)
hits[address{"golang.org", 443}]++
```
