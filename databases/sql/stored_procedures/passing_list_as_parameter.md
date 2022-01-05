### Passing List as Parameter

Three main contenders are Table-Valued Parameters, delimited list string and JSON string.

### TVP

Allows multiple rows of data to be passed to stored procedure by Transact-SQL code. Involves 3 step process:

1. Create user-defined table that corresponds to table to be populated.
2. Create stored procedure that uses TVP.
3. Declare table type, populate it with data, and pass it to stored procedure.

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

### Delimited List String

Can use built in STRING_SPLIT() but there are several shortcomings:

- Delimiter can only be single character.
- Returns values and not position of values i.e. multiple lists keeping in sync.
- Returns strings only and type specified as parameter i.e. VARCHAR(MAX) which comes with performance overhead.
- Does not trim spaces around values

https://www.sommarskog.se/arrays-in-sql.html

### Table-Valued Functions

TVF is a user-defined function that returns data of a table type. For SQL Server, can use string_split() which is a TVF that splits a string array with delimiter and returns results into a table. Returns a single-column table whose column name is 'value'.

```sql
SELECT value FROM STRING_SPLIT('red,green,blue', ',');
```

```sql
CREATE FUNCTION dbo.SPLIT_STRING(
@string NVARCHAR(MAX),
@delimiter CHAR(1)
)
RETURNS @output TABLE(
value NVARCHAR(MAX)
)
BEGIN
    DECLARE @start SMALLINT, @end SMALLINT, @counter SMALLINT
    SET @counter = LEN(@string) - LEN(REPLACE(@string, @delimiter, '')) + 1
    SET @start = 1, @end = CHARINDEX(@delimiter, @string)
    WHILE @counter > 0 BEGIN
        INSERT INTO @output(value) VALUES (SUBSTRING(@string, @start, @end - @start))
        SET @start = @end + 1
        SET @end = CHARINDEX(@delimiter, @string, @start)
        SET @counter = @counter - 1
    END
    RETURN
END
```
