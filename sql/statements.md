## SQL Statement Fundamentals:
### SELECT:
```
SELECT col1,col2 FROM table
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








