### Managing Database Connection

For SQL DB, do not need to defer DB.close() but instead, keep DB connection pool established after first successful connection. Opening and closing DB for each API request is a waste of resources.

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
