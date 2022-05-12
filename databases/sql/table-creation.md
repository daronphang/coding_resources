## TEMPORARY TABLE

### LOCAL

Starts with a single # as prefix. If the session which has created the local temporary table is closed, the temporary table will be dropped automatically by SQL server.

```sql
CREATE TABLE #LocalCustomer
(
 CustomerId int,
 CustomerName varchar(50), 
 CustomerAdress varchar(150)
)
GO
INSERT INTO #LocalCustomer VALUES(1,'Katelyn Montropx' ,'30  Crescent Avenue DRUMMUIR CASTLE')
GO
SELECT * FROM #LocalCustomer
GO
DROP TABLE #LocalCustomer
```

```sql
-- alternative to create temp tables
SELECT name, age, gender
INTO #MaleStudents
FROM student
WHERE gender = 'Male'
```

### GLOBAL

Starts with double ## as prefix. Can be accessed from all other connections. Similar to local, it will be dropped automatically when the session is closed.

```sql
CREATE TABLE ##GlobalCustomer
(
 CustomerId int,
 CustomerName varchar(50), 
 CustomerAdress varchar(150)
)
GO
INSERT INTO ##GlobalCustomer VALUES(1,'Adam Tottropx' ,'30  Mztom Street LONDON')
GO
SELECT * FROM ##GlobalCustomer
```
