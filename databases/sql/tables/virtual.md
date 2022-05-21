## VIRTUAL TABLES (VIEW)

Can be utilized as a subset of actual data to perform certain operations. Helps to provide an abstraction to various users or hide the complexity for users who are accessing data from the table i.e. users may only have permission to view certain columns of data and not the whole table.

Can be used as aggregate tables using GROUP BY operations. Does not hold physical memory but only the definition of the view in the data dictionary. Has primarily two purposes:

- Simplifying complex SQL queries.
- Restricting users from accessing sensitive data.

```sql
REPLACE VIEW view_name AS table1

ALTER VIEW view_name RENAME TO info_table

DROP VIEW IF EXISTS view_name
```

### SIMPLE

Based on a single table which doesn't contain aggregate functions.

```sql
CREATE VIEW view_name AS
SELECT col1,col2
FROM table1
WHERE condition
```

### COMPLEX

Based on multiple tables, which contain GROUP BY clauses.

```sql
CREATE VIEW view_name AS
SELECT emp_id, AVG(salary)
FROM table1
WHERE condition
GROUP BY dept
```

### INLINE

Based on a subquery in the FROM-clause of another SELECT statement.

```sql
SELECT col1,col2
FROM (subquery)
WHERE condition
```

### MATERIALIZED (SNAPSHOTS)

Replicates the retrieved data physically i.e. data is stored on memory. Data can be reused without executing the VIEW again. Can reduce the processing time to regenerate the whole data. Helps remote users to replicate the data locally and improve query performance. However, challenge is to synchronize the changes in MATERIALIZED views underlying tables.

```sql
CREATE MATERIALIZED VIEW view_name AS
SELECT col1,col2
FROM table1
WHERE condition
```
