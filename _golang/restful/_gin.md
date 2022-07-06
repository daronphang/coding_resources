## RESTful API with Go and Gin

Gin simplifies many coding tasks associated with building web applications, including web services.

https://gin-gonic.com/docs/examples/custom-http-config/

### Create Module for Dependencies

```console
$ go mod init example/web-service-gin
```

### Creating Data

In handler, gin.Context is the most important part of Gin. It carries request details, validates and serializes JSON, etc.

```go
// in main.go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

type album struct {
    ID     string  `json:"id"`
    Title  string  `json:"title"`
    Artist string  `json:"artist"`
    Price  float64 `json:"price"`
}

var albums = []album{
    {ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
    {ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
    {ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func main() {
    // initializing Gin router, can be default or New() if need custom middleware
    router := gin.Default()
    router.GET("/albums", getAlbums)
    router.GET("/albums/:id", getAlbumByID)
    router.POST("/albums", postAlbums)

    router.Run("localhost:8080")
}

// handler to return items in JSON
func getAlbums(c *gin.Context) {
    // indentedJSON serializes struct into JSON and adds to response
    c.IndentedJSON(http.StatusOK, albums)
}

// postAlbums adds an album from JSON received in the request body.
func postAlbums(c *gin.Context) {
    var newAlbum album

    // Call BindJSON to bind the received JSON to newAlbum.
    if err := c.BindJSON(&newAlbum); err != nil {
        return
    }

    // Add the new album to the slice.
    albums = append(albums, newAlbum)
    c.IndentedJSON(http.StatusCreated, newAlbum)
}


// getAlbumByID locates the album whose ID value matches the id
// parameter sent by the client, then returns that album as a response.
func getAlbumByID(c *gin.Context) {
    // c.Param retrieves id path parameter from URL
    id := c.Param("id")

    // Loop over the list of albums, looking for an album whose ID value matches the parameter.
    for _, a := range albums {
        if a.ID == id {
            c.IndentedJSON(http.StatusOK, a)
            return
        }
    }
    c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}
```

### Run Code

Need to add Gin module as a dependency for your module.

```console
$ go get .
go get: added github.com/gin-gonic/gin v1.7.2

$ go run .
$ curl http://localhost:8000/albums
```
