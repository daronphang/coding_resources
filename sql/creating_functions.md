## Creating Functions:
```
# General syntax
CREATE/REPLACE FUNCTION function_name(paramater list)
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
### Counting Rows of Each Table in Database:
```
CREATE FUNCTION count_rows(schema TEXT, tablename TEXT)
RETURNS INTEGER
LANGUAGE plpsql
AS
$BODY$
DECLARE 
result INTEGER;
query VARCHAR;
BEGIN
query := 'SELECT COUNT(*) FROM ' || schema || '.' || tablename;   i.e. SELECT COUNT(*) FROM schema.table1
EXECUTE query INTO result
RETURN result;
END;
$BODY$
```
