## SQL Statement Fundamentals:
### SELECT:
```
SELECT col1,col2 FROM table
```
### SELECT DISTINCT:
For table columns with duplicate values.
```
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
Added towards end of query, default setting is ASC (ascending).
```
SELECT * FROM table ORDER BY col1,col2
```
### LIMIT:
Limits number of rows returned for a query.
```
SELECT col1 FROM table ORDER BY col2 LIMIT 5
```
