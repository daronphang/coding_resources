## SQL Statement Fundamentals:
### SELECT:
```sql
SELECT col1,col2 FROM table
SELECT * FROM infomration_schema.tables
```
### SELECT DISTINCT:
```sql
# For table columns with duplicate values.
SELECT DISTINCT col1,col2 FROM table
```
### COUNT:
```sql
SELECT COUNT(col1) FROM table
```
### WHERE:
```sql
SELECT * FROM table WHERE col1 = 'David'
```
### ORDER BY:
```sql
# Added towards end of query, default setting is ASC (ascending).
SELECT * FROM table ORDER BY col1,col2
```
### LIMIT:
Different DB use different syntax.
```sql
# mssql
SELECT TOP 100|50% column_name FROM table_name

# Limits number of rows returned for a query.
SELECT col1 FROM table ORDER BY col2 LIMIT 5
```
### BETWEEN:
```sql
SELECT * FROM table WHERE col1 BETWEEN 5 AND 10
SELECT * FROM table WHERE col1 NOT BETWEEN 5 AND 10

# Can be used with dates in ISO 8601 format 'YYYY-MM-DD'
SELECT * FROM table WHERE col2 BETWEEN '2007-02-01' AND '2007-02-15'
```
### IN:
```sql
SELECT * FROM table WHERE col1 IN ('red','blue')    # Red or Blue
```
### LIKE and ILIKE:
```sql
# Used for pattern matching i.e. emails ending with @gmail.com
# Widlcard characters: 
# %   Matches any sequence of characters
# _   Matches any single character
SELECT * FROM table WHERE col1 LIKE 'A%'  # all names that begin with A
SELECT * FROM table WHERE col1 LIKE 'Mission Impossible _'
```
### GROUP BY:
Often used with aggregate functions i.e. COUNT(), SUM(), MIN(), AVG() to group the result-set by one or more columns. When grouping by multiple columns, it means to place all the rows with same values in multiple columns in one group.  
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
### HAVING:
```sql
# Clause that allows to filter aggregate results.
SELECT col1,SUM(sales) FROM table WHERE col1 != 'Google' GROUP BY col1 HAVING SUM(sales) > 1000
```
### AS:
```sql
SELECT col1 AS name FROM table
SELECT SUM(sales) AS total_revenue FROM table HAVING SUM(sales) > 1000    # agg functions need to use original name
```
### INNER JOIN:
```sql
-- Order doesn't matter
-- Output is set of record that match in both tables
-- if both tables have different number of rows, result will be multiplication of both i.e. 3*2

SELECT * FROM table1 INNER JOIN table 2 ON table1.name = table2.name
SELECT job,table1.name,salary FROM table1 INNER JOIN table2 ON table1.name = table2.name 
```
### FULL OUTER JOIN:
```sql
# Takes all columns from both tables, fills in data where there is a match, else NULL.
# Order doesn't matter.
SELECT * FROM table1 FULL OUTER JOIN table2 ON table1.name = table2.name
```
### LEFT/RIGHT OUTER JOIN:
```sql
# LEFT JOIN returns columns exclusive to table1 or can be found in both.
SELECT * FROM table1 LEFT OUTER JOIN table2 ON table1.name = table2.name
```
### IS NULL/NOT NULL
