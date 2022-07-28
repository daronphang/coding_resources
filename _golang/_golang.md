## Golang

A compiled language. Organized into packages (similar to libraries/modules). Has a cultural agenda of radical simplicity with garbage collection, pacakge system, first-class functions (treated like any other variable), lexical scope, system call interface and immutable strings encoded in UTF-8 (can process in all languages). Language is mature, stable and guarantees backwards compatibiity. Well suited for building infrastructure like netwroked servers, tools and systems for programmers.

Static type language as compared to Python/Javascript (dynamic type). Dynamic means you can declare a variable as a string and later assign it as number.

### Setting up Environment

```console
// initialize module file
$ go mod init current_folder_name
```

### Hello World

A package can have many related files ending with .go with requirement that every file must declare the package it belongs to. Two types of packages: executable (generates a file that can be run, package main) and reusable/dependency (code used as "helpers", good place to put reusable logic). For package main, it must have a function called "main".

https://pkg.go.dev/std

```GO
package main    // refers to project or workspace

import "fmt"

func main() {
  fmt.Println("Hello world!")
}
```

## Naming Conventions

### Packages

Package names are short and clear, lowercase, with no underscores or camelCases. A package name and its contents are coupled.

Break up generic packages i.e. packages named util, interfaces, common or misc provide clients with no sense what the package contains, grows without bound, accumulates dependencies, and collides with other imports.

Organize packages by responsibility i.e. organizing types together in package models should be avoided. Instead, the individual types/structs should be declared in their respective packages.

https://github.com/golang-standards/project-layout

## Structure

### Internal

To prevent packages from being imported unnecessarily, can create an **internal/** package. It is a special directory name recognized by the go tool which will prevent one package from being imported by another unless both share a common ancestor.

### Helpers/Util

These functions should exist in packages that are used most often i.e. put near where they are used. Moroever, a little copying is better than a little dependency. 

When deciding where to put helper/util functions, it will depend on the following:

1. Do they rely on any of their own outside dependencies?
2. Are they what is known as pure functions that just take inputs and return the same outputs?
3. Do they reference other helper functions?
4. Do they result in any side effects, such as saving data to the database?
5. Do they have a general purpose that can be used throughout the whole application, or are they meant to do things relevant to handling incoming controller requests and formulating responses?

Options are as follows:

1. Traits
2. Class inheritance
3. General service class with dependency injection
4. Simple helper functions file that gets autoloaded
5. Simple newable value objects and maybe a factory to create them to aid in testing if needed
6. Keeping them right where they are if there actually isn't much value to code re-use here (believe it or not, a little repetition is not a bad thing, but it's highly situational).

## GO CLI

```
go build      Compiles code but does not execute
go run        Compiles and execute one or two files
go fmt        Formats all code in each file in current directory
go install    Compiles and installs a package
go get        Downloads raw source code of someone else's package
go test       Runs any tests associated with current project
```

```
$ go build test.go
$ ls
$ ./test
$ rm test
```

## Garbage Collector

GO's garbage collector recycles unused memory but DO NOT assume it will release unused operating system resources like open files and network connections. **They should be closed explicitly**.

## Print Functions

```go
fmt.Println()     // Takes a string, prints and adds a new line after string
fmt.Print()       // same as Println() but does not add a new line after string
fmt.Printf()      // formats string using custom specifier and writes output to stdout
fmt.Sprint()      // uses default formats for its operands and returns resulting string
fmt.Sprintf()      // formats and stores a series of characters and values in array pointed to by buffer
fmt.Errorf()
fmt.Fprintf()     // F prefix stands for file and indicates formatted output should be written to file
fmt.Fscanf()
fmt.Scan()        // Scans textfrom std input, storing successive space-separated values into successive args
fmt.Scanf()
fmt.Sscanf()
log.Printf()

myString := "Results: " + results + " and more stuff: " + more

fmt.Print(name, " is ", age, " years old.\n")
fmt.Printf("%s is %d years old.\n", name, age)

s := fmt.Sprint(name, " is ", age, " years old.\n")
myString := fmt.Sprintf("Results: %s and more stuff: %s", results, more)
```

```
%v    value in default format
%#v   Go-syntax representation of value
%T    type of value
%%    literal % sign; consumes no value

%t    true or false
%c    character represented by corresponding Unicode code point
%b    base 2
%d    base 10
%o    base 8
%U    unicode format i.e. U+1234 which is same as U+%04X

%f    decimal point but no exponent i.e. 123.456
%e    for large exponents i.e. 1.23456e+78
%x    hexadecimal notation -0x1.23abcp+20
%X    uppercase hexadecimal notation

%s    unintepreted bytes of string or slice
%q    double-quoted string safely escaped with Go syntax
%x    base 16, lower-case, two characters per byte
%X    base 16, upper-case, two characters per byte

%p    for pointers, base 16 notation with leading 0x
```

## Command Line Arguments

OS package provides functions and other values for dealing with OS; command-line arguments are available to a program in a variable named Args which is a slice of strings.

```GO
// ECHO program in linux
package main
import (
  "fmt"
  "os"
)

func main() {
  var s, sep string     // explicit var declaration s and sep of type string

  // := is a short variable declaraton, i++ is increment statement of 1
  for i := 1; i < len(os.Args); i++ {
    s += sep + os.Args[i]   // string concatenation
    sep = " "
  }
  fmt.Println(s)
}

// ECHO program printing command-line args
func main() {
  s, sep := "", ""

  // range produces index (not needed) and element value pair, but requires to deal with both values
  // GO does not permit unused local variables; solution is to use blank identifier
  for _, arg := range os.Args[1:] {
    s += sep + arg
    sep = " "
  }
  fmt.Println(s)    // alternative is fmt.Println(strings.Join(os.Args[1:], " "))
}
```

## Loop Statements

For loop is only loop statement in GO.

```GO
// traditional "while" loop
for initialization; condition; post {
}

// traditional infinite loop
for {
  // break or return to terminate loop
}
```

```GO
// program prints duplicate lines
package main

import (
  "bufio"
  "fmt"
  "os"
)

func main() {
  counts := make(map[string]int)    // map holds a set of key/value pairs, of type string/int
  input := bufio.NewScanner(os.Stdin)
  for input.Scan() {
    line := input.Text()
    counts[line] = counts[line] + 1   // shortcut is counts[input.Text()]++
  }
  // NOTE: ignoring potential errors from input.Err()
  for line, n := range counts {
    if n > 1 {
      fmt.Printf("%d\t%s\n", n, line) // decimal integer, \tab, string, \newline
    }
  }
}

```

## Variable Declarations

```GO
s := "Hello world"    // colon syntax used for assigning NEW variables only
var s string = "Hello world"
s = "Awesome!"    // equal syntax for reassigning variables
```
