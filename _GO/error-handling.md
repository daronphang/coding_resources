### Panic

Should only be used in cases where the program cannot continue execution i.e. unrecoverable error. Any deferred f unctions are executed and then the control returns to its caller. 

```go
func panic(interface{})   // arg passed will be printed when the program terminates
```

### Recover

Recover is a built-in function that regains control of a panicking goroutine. Recover is only usedful inside deferred functions. During normal execution, a call to recover will return nil and has no other effect. If the current goroutine is panicking, a call to recover will capture the value given to panic and resume normal execution.

```go
func main() {
    f()
    fmt.Println("Returned normally from f.")
}

func f() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered in f", r)
        }
    }()
    fmt.Println("Calling g.")
    g(0)
    fmt.Println("Returned normally from g.")
}
```

```go
func RequestCancelRecover() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				log.Println("client canceled the request")
				c.Request.Context().Done()
			}
		}()
		c.Next()
	}
}
```
