## Setting MsSQL on Linux

https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16

## Creating DB

Server is localhost and username is sa.

```console
$ sqlcmd -S localhost -U sa -P '<YourPassword>'

$ CREATE DATABASE TestDB
$ SELECT Name FROM sys.databases
$ GO
```

## Inserting Data

```console
$ USE TestDB
$ CREATE TABLE dbo.Inventory (
    id INT, name VARCHAR(50),
    quantity INT
)
```
