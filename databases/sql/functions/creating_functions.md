### Creating Functions

```sql
# General syntax
CREATE/REPLACE FUNCTION function_name(arg1 TYPE, arg2 TYPE, arg3 TYPE)
RETURNS return_data_type
LANGUAGE plpgsql
AS
$$
DECLARE
-- variable declaration
BEGIN
-- logic
END;
$$
```

### Counting Rows of Each Table in Database

```sql
CREATE FUNCTION count_rows(schema TEXT, tablename TEXT)
RETURNS INTEGER
LANGUAGE plpsql
AS
$BODY$
DECLARE
result INTEGER;
query VARCHAR;
BEGIN
query := 'SELECT COUNT(*) FROM ' || schema || '.' || table_name;   i.e. SELECT COUNT(*) FROM schema.table1
EXECUTE query INTO result
RETURN result;
END;
$BODY$

# In sql:
SELECT table_schema, table_name, count_rows(table_schema, table_name)
FROM information_schema.tables
WHERE table_schema = 'public'
```

### Split String

```sql
USE [myassistant]
GO
ALTER FUNCTION [dbo].[SPLIT_STRING]
(
@string NVARCHAR(MAX),
@delim CHAR(1)
)
RETURNS @output TABLE(
value NVARCHAR(MAX)
)
BEGIN
  DECLARE @start SMALLINT, @end SMALLINT, @counter SMALLINT
    SET @counter = LEN(@string) - LEN(REPLACE(@string, @delim, '')) + 1
    SET @start = 1
	SET @end = CASE WHEN CHARINDEX(@delim, @string) > 0 THEN CHARINDEX(@delim, @string) ELSE LEN(@string) + 1 END
    WHILE @counter > 0 BEGIN
        INSERT INTO @output(value) VALUES (SUBSTRING(@string, @start, @end - @start))
        SET @start = @end + 1
        SET @end = CASE WHEN CHARINDEX(@delim, @string, @start) > 0 THEN CHARINDEX(@delim, @string, @start) ELSE LEN(@string) + 1 END
        SET @counter = @counter - 1
    END
    RETURN
END

```
