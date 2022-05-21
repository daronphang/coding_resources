### SELECT

```sql
SELECT col1,col2 FROM table
SELECT * FROM infomration_schema.tables
```

### SELECT DISTINCT

Should use it sparingly as it has significant overhead cost. If query returns duplicate, need to understand why joining tables produce duplicate results i.e. database PK may not be properly designed, ON statement is not sufficient, etc.

https://weblogs.sqlteam.com/markc/2008/11/11/60752/

```sql
# For table columns with duplicate values.
SELECT DISTINCT col1,col2 FROM table
```

### COUNT

```sql
SELECT COUNT(col1) FROM table
```

### WHERE

```sql
SELECT * FROM table WHERE col1 = 'David'
```

### ORDER BY

```sql
# Added towards end of query, default setting is ASC (ascending).
SELECT * FROM table ORDER BY col1,col2
```

### LIMIT

Different DB use different syntax.

```sql
# mssql
SELECT TOP 100|50% column_name FROM table_name

# Limits number of rows returned for a query.
SELECT col1 FROM table ORDER BY col2 LIMIT 5
```

### BETWEEN

```sql
SELECT * FROM table WHERE col1 BETWEEN 5 AND 10
SELECT * FROM table WHERE col1 NOT BETWEEN 5 AND 10

# Can be used with dates in ISO 8601 format 'YYYY-MM-DD'
SELECT * FROM table WHERE col2 BETWEEN '2007-02-01' AND '2007-02-15'
```

### IN, NOT IN

Used to replace group of arguments using <> or != operator that are combined with AND. It CANNOT replace =, <, >, <=, >=, BETWEEN, or LIKE.

```sql
SELECT * FROM table WHERE col1 IN ('red','blue')    # Red or Blue
```

### LIKE, ILIKE

```
%	Represents zero or more characters
_	Represents a single character
[]	Represents any single character within brackets
-	Represents any single character within specified range in brackets
^	Represents any character not in brackets
```

```sql
WHERE col1 LIKE 'A%'		-- any values that begin with A
WHERE col1 LIKE '%c'		-- any values that end with c
WHERE col1 LIKE '%or%'		-- any values t hat have "or" in any position
WHERE col1 LIKE 'h[a-d]t'
WHERE col LIKE 'h[^oa]t'	-- 'hit' but not 'hat' or 'hot'
WHERE col1 LIKE 'Mission Impossible _'
```

### GROUP BY

Often used with aggregate functions i.e. COUNT(), SUM(), MIN(), AVG() to group the result-set by one or more columns. When grouping by multiple columns, it means to place all the rows with same values in multiple columns in one group i.e. all rows having the same values for col1 and col2 are placed in 1 group and then the aggregate is calculated.

```sql
SELECT
	column1,
	column2,
	AGGREGATE_FUNCTION (column3)
FROM
	table1
GROUP BY
	column1,
	column2;

SELECT col1,col2,SUM(sales) FROM table GROUP BY col1,col2

# To group by date, need remove timestamp using DATE().
SELECT DATE(col1),SUM(sales) FROM table GROUP BY DATE(col1)
```

### HAVING

```sql
# Clause that allows to filter aggregate results.
SELECT col1,SUM(sales) FROM table WHERE col1 != 'Google' GROUP BY col1 HAVING SUM(sales) > 1000
```

### AS

```sql
SELECT col1 AS name FROM table
SELECT SUM(sales) AS total_revenue FROM table HAVING SUM(sales) > 1000    # agg functions need to use original name
```

### IS NULL/NOT NULL

```sql
SELECT col1 FROM table1 WHERE col1 IS NULL
```

### Sub Query

Allows to construct complex queries, essentially performign a query on the results of another query. Involves two SELECT statements.

```sql
SELECT col1,col2 FROM table WHERE col2 > (SELECT AVG(col2) FROM table) -- sub query is performed first
```

### EXISTS

Operator is used to test for existence of rows; typically a subquery is passed in EXISTS() function.

```sql
SELECT col1 FROM table WHERE EXISTS(SELECT col1 FROM table2)
```
