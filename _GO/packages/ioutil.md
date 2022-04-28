### ReadAll

Useful utility function for reading all data from an io.Reader until EOF. It's often used to read data such as HTTP response body, files, and other data sources which implement io.Reader interface. 

Nonetheless, need to be careful when using this as reading big files means loading everything into memory, and gets worse when the file is requested by multiple users in parallel i.e. ending up with multiple copies of file in memory.

Better version would be to use io.Copy to copy from file which implements io.Reader interface to w ResponseWriter implementing io.Writer interface. io.Copy uses fixed 32KB buffer to copy from reader to writer until EOF and hence, will always just use 32KB to copy it to destination. 

```go
// may crash due to insufficient memory if file is too big
func handle(r *http.Request, w http.ResponseWriter) {
	file, err := os.Open("my_file.zip")
	// error checks...
	b, err := ioutil.ReadAll(file)
	// error checks
	fmt.FPrintf(w, b)
}

// better version 
func handle(r *http.Request, w http.ResponseWriter) {
	file, err := os.Open("my_file.zip")
	// error checks...
	io.Copy(w, file)
}
```

### WriteFile

```go
func WriteFile(filename string, data []bytes permission os.FileMode) error  // bytes slice is a computer friendly rep. of a string
```
