## Zap

Provides two separate loggers, 'Logger' for situations where performance is critical, and 'SugaredLogger', which prioritizes ergonomics and flexibility.

### Levels

```
DEBUG
INFO
WARNING
ERROR
DPANIC
PANIC       Logs a message, then panics
FATAL       Logs a message, then calls os.Exit(1)
```

### Preset Loggers

For larger projects or unusual configurations (splitting output between files, sending logs to a message queue, etc.) are possible, but require direct use of go.uber.org/zap/zapcore.

The zap package itself is a relatively thin wrapper around the interfaces in go.uber.org/zap/zapcore. Extending zap to support a new encoding (e.g., BSON), a new log sink (e.g., Kafka), or something more exotic (perhaps an exception aggregation service, like Sentry or Rollbar) typically requires implementing the zapcore.Encoder, zapcore.WriteSyncer, or zapcore.Core interfaces. See the zapcore documentation for details.

```
NewExample
NewProduction       Logging enabled at INFO, uses JSON encoder
NewDevelopment      Uses console encoder
```

```go
sugar := zap.NewExample().Sugar()
defer sugar.Sync()
sugar.Infow("failed to fetch URL",
  "url", "http://example.com",
  "attempt", 3,
  "backoff", time.Second,
)
sugar.Infof("failed to fetch URL: %s", "http://example.com")
```

```go
package main

import (
 "log"
 "os"
 "go.uber.org/zap"
)

func main() {
    logger, _ := zap.NewDevelopment()
    defer logger.Sync()
    logger.Info("Hello Zap!")
}
```

### Custom Logger

Can define logger config in JSON or YAML file.

```go
func main() {
    rawJSON := []byte(`{
        "level": "debug",
        "encoding": "json",
        "outputPaths": ["stdout"],
        "errorOutputPaths": ["stderr"],
        "encoderConfig": {
                "messageKey": "message",
                "levelKey": "level",
                "levelEncoder": "lowercase"
        }
    }`)
    var cfg zap.Config
    if err := json.Unmarshal(rawJSON, &cfg); err != nil {
        panic(err)
    }
    logger, err := cfg.Build()
    if err != nil {
        panic(err)
    }
    defer logger.Sync()
    logger.Info("Hi, custom logger!")
}
```

### Writing to Different IO

```go
cfg := zap.NewProductionConfig()
core := zapcore.NewCore(
        zapcore.NewJSONEncoder(cfg.EncoderConfig),
        zapcore.AddSync(io.Discard),    // from stdout/stderr to io.Discard
        zapcore.InfoLevel,
)
logger := zap.New(core)
```
