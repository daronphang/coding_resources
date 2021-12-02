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
