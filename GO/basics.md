### Golang
A compiled language. Organized into packages (similar to libraries/modules). Has a cultural agenda of radical simplicity with garbage collection, pacakge system, first-class functions (treated like any other variable), lexical scope, system call interface and immutable strings encoded in UTF-8 (can process in all languages). Language is mature, stable and guarantees backwards compatibiity. Well suited for building infrastructure like netwroked servers, tools and systems for programmers. 

```GO
package main

import "fmt"

func main() {
  fmt.Println("Hello,
}
```

### Garbage Collector
GO's garbage collector recycles unused memory but DO NOT assume it will release unused operating system resources like open files and network connections. **They should be closed explicitly**.

### Print Functions
```go
fmt.Sprinf()      // formats and stores a series of characters and values in array pointed to by buffer
fmt.Errorf()
fmt.Fprintf()
fmt.Fscanf()
fmt.Printf()      // formats and writes output to stdout
fmt.Scanf()
fmt.Sscanf()
log.Printf()

myString := "Results: " + results + " and more stuff: " + more
myString := fmt.Sprinf("Results: %s and more stuff: %s", results, more)
```
```
%v    value in default format
%#v   Go-syntax representation of value
%T    type of value
%%    literal % sign; consumes no value

%b    base 2
%c    character represented by corresponding Unicode code point
%d    base 10
%o    base 8

%s    unintepreted bytes of string or slice
%q    double-quoted string safely escaped with Go syntax
%x    base 16, lower-case, two characters per byte
%X    base 16, upper-case, two characters per byte   
```


### Command Line Arguments
OS package provides functions and other values for dealing with OS; command-line arguments are available to a program in a variable named Args which is a slice of strings. 

```GO
// ECHO program in linux
package main
import (
  "fmt"
  "os"
)

func main() {
  var s, sep string     // explicit var declaration s and sep of type string 
  
  // := is a short variable declaraton, i++ is increment statement of 1
  for i := 1; i < len(os.Args); i++ {
    s += sep + os.Args[i]   // string concatenation
    sep = " "
  }
  fmt.Println(s)
}

// ECHO program printing command-line args
func main() {
  s, sep := "", ""
  
  // range produces index (not needed) and element value pair, but requires to deal with both values
  // GO does not permit unused local variables; solution is to use blank identifier 
  for _, arg := range os.Args[1:] {   
    s += sep + arg
    sep = " "
  }
  fmt.Println(s)    // alternative is fmt.Println(strings.Join(os.Args[1:], " "))
}
```

### Loop Statements
For loop is only loop statement in GO. 
```GO
// traditional "while" loop
for initialization; condition; post {
}

// traditional infinite loop
for {
  // break or return to terminate loop
}
```
```GO
// program prints duplicate lines
package main

import (
  "bufio"
  "fmt"
  "os"
)

func main() {
  counts := make(map[string]int)    // map holds a set of key/value pairs, of type string/int 
  input := bufio.NewScanner(os.Stdin)
  for input.Scan() {
    line := input.Text()
    counts[line] = counts[line] + 1   // shortcut is counts[input.Text()]++  
  }
  // NOTE: ignoring potential errors from input.Err()
  for line, n := range counts {
    if n > 1 {
      fmt.Printf("%d\t%s\n", n, line) // decimal integer, \tab, string, \newline
    }
  }
}

```



### Variable Declarations
All are equivalent.
```GO
s := ""
var s string
var s = ""
var s string = ""
```


