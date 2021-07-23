## SQL Statement Fundamentals:
### SELECT:
```
SELECT col1,col2 FROM table
SELECT * FROM infomration_schema.tables
```
### SELECT DISTINCT:
```
# For table columns with duplicate values.
SELECT DISTINCT col1,col2 FROM table
```
### COUNT:
```
SELECT COUNT(col1) FROM table
```
### WHERE:
```
SELECT * FROM table WHERE col1 = 'David'
```
### ORDER BY:
```
# Added towards end of query, default setting is ASC (ascending).
SELECT * FROM table ORDER BY col1,col2
```
### LIMIT:
```
# Limits number of rows returned for a query.
SELECT col1 FROM table ORDER BY col2 LIMIT 5
```
### BETWEEN:
```
SELECT * FROM table WHERE col1 BETWEEN 5 AND 10
SELECT * FROM table WHERE col1 NOT BETWEEN 5 AND 10

# Can be used with dates in ISO 8601 format 'YYYY-MM-DD'
SELECT * FROM table WHERE col2 BETWEEN '2007-02-01' AND '2007-02-15'
```
### IN:
```
SELECT * FROM table WHERE col1 IN ('red','blue')    # Red or Blue
```
### LIKE and ILIKE:
```
# Used for pattern matching i.e. emails ending with @gmail.com
# Widlcard characters: 
# %   Matches any sequence of characters
# _   Matches any single character
SELECT * FROM table WHERE col1 LIKE 'A%'  # all names that begin with A
SELECT * FROM table WHERE col1 LIKE 'Mission Impossible _'
```
### GROUP BY:
```
SELECT col1,col2,SUM(sales) FROM table GROUP BY col1,col2

# To group by date, need remove timestamp using DATE().
SELECT DATE(col1),SUM(sales) FROM table GROUP BY DATE(col1)
```
### HAVING:
```
# Clause that allows to filter aggregate results.
SELECT col1,SUM(sales) FROM table WHERE col1 != 'Google' GROUP BY col1 HAVING SUM(sales) > 1000
```
### AS:
```
SELECT col1 AS name FROM table
SELECT SUM(sales) AS total_revenue FROM table HAVING SUM(sales) > 1000    # agg functions need to use original name
```
### INNER JOIN:
```
# Order doesn't matter.
# Output is set of record that match in both tables.
SELECT * FROM table1 INNER JOIN table 2 ON table1.name = table2.name
SELECT job,table1.name,salary FROM table1 INNER JOIN table2 ON table1.name = table2.name 
```
### FULL OUTER JOIN:
```
# Takes all columns from both tables, fills in data where there is a match, else NULL.
# Order doesn't matter.
SELECT * FROM table1 FULL OUTER JOIN table2 ON table1.name = table2.name
```
### LEFT/RIGHT OUTER JOIN:
```
# LEFT JOIN returns columns exclusive to table1 or can be found in both.
SELECT * FROM table1 LEFT OUTER JOIN table2 ON table1.name = table2.name
```
### IS NULL/NOT NULL
