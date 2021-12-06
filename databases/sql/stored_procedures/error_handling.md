## MySQL
### START TRANSACTION, COMMIT and ROLLBACK
MySQL runs with autocommit enabled i.e. if have 3 queries and second fails, first query will be committed. To disable autocommit, use START TRANSACTION.

### Implict Commits
Some statements implicitly end any transaction active in current session i.e. done a commit before executing the statement, and also cause implicit commit after executing.

https://dev.mysql.com/doc/refman/8.0/en/implicit-commit.html


### Example
```sql
CREATE PROCEDURE `reorderPortfolio1`(
IN delimiter VARCHAR(10),
IN user_id CHAR(36),
IN order_id_list VARCHAR(1000),
IN portfolio_name_list VARCHAR(1000)
)
BEGIN
DECLARE count INT DEFAULT 1;
DECLARE delimiterCount INT;

DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
    ROLLBACK;
    RESIGNAL;
END;

DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
    ROLLBACK;
    RESIGNAL;
END;

START TRANSACTION;
	/*Get delimiter count, number of times to loop*/
	SET delimiterCount = LENGTH(order_id_list) - LENGTH(REPLACE(order_id_list, delimiter, '')) + 1;

	/*Update orderId in user_portfolio table*/
	WHILE delimiterCount > 0 DO
		SET @order_id = CONVERT(SPLIT_STR(order_id_list, delimiter, count), CHAR(200));
		SET @portfolio_name = CONVERT(SPLIT_STR(portfolio_name_list, delimiter, count), CHAR(200));
		UPDATE user_portfolios SET orderId = @order_id WHERE userId = user_id AND portfolioName = @portfolio_name;
		SET delimiterCount = delimiterCount - 1;
		SET count = count + 1;
	END WHILE;
    SELECT test123 FROM user_portfolios;
	ALTER TABLE user_portfolios DROP INDEX userId_2;
COMMIT;
END
```

## SQL Server
https://www.sommarskog.se/error_handling/Part2.html#classification

### TRANCOUNT
 @@ in SQL Server denotes global variables. @@TRANCOUNT function records the current transaction nesting level, and counts system and user-defined transactions i.e. BEGIN TRANSACTION. If ROLLBACK does not have transaction name, it will rollback all nested transactions and decrements @@TRANCOUNT to 0. To check if you are already in a transaction, check if @@TRANCOUNT is 1 or more. 

```
BEGIN TRANSACTION		@@TRANCOUNT increments by 1
COMMIT TRANSACTION		@@TRANCOUNT decrements by 1
COMMIT WORK			@@TRANCOUNT decrements by 1
ROLLBACK WORK			@@TRANCOUNT decrements to 0 (not in transaction)
ROLLBACK TRANSACTION		@@TRANCOUNT decrements by 0 (not in transaction)
ROLLBACK <TRANSACTION NAME>	
```

### XACT_STATE
Function that reports the user transaction state of current running request. SET XACT_ABORT ON will auto rollback the entire transaction and abort batch (cause transaction to be doomed) when a run-time error occurs that leaves transaction open i.e. constraint error, command timeout. 
```
1	Current request has active user transaction and capable of committing 
0	No active user transaction for current request (commit/rollback operation would generate error)
-1	Current request has active user transaction but an error has occurred (uncommittable)
```

### TRY CATCH
Catches all execution errors that have severity higher than 10 that do not close the database connection. If there are no errors enclosed in TRY block, control passes to statement immediately after END CATCH after executing last statement in TRY block. If END CATCH statement is last statement in stored procedure/trigger, control is passed back to the statement that called the stored procedure/trigger.

When transactions are doomed in CATCH block, you cannot perform write.

#### Errors Unaffected by TRY CATCH
- Warnings or informational messages that have severity of 10 or lower.
- Errors having severity of 20 or higher that stop database connection (errors higher than 20 will terminate the connection and hence, uncatchable).
- Sessions ended by system admin using KILL statement.

Following errors are not handled by TRY CATCH when they occur at same level of execution as TRY CATCH; these errors are returned to the level that ran the batch/stored procedure/trigger:
- Compile errors such as syntax errors that prevents a batch from running.
- Object name resolution errors.

https://docs.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver15

```sql
BEGIN TRY  
    -- Table does not exist; object name resolution  
    -- error not caught.  
    SELECT * FROM NonexistentTable;  
END TRY  
BEGIN CATCH  
    SELECT   
        ERROR_NUMBER() AS ErrorNumber  
       ,ERROR_MESSAGE() AS ErrorMessage;  
END CATCH  
```
```sql
-- Verify that the stored procedure does not exist.  
IF OBJECT_ID ( N'usp_ExampleProc', N'P' ) IS NOT NULL   
    DROP PROCEDURE usp_ExampleProc;  
GO  
  
-- Create a stored procedure that will cause an   
-- object resolution error.  
CREATE PROCEDURE usp_ExampleProc  
AS  
    SELECT * FROM NonexistentTable;  
GO  
  
BEGIN TRY  
    EXECUTE usp_ExampleProc;  
END TRY  
BEGIN CATCH  
    SELECT   
        ERROR_NUMBER() AS ErrorNumber  
        ,ERROR_MESSAGE() AS ErrorMessage;  
END CATCH;  
```

### Common Errors
#### Transaction count after EXECUTE indicates a mismatching number of BEGIN and COMMIT statements
When you exit a stored procedure, and @@trancaount has a different value from when the procedure started executing, SQL Server will raise this error.
