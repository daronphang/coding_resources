### Query Best Practices
- SELECT fields instead of using SELECT *
- Avoid using SELECT DISTINCT by adding more SELECT fields as GROUPing is expensive and may be inaccurate
- When joining tables, exclude unncessary columns and perform query first before joining
- use WHERE instead of HAVING to define filters

```sql
SELECT * FROM table1 AS TB1
INNER JOIN table2 AS TB2 ON TB1.col2 = TB2.col2
WHERE TB1 = 'hello'
AND TB2 = 'world'

-- optimized
SELECT * FROM table1 AS TB1
INNER JOIN (
SELECT col1 FROM table2 WHERE col1 = 'world'
) AS TB2 ON TB1.col2 = TB2.col2
WHERE TB1.col1 = 'hello'
```

### Indexing
Indexes are special lookup tables that the database search engine can use to speed up data retrieval i.e. pointer to data in a table. Helps to speed up SELECT queries and WHERE clauses, but slows down data input with UPDATE and INSERT statements. Can be created/dropped without any effect on data.

Whether to create single/composite index depends on the columns used frequently in WHERE clause. Implicit indexes are indexes automatically created by database server when an object is created i.e. for PK/unique constraints. 

```sql
-- single-column index
CREATE INDEX index_name ON table_name (column1)

-- unique indexes; can be used for both performance and data integrity (no duplicates)
CREATE UNIQUE INDEX index_name ON table_name (column_name)

-- composite indexes
CREATE INDEX index_name ON table_name (col1, col2)
```

#### Unique Indexes vs Constraint
- When a unique constraint is created, a unique index is also created.
- No functional difference between both of them.
- Boils down to preferred style/consistency where constraint is more for business rule and index for querying.
- Unique index can be disabled while constraint cannot be disabled.

#### When to Avoid Indexes
- Indexes should not be used on small tables
- For tables that have frequent, large database UPDATES or INSERT operations.
- Indexes should not be used on columns that have high number of NULL values.
- Columns that are frequently manipulated should not be indexed.


### Removing Duplicates

```sql
-- use self join

SELECT a.ID, a.NAME, a.ADDRESS
FROM someTable AS a
INNER JOIN
someTable AS b ON
a.ID = b.ID AND
a.NAME = b.NAME
```
