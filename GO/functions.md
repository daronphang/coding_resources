### Function Declarations
Functions that has result list MUST end with a return statement unless execution ends with infinite loop. 
```
func name(parameter-list) (result-list) {
  body
}

```
```GO
func hypot(x, y float64) float64 {
  return math.Sqrt(x*x + y*y)
}
fmt.Println(hypot(3,4)) // 5
```

### Recursive
Recursive functions will call themselves, either directly or indirectly. 
```go
func fact(n int) int {
  if n == 0 {
      return 1
  }
  return n * fact(n-1)
}
```

### Multiple Return Values
```go
func findLinks(url string) ([]string, error) {
  resp, err := http.Get(url)
  if err != nil {
    return nil, err
  }
  if resp.StatusCode != http.StatusOK {
    resp.Body.Close()
    return nil, fmt.Errorf("Getting %s: %s", url, resp.Status)
  }
  doc, err := html.Parse(resp.Body)
  resp.Body.Close()   // Need close to ensure network resources are properly released 
  if err != nil {
    return nil, fmt.Errorf("parsing %s as HTML: %v", url, err)
  }
  return visit(nil, doc), nil
}
```

### Errors and Error Handling
Function for which failure is an expected behavior returns an additional result, conventionally the last one. If the failure has only one possible cause, the result is a boolean. GO's approach for error handling is different from many other languages; GO programs use ordinary control-flow mechanisms like if and return to respond to errors instead of exceptions consisting of stack trace and information that lack intelligible context about what went wrong. Hence, more attention needs to be paid for error-handling in GO.
```go
value, ok := cache.Lookup(key)
if !ok {
  // return nil, err                                              propagating error
  // return nil, fmt.Error("parsing %s as HTML: %v", url, err)    return error msg
}
```
```go
// retrying failed operation with delay or limit on number of attempts
func WaitForServer(url string) error {
  const timeout = 1 * time.Minute
  deadline := time.Now().Add(timeout)
  for tries := ; time.Now().Before(deadline); tries ++ {
    _, err := http.Head(url)
    if err == nil {
      return nil // success
    }
    log.Printf("server not responding (%s); retrying...", err)
    time.Sleep(time.Second << uint(tries)) // expontential backoff
  }
  return fmt.Errorf("server %s failed to respond after %s", url, timeout)
}
```
