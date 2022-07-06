## Reflection

Ability of program to inspect its variables and values at run-time and find their type.

Sometimes you want to work with variables at run-time using information that didn't exist when program was written i.e. mapping data from a file or network request into a variable, or building a tool that works with different types. Reflection allows you to examine, modify and create variables, functions and structs at run-time.

### CAVEAT

Golang is a strongly and statically typed language i.e. not dynamic. However, there are some cases whereby you wouldn't know what payload is received, and may need to implement an open-ended interface type. In other words, interface allows for Polymorphism in Golang.

Though it is not forbidden to use Reflection i.e. many packages like Marshal, JSON, Validator rely on it, Reflection is slow, less readable, more difficult to debug, accesses places in memory that should not be touched.

Reflection should only be used if there is no other choice. Think twice before using it.

### Reflect.Type, Reflect.Value, Reflect.Kind

Concrete type of interface{} is represented by reflect.Type and underlying value is represented by reflect.Value. Another two functions reflect.TypeOf() and reflect.ValueOf() which return reflect.Type and reflect.Value respectively.

Type represents the actual type of interface{}, while Kind represents the specific kind of type i.e. struct.

```go
type order struct {
	ordId      int
	customerId int
}

func createQuery(q interface{}) {
    t := reflect.TypeOf(q)    // main.order
    v := reflect.ValueOf(q)
    k := t.Kind()             // struct
    fmt.Println("Type ", t)
    fmt.Println("Value ", v)
}
```

### Accessing Struct Property by Name

```go
func getProperty (arg interface{}, name string) {
    r := reflect.ValueOf(arg)
    val := reflect.Indirect(r).FieldByName(name)

    switch reflect.TypeOf(val).Kind() {
        case reflect.String:
            // do sth
    }
}
```

### NumField() and Field()

NumField() returns number of fields in a struct and Field(i int) returns the reflect.Value of the ith field.
