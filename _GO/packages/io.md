### Reader

A reader is any type that implements Read() method. Go standard library contains many implementations of this interface, including files, network connections, compressors, ciphers, etc.

```go
type Reader interface {
  Read
}

func (T) Read(b []byte) (n int, err error)    // returns number of bytes populated; when byte stream ends, returns io.EOF
```
