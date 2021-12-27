### Optimization
When joining tables, exclude unncessary columns and perform query first before joining.

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
