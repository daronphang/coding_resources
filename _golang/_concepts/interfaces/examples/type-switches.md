### Type Switches

```go
import "database/sql"

func listTracks(db sql.DB, artist string, minYear, maxYear int) {
  result, err := db.Exec(
    "SELECT * FROM tracks WHERE artist = ? AND ? <= year AND year ?",
    artist, minYear, maxYear
  )
  // ...
}

// within Exec
func sqlQuote(x interface{}) string {
  if x == nil {
    return "NULL"
  } else if _, ok := x.(int); ok {
    return fmt.Sprintf("%d", x)
  } else if _, ok := x.(uint); ok {
    return fmt.Sprintf("%d", x)
  } else if b, ok := x.(bool); ok {
    if b {
      return "TRUE"
    }
    return "FALSE"
  } else if s, ok := x.(string); ok {
    return sqlQuoteString(s)
  } else {
    panic(fmt.Sprintf("unexpected type %T: %v", x, x))
  }
}

// type switch
func sqlQuote(x interface{}) string {
  // each case implicitly creates a separate lexical block
  // x.(type) is type switch
  switch x := x.(type) {
  case nil:
    return "NULL"
  case int, uint:
    return fmt.Sprintf("%d", x)
  case bool:
    if x {
      return "TRUE"
    }
    return "FALSE"
  }
  case string:
    return sqlQuoteString(x)
  default:
    panic(fmt.Sprintf("unexpected type %T: %v", x, x))
}
```
