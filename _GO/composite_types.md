## Basics
Arrays and structs are aggregate types whereby their values are concatenations of other values in memory. Arrays are homogeneous (all elements have same type) while structs are heterogeneous. Both arrays and structs are fixed size as compared to slices and maps which cater for dynamic data structures.

## Arrays
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

// Range
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}
}
```

## Slices
Has 3 components: pointer, length and capacity. Pointer points to the first element of array that is reachable through slice, which is not necessarily the array's first element. Length cannot exceed capacity. Multiple slices can share the same underlying array and may refer to overlapping parts. Unlike arrays, slices cannot use == to compare with each other. Only legal comparison is to check for nil. 

Gotcha for slices is that when GO creates slices, it creates both a slice (pointer to the underlying array, length and capacity) and the underlying array. Hence, do not need to use pointers to update values inside slices. 
```
nonempty()
copy()
append()
reverse()
rotate()
```
```go
months := [...]string{1: "Jan", /*...*/, 12: "Dec"}

s[i:j]  // creates a new slice

[]byte("Hello world!")  // converts a string into a byte slice (computer friendly representation of string)

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
x = append(x, 1)  // returns a new slice and assign back to variable x
x = append(x, x...) // append slice x

for i, card := range x {
  fmt.Println(card)
}
```
```go
// slices gotcha that doesnt require pointers specifically
mySlice := []string{"hello", "world"}
updateSlice(mySlice)
fmt.Println(mySlice)	// [Bye World]

func updateSlice(s []string) {
  s[0] = "Bye"
}
```


## Maps
A reference to a hash table, an unordered collection of key/value pairs in which all keys are distinct. All keys in a given map are of the same type, and all values are of the same type. However, keys need not be of same type as values. Should not use floating-points for keys. Need to allocate the map first before can store into it.

```go
map[K]V

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

## Structs
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

### Struct Literals
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

### Comparing Structs
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

### Struct Embedding and Anonymous Fields
Allows using named struct type as an anonymous field of another struct type. Provides convenient syntactic shortcut where x.f can stand for a chain of fields like x.d.e.f.

```go
type person struct {
	firstName string
	lastName string
	contactInfo
}

type contactInfo struct {
	email string
	number int
}

jim := person{
  firstName: "Jim",
  lastName: "Tan",
  contactInfo: contactInfo{
    email: "jim@gmail.com",
    number: 1234567,
  },
}
```
```go
type Point struct {
  X, Y int
}

type Circle struct {
  Center Point
  Radius int
}

type Wheel struct {
  Circle Circle
  Spokes int
}

// accessing the fields is more verbose
var w Wheel
w.Circle.Center.X = 8
w.Circle.Radius = 5
w.Spokes = 20
```
```go
// using anonymous fields
type Circle struct {
  Point
  Radius int
}

type Wheel struct {
  Circle
  Spokes int
}

var w Wheel
w.X = 8         // equivalent to w.Circle.Point.X = 8
w.Radius = 5

// however, does not have shorthand for struct literal syntax
w = Wheel{X: 8, Y: 8, Radius: 5, Spokes: 20}  // compile error: unknown fields
```

### Structs vs Maps
| Map                                                                 | Structs                                               |
|---------------------------------------------------------------------|-------------------------------------------------------|
| All keys must be the same type and all values must be of same type  | Values can be of different type                       |
| Keys are indexed and can be iterated                                | Keys don't support indexing                           |
| Reference type                                                      | Value type and must use pointers to update values     |
| Don't need to know all keys at compile time                         | Need to know all different fields at compile time     |
| Used to represent a collection of related properties                | Used to represent an object with different properties |

## JSON
JSON objects are used to encode GO maps (with string keys) and structs. Converting a GO data structure to JSON is called marshaling. Field tag is a string of metadata associated at compile time with the field of a struct. Conventionally interpreted as space-separated list of key:"value" pairs. Names of all struct fields must be capitalized even if JSON names are not. However, matching process between JSON names and GO struct names during unmarshaling is case-insensitive i.e. use a field tag to cater for underscores.

When making API calls, need close resp.Body on all execution paths (or use 'defer' which makes it simpler).

```go
type Movie struct {
  Title   string
  Year    int     `json:"released"`   // string literals are field tags
  Color   bool    `json:"color,omitempty"`  // doesn't output field if it is empty
  Count   int     `json:"total_count"`
  url     string  `json:"html_url"`
  Actors  []string
}

var movies = []Movie{
  {
    Title: "Hello",
    Year: 1942,
    Color: false,
    Actors: []string{"john", "peter"}
  }
}

data, err := json.Marshal(movies) // use MarshalIndent() for human readability
if err != nil {
  log.Fatalf("JSON marshaling failed: %s", err)
  fmt.Printf("%s\n", data)
}

// decoding JSON with unmarshaling
var titles []struct { Title string }
if err := json.Unmarshal(data, &titles); err != nil { // unmarshal data into a slice of structs with Title field only
  log.Fatalf("JSON unmarshaling failed: %s", err)
}
fmt.Println(titles)   // "[{hello}]"
```
## Text and HTML Templates
GO offer text and HTML template packages for substituting values of variables into a text or HTML template. A template is a string of file containing one or more portions enclosed in double braces {{...}} called actions. 

```GO
const templ = `{{.TotalCount}} issues:
  {{range .Items}}      // range and end creates a loop 
  Number: {{.Number}}
  {{end}}`
```
