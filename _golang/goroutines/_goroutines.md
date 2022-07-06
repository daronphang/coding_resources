## Concurrency

Concurrent programming refers to the expression of a program as a composition of several autonomous activities to hide latency of I/O operations and to exploit modern computer's many processors.

GO enables two styles of concurrent programming. First style is goroutines and channels, which support communicating sequential processes (CSP) in which values are passed between independent activities. Second is traditional model of shared memory multithreading.

## Goroutines

Each concurrently executing activity is called goroutine (similar to threading). A sequential program may call one function and then another, but a concurrent program with two or more goroutines, call to both functions at same time. When program starts, its only goroutine is the one that calls main() i.e. main goroutine. New goroutines are created by go statement.

There is no programmatic way for one goroutine to stop another other than by returning from main or exiting the program. However, there are ways to communicate with a goroutine to request that it stop itself.

```go
f()
go f()  // creates new goroutine that calls f(); doesnt wait for f() to finish
```

```go
func main() {
  go spinner(100 * time.Milisecond)
  const n = 45
  fibN := fib(n)
  fmt.Printf("\rFibonacci(%d) = %d\n", n, fibN)
}

func spinner(delay time.Duration) {
  for {
    for _, r := range `-\|/` {
      fmt.Printf("\r%c", r)
      time.Sleep(delay)
    }
  }
}

func fib(x int) int {
  if x < 2 {
    return x
  }
  return fib(x-1) + fib(x-2)
}
```

### Select

Select statement lets a goroutine wait on multiple communication operations i.e. used to choose from multiple send/receive channel operations.

A select blocks until one of its cases can run, then it executes that case. It chooses one at random if multiple are ready.

```go
package main

import (
    "fmt"
    "time"
)

func server1(ch chan string) {
    time.Sleep(6 * time.Second)
    ch <- "from server1"
}
func server2(ch chan string) {
    time.Sleep(3 * time.Second)
    ch <- "from server2"

}
func main() {
    output1 := make(chan string)
    output2 := make(chan string)
    go server1(output1)
    go server2(output2)
    select {
    case s1 := <-output1:
        fmt.Println(s1)
    case s2 := <-output2:
        fmt.Println(s2)
    }
}
```

```go
package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}

/*
0
1
1
2
3
5
8
13
21
34
quit
*/

```

### Deadlock

Select statement will block forever since no other goroutine is writing to the channel. Program will panic at runtime.

```go
package main

func main() {
    ch := make(chan string)
    select {
    case <-ch:
    }
}
```
