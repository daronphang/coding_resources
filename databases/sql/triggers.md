## Triggers:
A database object which fires when an event/change occurs in a database. Two types of triggers include DDL and DML.

### DDL (Data Definition Language):
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

### DML (Data Manipulation Language):
Fires in response to DDML command events including INSERT, UPDATE and DELETE. Two types are AFTER and INSTEAD.

```sql
CREATE TRIGGER insert_trigger
ON emp
AFTER INSERT
AS
begin
INSERT INTO empstatus VALUES('active')
END
```
