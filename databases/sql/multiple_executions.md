## MySQL
Can use ON DUPLICATE KEY.

## SQL Server
### MERGE
Used to synchronize two tables by inserting, updating and deleting the target table based on condition with source table.

```sql
MERGE myassistant.dbo.automation_requests AS TARGET
USING (
SELECT
'12345ABE' AS req_id,
'instacap' AS req_type,
'DARONPHANG' AS req_user,
'submitted' AS req_status,
'oh yeah' AS req_message,
NULL AS req_completed
) AS SOURCE
ON TARGET.request_Id = SOURCE.req_id

WHEN MATCHED THEN UPDATE SET
TARGET.request_Id = SOURCE.req_id,
TARGET.request_type = SOURCE.req_type,
TARGET.username = SOURCE.req_user,
TARGET.status = SOURCE.req_status,
TARGET.message = SOURCE.req_message,
TARGET.completed_at = SOURCE.req_completed

WHEN NOT MATCHED BY TARGET THEN INSERT (
request_Id,
request_type,
username,
status,
message,
completed_at
)
VALUES (
SOURCE.req_id,
SOURCE.req_type,
SOURCE.req_user,
SOURCE.req_status,
SOURCE.req_message,
SOURCE.req_completed
);
```
