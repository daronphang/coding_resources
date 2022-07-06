### Sorting with sort.Interface

In many languages, sorting algorithm is associated with sequence data type, while ordering function is associated with type of elements. GO's sort.Sort function assumes nothing about the representation of either sequence or its elements. Instead, it uses an interface, sort.Interface, to specify the contract between generic sort algorithm and each sequence type that may be sorted. Package sort provides StringSlice type and function called Strings() so the call can be simplified to sort.Strings().

```go
package sort

// sort algo requires length of sequence, means of comparing two elements, and way to swap two elements
type Interface interface {
  Len() int
  Less(i, j int) bool   // i, j are indices of sequence elements
  Swap(i, j int)
}

// to sort any sequence, need to define a type that implements the three methods
type StringSlice []string
func(p StringSlice) Len() int { return len(p) }
func(p StringSlice) Less(i, j int) bool { return p[i] < p[j] }
func(p StringSlice) Swap(i, j int) { p[i], p[j] = p[j], p[i] }

sort.Sort(StringSlice(names))
```

```go
// more complicated sorting; better to use pointer than element directly as it will run faster
type Track struct {
  Title string
  Artist string
  Album string
  Year int
  Length time.Duration
}

var tracks = []*Track{
  {"Go", "delilah", "From the roots up", 2012, length("3m38s")}
  // ...
}

func length(s string) time.Duration{
  d, err := time.ParseDuration(s)
  if err != nil {
    panic(s)
  }
  return d
}

type byArtist []*Track

func (x byArtist) Len() int { return len(x) }
func (x byArtist) Less(i, j int) bool { return x[i].Artist < x[j].Artist }
func (x byArtist) Swap(i, j int) { x[i], x[j] = x[j], x[i] }

sort.Sort(byArtist(tracks))
// dont need to provide byReverseArtist since the sort package provides Reverse()
sort.Sort(sort.Reverse(byArtist(tracks)))
```

For multi-tier ordering function, can define customSort.

```go
type customSort struct {
  t []*Track
  less func(x, y *Track) bool   // comparison function defines a new sort order
}

func (x customSort) Len() int { return len(x.t) }
func (x customSort) Less(i, j int) bool { return x.less(x.t[i], x.t[j]) }
func (x customSort) Swap(i, j int) { x.t[i], x.t[j] = x.t[j], x.t[i] }

sort.Sort(customSort{tracks, func(x, y *Track) bool {
  if x.Title != y.Title {
    return x.Title < y.Title
  }
  if x.Year != y.Year {
    return x.Year < y.Year
  }
  if x.Length != y.Length {
    return x.Length < y.Length
  }
  return false
}})
```
