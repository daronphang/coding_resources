### Creating Tables Using SELECT

```sql
-- For single row, multiple columns
 SELECT
'12345ABE' AS req_id,
'instacap' AS req_type,
NULL AS req_completed
```

```sql
-- For multiple rows and columns
SELECT * FROM (
VALUES
('12345ABE', 'instacap', NULL),
('12345ABE', 'instacap', NULL)
) AS
PLACEHOLDER
(req_id, req_type, req_completed)
```

```sql
-- alternative using UNION
 SELECT
'12345ABE' AS req_id,
'instacap' AS req_type,
NULL AS req_completed
UNION ALL
(SELECT '12345ABE', 'instacap', NULL)
UNION ALL
(SELECT '12345ABE', 'instacap', NULL)
```
