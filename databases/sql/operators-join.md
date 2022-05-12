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

### CROSS JOIN

Combining tables without a common column.

```sql
SELECT w.name AS wine, m.name AS main_course
FROM wine w
CROSS JOIN main_course m;
```

### UNION and UNION ALL

Used to combine the result-set of two or more SELECT statements. Conditions as follows:
- Every SELECT statement within UNION must have the same number of columns.
- The columns must have similar data types.
- Columns in every SELECT statement must be in the same order. 

The UNION operator selects only distinct values by default. To allow duplicate values, use UNION ALL. 

```sql
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;

SELECT 1,'01/01/2021','Mohan Gupta','Alwar',10000
UNION ALL
SELECT 2,'02/04/2021','Lucky Ali','Kota',20000
```
