## Gin Middleware

```go
func main() {
	// Creates a router without any middleware by default
	r := gin.New()

	// Logger middleware will write the logs to gin.DefaultWriter even if you set with GIN_MODE=release.
	// By default gin.DefaultWriter = os.Stdout
	r.Use(gin.Logger())

	// Recovery middleware recovers from any panics and writes a 500 if there was one.
	r.Use(gin.Recovery())

	// Per route middleware, you can add as many as you desire.
	r.GET("/benchmark", MyBenchLogger(), benchEndpoint)

	// Authorization group
	// authorized := r.Group("/", AuthRequired())
	// exactly the same as:
	authorized := r.Group("/")
	// per group middleware! in this case we use the custom created
	// AuthRequired() middleware just in the "authorized" group.
	authorized.Use(AuthRequired())
	{
		authorized.POST("/login", loginEndpoint)
		authorized.POST("/submit", submitEndpoint)
		authorized.POST("/read", readEndpoint)

		// nested group
		testing := authorized.Group("testing")
		testing.GET("/analytics", analyticsEndpoint)
	}

	// Listen and serve on 0.0.0.0:8080
	r.Run(":8080")
}
```

### Example with CORS

```go
package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CORS(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "*")
	c.Header("Access-Control-Allow-Headers", "*")
	c.Header("Content-Type", "application/json")
	if c.Request.Method != "OPTIONS" {
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusOK)
	}
}
```

```go
func main () {
	r := gin.New()
	r.Use(middleware.CORS)
	r.Use(gin.Recovery())
	r.Use(LoggerWithConfig())
	MDEv1 := r.Group("/MDE/v1")
	{
		MDEv1.POST("/gcp", e.GetUserGCP)
		MDEv1.POST("/testSpc", e.TestSPC)
		MDEv1.POST("/spaceData", e.GetSPCData)
		MDEv1.POST("/checkJob", e.CheckJob)
		MDEv1.POST("/issueTracker", e.GetIssueTracker)
	}
	return r.Run(address)
}
```

### Passing Arguments to Middlewares (Decorators)

```go
package middleware

import (
	"MyAssistant-Data-Extrator/src/MDE/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SchemaValidator (schemaType string) gin.HandlerFunc {
	return func(c *gin.Context) {
		schemas := map[string]models.Payload {
			"heartbeat": &models.HeartbeatPayload{},
		}

		if _, ok := schemas[schemaType]; !ok {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"message": "invalid schema",
				"error": "schema provided not found",
			})
		}

		if err := c.ShouldBindJSON(schemas[schemaType]); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
				"message": "incorrect payload",
				"error": err.Error(),
			})
		}
		// payload is valid, passed to next middleware
		c.Next()
	}
}
```
