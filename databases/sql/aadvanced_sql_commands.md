## Sub Query:
Allows to construct complex queries, essentially performign a query on the results of another query. Involves two SELECT statements.
```
SELECT col1,col2 FROM table WHERE col2 > (SELECT AVG(col2) FROM table)    # sub query is performed first
```
## EXISTS:
Operator is used to test for existence of rows; typically a subquery is passed in EXISTS() function.
```
SELECT col1 FROM table WHERE EXISTS(SELECT col1 FROM table2)
```
