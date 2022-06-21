## Names

Keywords that cannot be used as names.

```
break       case      chan      const         continue
default     defer     else      fallthrough   for
func        go        goto      if            import
interface   map       package   range         return
27          select    struct    switch        type
```

Constants, types and functions.

```
// CONSTANTS
true false iota nil

// TYPES
int int8 int16 int32 int64
uint uint8 uint16 uint32 uint64 uintptr
float32 float64 complex128 complex64
bool byte rune string error

// FUNCTIONS
make len cap new append copy close delete
complex real ima
```

## Declarations

```
var   const   type    func
```

```GO
func main() {
  const freezingF, boilingF = 32.0, 212.0
  fmt.Printf("%g°F = %g°C\n", freezingF, fToC(freezingF)) // "32°F = 0°C"
}

func fToC(f float64) float64 {
  return (f - 32) * 5 / 9
}
```

## Variables

Either type or =expression may be omitted, but not both. If expression is omitted, initial value is 0/false/nil/"".

```GO
var [name] [type] = [expression]

var i, j, k int   // int, int, int
var b, f, s = true, 2.3, "four"   // bool, float64, string
var f, err = os.Open(name)        // os.Open() function returns a file and an error

// short variable declarations for local variables where type is determined by expression
// := is declaration whereas = is assignment
anim := gif.GIF{LoopCount: nframes}
freq := rand.Float64() * 3.0
t := 0.0
```

## Pointers

A pointer value is the address of a variable to update the value indirectly without knowing the variable name. Each time the address of a variable is taken or copied, new aliases are created to identify the same variable. Pointer aliasing is useful as it allows access to a variable without using its name; however, to find all statements that access a variable, need to know all aliases.

Pointers are key in flag package which uses a program's command-line arguments to set values of certain variables distributed throughout the program.

```GO
x := 1
p := &x           // p, of type *int, points to x (contains the address of x)
fmt.Println(*p)   // "1"
*p = 2            // equivalent to x = 2, pointer variable
fmt.Println(x)    // "2"

// passing a pointer arg to function
func incr(p *int) int {
  *p++ // increments what p points to; does not change p
  return *p
}

v := 1
incr(&v)                // side effect: v is now 2
fmt.Println(incr(&v))   // "3" (and v is 3)
```

## Function New()

```GO
p := new(int)     // p, of type *int, points to an unnamed int variable
fmt.Println(*p)   // "0"
*p = 2            // sets the unnamed int to 2
fmt.Println(*p)   // "2"
```

## Variable Lifetimes

Lifetime of package-level variable is the entire execution of program. Local variables have dynamic lifetimes; new instance lives on until it becomes unreachable, at which point its storage may be recycled. Compiler may choose to allocate local variables on heap or stack depending on whether they are reachable after a function is called or not.

## Assignability

Allows both implicit and explicit assignments.

```GO
mdeals := []string{"gold", "silver", "bronze"}
```

## Type Declarations

```go
type [name] [underlying-type]

// both have same underlying type but are not the same type i.e. cannot use == to compare each other
// however can use == to compare values
type Celsius float64
type Fahrenheit float64
var c Celsius
var f Fahrenheit
fmt.Println(c == 0) // true
fmt.Println(c == f) // compile error: type mismatch
```

## Imports

It is an error to import a package and then not refer to it. Best to use golang.org/x/tools/cmd/goimports tool which automatically inserts and removes packages from import declaration as necessary.

## Package Initialization

If package has multiple .go files, the are initialized in the order the files are given to the compiler. For variables such as tables that are difficult to set initial value, can use init().

```go
var a = b + c   // a initialized third to 3
var b = f()     // b initialized second to 2, by calling f
var c = 1       // c initialized first to 1
```

## Scope

Syntactic block is a sequence of statements enclosed in braces. The generic notion of blocks including declarations not surrounded by braces are called lexical blocks. A declaration's lexical block determines its scope. A program can contain multiple declarations of the same name so long as each declaration is in a different lexical block. At package level, oreder in which declarations appear has no effect on their scope.

```GO
func f() {}

var g = "g"

func main() {
  f := "f"
  fmt.Println(f) // "f"; local var f shadows package-level func f
  fmt.Println(g) // "g"; package-level var
  fmt.Println(h) // compile error: undefined: h
}


// 3 variables named x, each declared in different block
func main() {
  x := "hello"            // explicit
  for _, x := range x {   // implicit
    x := x + 'A' - 'a'    // explicit
    fmt.Printf("%c", x)   // "HELLO" (one letter per iteration)
  }
}
```

### Variable Scoping

```go
{
    err := thisCouldFail()
    if err != nil {
        log.Fatal(err)
    }
}

// shorter syntax, useful for initializing condition variable and restricting scope of this variable to if block only
if statement; condition {
  // some code
}

// err is scoped inside and will shadow previous err variable declared outside block
if err := thisCouldFail(); err != nil {
  log.Fatal(err)
}
```
