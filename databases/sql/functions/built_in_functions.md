### Built-in Functions

```sql
EXTRACT()
REPLACE()
CAST()        -- ANSI standard and compatible with other databases; converts without specific format
CONVERT()     -- SQL Server specific, allows more flexibility
CHARINDEX()   -- Condition check for substring, returns 1 or -1
CONCAT()      -- Combine multiple columns into single string
```

### String Helpers

```sql
LENGTH()
LOWER()
UPPER()
LTRIM()
RTRIM()
TRIM()
SUBSTRING()
SUBSTRING_INDEX()
STRING_SPLIT()         -- Not available in MySQL

SELECT LEGNTH(col1) FROM table
SELECT col1 || ' ' || col2 AS full_name FROM table  -- Concantenate
```

### Aggregate Functions

Aggegrate function calls happen only in SELECT or HAVING clause.

```sql
AVG()
COUNT()
MAX()
MIN()
SUM()

SELECT MAX(col1),MIN(col2) FROM table
SELECT ROUND(AVG(col1),2) FROM table   -- 2 represents numnber of decimals
```
