## Triggers

A trigger is a stored procedure which automatically invokes whenever a special event/change in the database occurs. Difference between triggers and stored procedures is that the latter must be invoked directly. Two types of triggers include DDL and DML.

```sql
-- general syntax
CREATE TRIGGER trigger_name
ON table_name
FOR|AFTER|INSTEAD OF
INSERT, UPDATE, DELETE
AS
sql_statements
```

### DDL (Data Definition Language)

Fires in response to DDL command events including CREATE, ALTER and DROP.

```sql
CREATE TRIGGER deep
ON emp
FOR
INSERT,UPDATE,DELETE
AS
print'you can not insert,update and delete this table i'
ROLLBACK;
```

### DML (Data Manipulation Language)

DML triggers run when a user tries to modify data through a DML event such as INSERT, UPDATE or DELETE statements on a table or view.

```sql
CREATE TRIGGER insert_trigger
ON emp
AFTER INSERT
AS
BEGIN
INSERT INTO empstatus VALUES('active')
END
```
