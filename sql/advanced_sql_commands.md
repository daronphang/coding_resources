## Sub Query:
Allows to construct complex queries, essentially performign a query on the results of another query. Involves two SELECT statements.
```
SELECT col1,col2 FROM table WHERE col2 > (SELECT AVG(col2) FROM table)    # sub query is performed first
```
