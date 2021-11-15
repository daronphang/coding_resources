## Passing Data Table as Parameter:
Allows multiple rows of data to be passed to stored procedure by Transact-SQL code. Involves 3 step process:
1) Create user-defined table that corresponds to table to be populated.
2) Pass user-defined table to stored procedure as parameter.
3) In stored procedure, select data from passed parameter and insert into table.

```sql
CREATE DATABASE ShowRoom
USE ShowRoom
Create Table Cars
(
    Id int primary key,
    Name nvarchar(50),
    company nvarchar(50)
)
Go

-- user-defined table
CREATE TYPE CarTableType AS TABLE
(
     Id int primary key,
    Name nvarchar(50),
    company nvarchar(50)
)
Go

CREATE PROCEDURE spInsertCars
@CarType CarTableType READONLY
AS
BEGIN
    INSERT INTO Cars
    SELECT * FROM @CarType
END

DECLARE @CarTableType CarTableType

INSERT INTO @CarTableType VALUES (1, 'Corrolla', 'Toyota')
INSERT INTO @CarTableType VALUES (2, 'Civic', 'Honda')
INSERT INTO @CarTableType VALUES (3, '6', 'Audi')
INSERT INTO @CarTableType VALUES (4, 'c100', 'Mercedez')
INSERT INTO @CarTableType VALUES (5, 'Mustang', 'Ford')

EXECUTE spInsertCars @CarTableType
```
