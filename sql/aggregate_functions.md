## Aggregate Functions:
Agg function calls happen only in SELECT or HAVING clause. Common functions:
1) AVG()
2) COUNT()
3) MAX()
4) MIN()
5) SUM()
```
SELECT MAX(col1),MIN(col2) FROM table
SELECT ROUND(AVG(col1),2) FROM table    # 2 represents numnber of decimals
