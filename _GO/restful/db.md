### Managing Database Connection

For vast majority of programs, do not need to adjust sql.DB connection pool defaults. From Golang docs, DB handle is meant to be long-lived and shared between many goroutines.

Hence, do not have to worry about closing the connection i.e. defer DB.Close(). Instead, keep DB connection pool established after first successful connection. Opening and closing DB for each API request is a waste of resources.

For customization, can set connection pool properties such as number of open connections, idle connections, etc.

https://go.dev/doc/database/manage-connections

```go
func main() {
	var appCfg configs.EnvConf
	appCfg.Read()
	log.Println("initializing web application")

	// db connection should be kept opened as connection pool
	// opening and closing for each api request is a waste of resources
	db, err := dblayer.SFConn(appCfg)
	if err != nil {
		log.Println("unable to establish DB connection with Snowflake")
		return
	}
	log.Println("Snowflake DB connection pool established")
	log.Fatal(rest.RunApp("127.0.0.1:8082", appCfg, db))
}
```

```go
type DBConnection struct {
	*sql.DB
}

func SFConn(conf configs.EnvConf) (*DBConnection, error) {
	cfg := &sf.Config{
		Account:   conf.Account,
		User:      conf.User,
		Password:  conf.Password,
		Region:    conf.Region,
		Warehouse: conf.Warehouse,
	}
	dsn, err := sf.DSN(cfg)
	if err != nil {
		return nil, err
	}
	db, err := sql.Open("snowflake", dsn)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(fmt.Sprintf("CALL PROD_EPM_DM.UTIL_USER.UPD_PROXY_USER('%s')", conf.SFProxy))
	return &DBConnection{
		DB: db,
	}, err
}
```

```go
func DatabaseConnector (db *dblayer.DBConnection) gin.HandlerFunc {
	return func(c *gin.Context) {
		// pinging DB connection before each request
		if err := db.Ping(); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "database connection error",
				"message": err.Error(),
			})
			return
		}
		c.Set("db", db)
		c.Next()
	}
}
```
