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
