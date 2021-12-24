## Bufio
Package to help with buffered I/O, technique to optimize read or write operations. For writes, it is done by temporary storing data in buffer (until certain size is reached) before transmitting it further (like disk or socket). As a result, less write actions are triggered which is ultimately a syscall and if doing frequently is expensive and can burden on CPU. Unbuffered I/O simply means each write operation goes straight to destination.

### Bufio.Writer
```
producer -> buffer -> io.Writer
a -> a
b -> ab
a -> abc 
a -> abcd
e -> e -> abcd    // bufio.Writer sends data only when buffer is full or explicitly requested with Flush()
f -> ef -> abcd
```

### Bufio.Reader
Allows to read in bigger batches from underlying io.Reader. 

### Bufio.Scanner
Helps to process stream of data by splitting it into tokens and removing space between them. If dealing with data in memory like string or slice of bytes, can use bytes.Split() or strings.Split().

```go
package main

import (
  "bufio"
  "fmt"
  "strings"
)

func main() {
  input := "foo   bar       baaz"
  scanner := bufio.NewScanner(strings.NewReader(input))
  scanner.Split(bufio.ScanWords)
  for scanner.Scan() {
    fmt.Println(scanner.Text())
  }
} 
// foo
// bar
// baaz
```
