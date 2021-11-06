## SQL Injection Attacks:
Fundamental problem that causes SQL injection is data being treated as query language.

```sql
SELECT * FROM users WHERE username = '$username' AND password = '$password'
-- if set $password = 'FOO' OR 'x' = 'x' 


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

## Preventions:
Stored procedures can help to prevent SQL injection as it writes the query beforehand with markers for parameters.
```
SELECT * FROM users WHERE username = ? AND password = ?
```
