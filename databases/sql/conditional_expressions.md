## CASE:
Similar to IF/ELSE statement when certain conditions are met.
```sql
# General syntax
CASE 
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ELSE result3
END

SELECT col1, CASE WHEN ... END FROM table_name
```
## COALESCE:
Function accepts unlimited number of arguments. Returns first argument that is NOT NULL, else NULL. Useful for querying a table with NULL values.
```sql
COALESCE(arg1, arg2, arg3 ... argn)
COALESCE(NULL, 2, 3)    # returns 2

SELECT item, (price - COALESCE(discount, 0)) AS final_price FROM table
```
## CAST:
Converts from one data type into another.
```sql
# General syntax
SELECT CAST('5' AS INTEGER)

SELECT CHAR_LENGTH(CAST(inventory_id AS VARCHAR)) FROM table    # CAnnot use LENGTH on integers, need to convert to string
```
## NULLIF:
Takes in two inputs and returns NULL if both are equal, otherwise the first argument passed. Useful in cases where NULL value would cause an error
or give unwanted result.
```sql
NULLIF(10,10)   # Returns NULL
NULLIF(arg1,0)  # check if arg1 contains 0 then return NULL
```
