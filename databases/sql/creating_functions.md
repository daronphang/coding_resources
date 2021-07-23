## Creating Functions:
```
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
### Example (Counting Rows of Each Table in Database):
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
