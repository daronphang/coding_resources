### Basics
A variable that is used to store the memory address of another variable (in hexadecimal format). Also termed as special variables. 

```
*operator   Dereferencing operator used to declare pointer variable and access the value stored in address
&operator   Used to return the address of variable or to access the address of a variable to a pointer
```

### Purpose
Pointers are used for efficiency as everything in Golang is passed by value i.e. value passed to function is a copy and not the original object to avoid unintentionally changing data. However, there are times that the original object needs to be manipulated i.e. passing by reference instead of value.
- Variables are names given to a memory location where the actual data is stored.
- To access stored data, need address of memory location.
- For human readability, data can be accessed through variables instead of hexadecimal format.
- Pointers are used to pass a variable's memory location and then dereference it for manipulation as needed.
- Instead of copying large amount of data everytime it is passed, programmers can pass its address.

```go
// Creating myPointer as Pointer to an int32 variable and initialize pointer with address of number1
// Pointer contains the address (hexadecimal) and not the value
var myPointer *int32 = &number1

func main() {
    var creature string = "shark"
    var pointer *string = &creature

    fmt.Println("creature =", creature)   // Creature = shark
    fmt.Println("pointer =", pointer)     // pointer = 0xc0000721e0
    fmt.Println("*pointer =", *pointer)   // to print the value, need to dereference using *operator
    *pointer = "jellyfish"                // modifying value
}
```

### When to use Pointers
- If the function needs to modify its receiver.
- When passing large amounts of data.