## Concurrency

Concurrent programming refers to the expression of a program as a composition of several autonomous activities to hide latency of I/O operations and to exploit modern computer's many processors. GO enables two styles of concurrent programming. First style is goroutines and channels, which support communicating sequential processes (CSP) in which values are passed between independent activities. Second is traditional model of shared memory multithreading.

## Goroutines

Each concurrently executing activity is called goroutine. A sequential program may call one function and then another, but a concurrent program with two or more goroutines, call to both functions at same time. When program starts, its only goroutine is the one that calls main() i.e. main goroutine. New goroutines are created by go statement.

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

## Channels

Channels are the connections between goroutines i.e. a communication mechanism that lets one goroutine send values to another goroutine. A channel has two principal operations, send and receive. Also supports a third operation, close, which sets a flag indicating that no more values will ever be sent on this channel; subsequent attempts to send will panic. Receive operations on a close channel yield the values that have been sent until no more values are left.

```go
ch := make(chan int)    // ch has type 'chan int', unbuffered channe;
ch := make(chan, int, 0)  // unbuffered channel
ch := make(chan, int, 3)  // buffered channel with capacity 3
close(ch)

ch <- s   // a send statement
x = <-ch    // a receive expression in an assignment statement
<-ch    // a receive statement, reuslt is discarded
```
