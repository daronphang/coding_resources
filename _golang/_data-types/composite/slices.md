## Slices

Slices represent variable-length sequences whose elements all have the same type. Array and slices are intimately connected. A slice is a lightweight data structure that gives access to a subsequence of the elements of an array.

A slice has 3 components: pointer, length and capacity. Pointer points to the first element of array that is reachable through slice, which is not necessarily the array's first element. Length cannot exceed capacity.

Multiple slices can share the same underlying array and may refer to overlapping parts. Unlike arrays, slices cannot use == to compare with each other. Only legal comparison is to check for nil.

Gotcha for slices is that when GO creates slices, it creates both a slice (pointer to the underlying array, length and capacity) and the underlying array. Hence, do not need to use pointers to update values inside slices.

```
nonempty()
copy()
append()
reverse()
rotate()
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

## Slice Techniques

### Rotate/Reverse

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

### Stack

```go
stack = append(stack, v)
top := stack[len(stack)-1]  // top of stack
stack = stack[:len(stack)-1] // pop

// removing elements in middle of a slice
// preserving order
func remove(slice []int, i int) []int {
  copy(slice[i:], slice[i+1:])
  return slice[:len(slice)-1]
}

// order is not preserved
func remove(slice []int, i int) []int {
  slice[i] = slice[len(slice)-1]
  return slice[:len(slice)-1]
}

func main() {
  s := []int{5, 6, 7, 8, 9}
  fmt.Println(remove(s, 2)) // "[5 6 8 9]"
}
```
