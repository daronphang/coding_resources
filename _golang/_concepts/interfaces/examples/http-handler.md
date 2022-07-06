### Http.Handler Interface

```go
package http

type Handler interface {
  ServeHTTP(w ResponseWriter, r *Request)
}
func ListenAndServe(address string, h Handler) error

func main() {
  db := database{"shoes": 50, "socks": 5}
  log.Fatal(http.ListenAndServe("localhost:5000", db))
}

func (db database) ServeHTTP(w http.ResponseWriter, req *http.Request) {
  switch req.URL.Path {
  case "/list":
    for item, price := range db {
      fmt.Fprintf(w, "%s: %s\n", item, price)
    }
    case "/price":
      item := req.URL.Query().Get("item")
      price, ok := db[item]
      if !ok {
        w.WriteHeader(http.StatusNotFound) // 404
        fmt.Fprintf(w, "no such item: %q\n", item)
        return
      }
      fmt.Fprintf(w, "%s\n", price)
     default:
      w.WriteHeader(http.StatusNotFound) // 404
      fmt.Fprintf(w, "no such page: %s\n", req.URL)
      // or can use httpError utility function
      http.Error(w, msg, http.StatusNotFound) // 404
  }
}
```

```
./fetch http://localhost:8000/list
shoes: $50.00
socks: $5.00
./ fetch http://localhost:8000/price?item=hat
no such item: "hat"
```

The http package provides ServeMux, a request multiplexer, to simplify the association between URLs and handlers i.e. ServeMux aggregates a collection of http.Handlers into a single http.Handler. GO does not have canonical web framework analogous to Ruby's Rails or Python's Django; building blocks in GO's standard library are flexible enough that frameworks are not necessary.

```go
func main() {
  db := database{"shoes": 50, "socks": 5}
  mux := http.NewServeMux()
  mux.Handle("/list", http.HandlerFunc(db.list))      // db.list does not have any methods
  mux.Handle("/price", http.HandlerFunc(db.price))    // does not satisfy http.Handler interface alone and cant be passed directly
  log.Fatal(http.ListenAndServe("localhost:5000", mux))
}

type database map[string]dollars
func (db database) list(w http.ResponseWriter, req *http.Request) {
  for item, price := range db {
    fmt.Fprintf(w, "%s: %s\n", item, price)
  }
}

func (db database) price(w http.ResponseWriter, req *http.Request) {
  item := req.URL.Query().Get("item")
  price, ok := db[item]
  if !ok {
    w.WriteHeader(http.StatusNotFound) // 404
    fmt.Fprintf(w, "no such item: %q\n", item)
    return
  }
  fmt.Fprintf(w, "%s\n", price)
}

// an adapter that lets a function value satisfy an interface
type HandlerFunc func(w ResponseWriter, r *Request)
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
  // adapter adds ServeHTTP to db.list/price function to satisfy http.Handler interface
  // behavior of ServeHTTP is to call the underlying db.list or db.price function
  f(w, r)
}
```
