## JSON

JSON objects are used to encode GO maps (with string keys) and structs. Converting a GO data structure to JSON is called marshaling. Field tag is a string of metadata associated at compile time with the field of a struct. Conventionally interpreted as space-separated list of key:"value" pairs. Names of all struct fields must be capitalized even if JSON names are not. However, matching process between JSON names and GO struct names during unmarshaling is case-insensitive i.e. use a field tag to cater for underscores.

For human readability, a variant called json.MarshalIndent produces neatly indented output. 

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

// decoding JSON with unmarshaling
var titles []struct { Title string }
if err := json.Unmarshal(data, &titles); err != nil { // unmarshal data into a slice of structs with Title field only
  log.Fatalf("JSON unmarshaling failed: %s", err)
}
fmt.Println(titles)   // "[{hello}]"
```

## Text and HTML Templates

GO offer text and HTML template packages for substituting values of variables into a text or HTML template. A template is a string of file containing one or more portions enclosed in double braces {{...}} called actions. 

```GO
const templ = `{{.TotalCount}} issues:
  {{range .Items}}      // range and end creates a loop 
  Number: {{.Number}}
  {{end}}`
```
