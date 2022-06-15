## Standard Library

Go standard library has a built-in log package that provides most basic logging features. Does not have log levels (INFO, DEBUG, WARNING, ERROR).

```go
package main

import "log"

func main() {
    log.Println("Hello world!")

    // logging to file
    // If the file doesn't exist, create it or append to the file
    file, err := os.OpenFile("logs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
    if err != nil {
        log.Fatal(err)
    }

    log.SetOutput(file)
}
```

## Structured Loggers

Zap, Zerolog, Logrus.

## Lumberjack

Supports cutting archive log files.

```console
$ go get -u github.com/natefinch/lumberjack
```

### Adding to Zap

```go
func getLogWriter() zapcore.WriteSyncer {
	lumberJackLogger := &lumberjack.Logger{
		Filename:   "./test.log",
		MaxSize:    10,
		MaxBackups: 5,
		MaxAge:     30,
		Compress:   false,
	}
	return zapcore.AddSync(lumberJackLogger)
}
```
