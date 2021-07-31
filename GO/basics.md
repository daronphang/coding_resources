## GO Project:
A compiled language. Organized into packages (similar to libraries/modules). Has a cultural agenda of radical simplicity with garbage collection, pacakge system, first-class functions (treated like any other variable), lexical scope, system call interface and immutable strings encoded in UTF-8 (can process in all languages). Language is mature, stable and guarantees backwards compatibiity.  

```GO
package main

import "fmt"

func main() {
  fmt.Println("Hello,
}
```

### Command Line Arguments:
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

### Loop Statements:
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



### Variable Declarations:
All are equivalent.
```GO
s := ""
var s string
var s = ""
var s string = ""
```


