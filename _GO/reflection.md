### Reflection

Ability of program to inspect its variables and values at run-time and find their type. 

Sometimes you want to work with variables at run-time using information that didn't exist when program was written i.e. mapping data from a file or network request into a variable, or building a tool that works with different types. Reflection allows you to examine, modify and create variables, functions and structs at run-time.

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

### NumField() and Field()
NumField() returns number of fields in a struct and Field(i int) returns the reflect.Value of the ith field. 
