### Retrieve IP Address and Port
```sql
SELECT DISTINCT local_net_address, local_tcp_port
FROM sys.dm_exec_connections 
WHERE local_net_address IS NOT NULL 
```
