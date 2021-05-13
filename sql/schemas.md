## Schema:
Schema in SQL is a collection of database objects associated with a database including tables, views, triggers, stored procedures, indexes, etc. Schema always belongs to one
database, whereas a database may have multiple schemas. The user that owns the schema is known as schema owner. Useful mechanism to segregate database objects for different
applications, access rights, and managing the security administration of databases.

### Built-in Schemas:
```
dbo                     # default schema for newly created database
guest
sys
INFORMATION_SCHEMA
```
```
CREATE SCHEMA schema_name
    [AUTHORIZATION owner_name]
```
### Query All Schema:
```
SELECT 
    s.name AS schema_name, 
    u.name AS schema_owner
FROM 
    sys.schemas s
INNER JOIN sys.sysusers u ON u.uid = s.principal_id
ORDER BY 
    s.name;
```
