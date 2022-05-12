### INNER JOIN

```sql
-- Order doesn't matter
-- Output is set of record that match in both tables
-- if both tables have different number of rows, result will be multiplication of both i.e. 3*2

SELECT * FROM table1 INNER JOIN table 2 ON table1.name = table2.name
SELECT job,table1.name,salary FROM table1 INNER JOIN table2 ON table1.name = table2.name
```

### FULL OUTER JOIN

```sql
# Takes all columns from both tables, fills in data where there is a match, else NULL.
# Order doesn't matter.
SELECT * FROM table1 FULL OUTER JOIN table2 ON table1.name = table2.name
```

### LEFT/RIGHT OUTER JOIN

```sql
# LEFT JOIN returns columns exclusive to table1 or can be found in both.
SELECT * FROM table1 LEFT OUTER JOIN table2 ON table1.name = table2.name
```
