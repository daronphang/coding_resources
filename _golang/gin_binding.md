### Gin Binding

Serialization library that supports JSON, XML, query parameter, etc. and with built-in validation framework. Serializes input data to structs and maps.

### BindJSON

Reads the body buffer and serializes it to a struct. Cannot be called on the same context twice as it flushes the body buffer. To serialize the body to different structs, use ShouldBindBodyWith().

```go
if err:=context.ShouldBindBodyWith(&body, binding.JSON); err!=nil {
   context.AbortWithError(http.StatusBadRequest, err)
   return
}
```

### Validation

Uses the validator package internally for validations. Validations are added to structs.

```go
type URI struct {
   Details string `json:"name" uri:"details" binding:"required"`
}

type User struct {
   Name string `json:"name" binding:"required, min=3"`
   Age uint `json:"age" binding:"required, min=18"`
   Comments []*Comment `json:"comments" binding:"required"`
}

type Comment struct {
   Text string `json:"text" binding:"required,max=255"`
   Type string `json:"type" binding:"required,oneof=post nested"`
}
```

### Custom Validations

To create a new binding, need to register a validation with a function that performs the validation. Can access the validation engine using the 'binding' package and exporting Validator variable.

```go
 // getting the validation engine and type casting it.
if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
   v.RegisterValidation("notoneof", func(fl validator.FieldLevel) bool {
     // split values using ` `. eg. notoneof=bob rob job
      match := strings.Split(fl.Param(), " ")
     // convert field value to string
      value := fl.Field().String()
      for _, s := range match {
       // match value with struct filed tag
         if s == value {
            return false
         }
      }
      return true
   })
}
```

### Example

```go
package main

import (
   "fmt"
   "github.com/gin-gonic/gin"
   "net/http"
)

type Body struct {
  // json tag to serialize json body
   Name string `json:"name"`
}

func main() {
   engine := gin.New()
   engine.POST("/test", func(context *gin.Context) {
      body := Body{}
      // using BindJson method to read body buffer and serialize it to a struct
      if err := context.BindJSON(&body); err!=nil {
         context.AbortWithError(http.StatusBadRequest, err)
         return
      }
      fmt.Println(body)
      context.JSON(http.StatusAccepted, &body)
   })
   engine.Run(":3000")
}
```
