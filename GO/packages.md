## Bufio
Package to help with buffered I/O, technique to optimize read or write operations. For writes, it is done by temporary storing data in buffer (until certain size is reached) before transmitting it further (like disk or socket). As a result, less write actions are triggered which is ultimately a syscall and if doing frequently is expensive and can burden on CPU. Unbuffered I/O simply means each write operation goes straight to destination.

https://medium.com/golangspec/introduction-to-bufio-package-in-golang-ad7d1877f762

### Bufio.Writer
Three situations that may be encountered:
1. Buffer is full: Writes operation takes place.
2. Buffer has space after a write: Will not attempt to complete that write unless specified by Flush().
3. Write larger than buffer capacity is made: Buffer is skipped.

```
producer -> buffer -> io.Writer
a -> a
b -> ab
a -> abc 
a -> abcd
e -> e -> abcd    // bufio.Writer sends data only when buffer is full or explicitly requested with Flush()
f -> ef -> abcd
```

#### Methods
```
Reset()
Available()
```
```go
writerOne := new(Writer)
bw := bufio.NewWriterSize(writerOne, 2)
writerTwo := new(Writer)
bw.Reset(writerTwo)
```

### Bufio.Reader
Allows to read in bigger batches from underlying io.Reader. 

```go
Peek()          // Allows to see first n bytes in buffer without consuming them 
ReadSlice()     // Returns a slice of string including delimiter
ReadLine()      // Removes new-line characters (\n) and does not handle lines longer than internal buffer
ReadByte()      // Works over ReadSlice() and acts as underlying low-level function
Scanner()       // Breaks stream of data by splitting it into tokens
```


#### Bufio.Scanner
Helps to process stream of data by splitting it into tokens and removing space between them. If dealing with data in memory like string or slice of bytes, can use bytes.Split() or strings.Split(). Stops at EOF, at first IO error, or if a token is too large to fit into the buffer.

https://medium.com/golangspec/in-depth-introduction-to-bufio-scanner-in-golang-55483bb689b4

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
