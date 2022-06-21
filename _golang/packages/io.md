### Reader

A reader is any type that implements Read() method. Go standard library contains many implementations of this interface, including files, network connections, compressors, ciphers, etc. Interface is intended to let programmers implement code that reads data from an arbitrary source and transfers it into the provided slice of bytes. 

```go
type Reader interface {
  Read
}

func (T) Read(b []byte) (n int, err error)    // returns number of bytes populated; when byte stream ends, returns io.EOF

// reading files
var r io.Reader
var err error
r, err = os.Open("file.txt")

// reader from normal string
var r io.Reader
r = strings.NewReader("Read will return these bytes")

// http requests
var r io.Reader
r = request.Body

// bytes buffer
var r io.Reader
var buf bytes.Buffer
r = &buf
```

```go
// using readers

b, err := ioutil.ReadAll(r)

// reads all bytes and write to an io.Writer
n, err:= io.Copy(w,r)

// json decoder 
err := json.NewDecoder(r).Decode(v)
```
