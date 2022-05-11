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

### OVER

Used in almost all invocations of window functions like AVG(), MAX(), and RANK(). Window functions operate on window frames which are sets of rows taht can be different for each record in the query result.

### PARTITION BY

Subclause of the OVER clause.
