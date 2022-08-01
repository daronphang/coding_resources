## Database/SQL

To access databases in Golang, use sql.DB. It is an abstraction of the interface and existence of a database, which might be varied as a local file, accessed through a network onnection, or in-memory and in-process.

The abstraction is designed to keep you from worrying about how to manage concurrent access to the underlying database. Once it is not in use anymore, it is returned to the available pool. One consequence is that **if you fail to release connections back to the pool, can cause sql.DB to open a lot of connections and limiting resources i.e. too many open connections, network ports, file handlers, etc.**

sql.DB performs the following:

- Opens and closes connections to the actual underlying database, via the driver.
- Manages a pool of connections as needed.

### Database Driver

Requires both database/sql and a driver for the specific database. Shouldn't use driver packages directly to allow changing drivers with minimal code changes i.e. empty import.

```go
import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"  // shouldnt use driver packages directly
)


func main() {
	db, err := sql.Open("mysql",
		"user:password@tcp(127.0.0.1:3306)/hello")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
}
```
