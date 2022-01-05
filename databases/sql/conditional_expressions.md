### CASE

Similar to IF/ELSE statement when certain conditions are met. Has two forms, one is an expression, other is search condition. For expression, the case_value compares with when_value.

```sql
-- expression
CASE case_value
    WHEN when_value THEN statement_list
    [WHEN when_value THEN statement_list] ...
    [ELSE statement_list]
END CASE

-- search condition
CASE
    WHEN search_condition THEN statement_list
    [WHEN search_condition THEN statement_list] ...
    [ELSE statement_list]
END CASE

SELECT col1, CASE WHEN ... END FROM table_name
```

### COALESCE

Function accepts unlimited number of arguments. Returns first argument that is NOT NULL, else NULL. Useful for querying a table with NULL values.

```sql
COALESCE(arg1, arg2, arg3 ... argn)
COALESCE(NULL, 2, 3) -- returns 2

SELECT item, (price - COALESCE(discount, 0)) AS final_price FROM table
```

### NULLIF

Takes in two inputs and returns NULL if both are equal, otherwise the first argument passed. Useful in cases where NULL value would cause an error
or give unwanted result.

```sql
NULLIF(10,10)  -- Returns NULL
NULLIF(arg1,0) -- check if arg1 contains 0 then return NULL
```
