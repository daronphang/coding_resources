### Gin Context

Most important part of gin. It allows us to pass variables between middlewares, manage the flow, validate the JSON of a request and render a JSON response.

```go
type Context struct {
	Request *http.Request
	Writer  ResponseWriter

	Params Params

	// Keys is a key/value pair exclusively for the context of each request.
	Keys map[string]interface{}

	// Errors is a list of errors attached to all the handlers/middlewares who used this context.
	Errors errorMsgs

	// Accepted defines a list of manually accepted formats for content negotiation.
	Accepted []string
	// contains filtered or unexported fields
}
```

#### Binding

Bind checks the Content-Type to select a binding engine automatically; returns an error otherwise. If body has Content-Type as 'application/json', it decodes the JSON payload into the struct specified as a pointer.

```go
func (c *Context) ShouldBindWith(obj interface{}, b binding.Binding) error
```
