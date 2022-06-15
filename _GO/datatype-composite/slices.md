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
