## JSON

JSON is an encoding of JS values (strings, numbers, booleans, arrays and objects) as Unicode text. JSON objects are used to encode GO maps and structs.

### Marshaling

Converting a GO data structure to JSON is called marshaling. Marshal produces a byte slice containing a long string with no extraneous white space. For human readability, a variant called json.MarshalIndent produces neatly indented output.

Marshaling uses GO struct field as the field names for JSON objects. **Only exported fields are marshaled i.e. names must be capitalized**.

Field tag is a string of metadata associated at compile time with the field of a struct. Conventionally interpreted as space-separated list of key:"value" pairs. Matching process between JSON names and GO struct names during unmarshaling is case-insensitive i.e. use a field tag to cater for underscores.

When making API calls, need close resp.Body on all execution paths (or use 'defer' which makes it simpler).

```go
type Movie struct {
  Title   string
  Year    int     `json:"released"`   // string literals are field tags
  Color   bool    `json:"color,omitempty"`  // doesn't output field if it is empty
  Count   int     `json:"total_count"`
  url     string  `json:"html_url"`
  Actors  []string
}

var movies = []Movie{
  {
    Title: "Hello",
    Year: 1942,
    Color: false,
    Actors: []string{"john", "peter"}
  }
}

data, err := json.Marshal(movies) // use MarshalIndent() for human readability
if err != nil {
  log.Fatalf("JSON marshaling failed: %s", err)
  fmt.Printf("%s\n", data)
}
```

### Unmarshaling

By defining suitable GO struct, we can select which parts of the JSON input to decode and which to discard.

```go
var titles []struct { Title string }

if err := json.Unmarshal(data, &titles); err != nil {
    // unmarshal data into a slice of     structs     with Title field only
    log.Fatalf("JSON unmarshaling failed: %s", err)
}

fmt.Println(titles)   // "[{hello}]"
```
