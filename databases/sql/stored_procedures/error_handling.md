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
#### Transaction count after EXECUTE indicates a mismatching number of BEGIN and COMMIT statements (266)
When you exit a stored procedure, and @@trancaount has a different value from when the procedure started executing, SQL Server will raise this error. However, it may also appear as a consequence of other errors i.e. noise on the wire. In this situation, preferably to filter out error 266 as long as there are other errors.

### Example
```sql
ALTER PROCEDURE [dbo].[update_user_settings]
@delim VARCHAR(5),
@username VARCHAR(50),
@del_did VARCHAR(255),
@del_step VARCHAR(MAX),
@add_oid VARCHAR(MAX),
@add_did VARCHAR(255),
@add_step VARCHAR(MAX),
@add_mask_level VARCHAR(255),
@add_trav_id VARCHAR(MAX)
AS
BEGIN
	BEGIN TRY
		-- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
		SET NOCOUNT ON;
		-- SET XACT_ABORT ON will auto rollback current transaction when run-time error occurs.
		SET XACT_ABORT ON;
 
		 -- Deleting DIDs
		DELETE FROM myassistant.dbo.user_settings WHERE
		did IN (SELECT value FROM myassistant.dbo.SPLIT_STRING(@del_did, @delim)) OR
		process_step IN (SELECT value FROM myassistant.dbo.SPLIT_STRING(@del_step, @delim));

		-- INSERT rows into table if string is not empty
		DECLARE @start_oid SMALLINT = 1
		DECLARE @end_oid SMALLINT = CASE WHEN CHARINDEX(@delim, @add_oid) > 0 THEN CHARINDEX(@delim, @add_oid) ELSE LEN(@add_oid) + 1 END
		DECLARE @oid_value BINARY(8)

		DECLARE @start_did SMALLINT = 1
		DECLARE @end_did SMALLINT = CASE WHEN CHARINDEX(@delim, @add_did) > 0 THEN CHARINDEX(@delim, @add_did) ELSE LEN(@add_did) + 1 END
		DECLARE @did_value CHAR(4)

		DECLARE @start_step SMALLINT = 1
		DECLARE @end_step SMALLINT = CASE WHEN CHARINDEX(@delim, @add_step) > 0 THEN CHARINDEX(@delim, @add_step) ELSE LEN(@add_step) + 1 END
		DECLARE @step_value VARCHAR(50)

		DECLARE @start_level SMALLINT = 1
		DECLARE @end_level SMALLINT = CASE WHEN CHARINDEX(@delim, @add_mask_level) > 0 THEN CHARINDEX(@delim, @add_mask_level) ELSE LEN(@add_mask_level) + 1 END
		DECLARE @level_value CHAR(2)

		DECLARE @start_trav SMALLINT = 1
		DECLARE @end_trav SMALLINT = CASE WHEN CHARINDEX(@delim, @add_trav_id) > 0 THEN CHARINDEX(@delim, @add_trav_id) ELSE LEN(@add_trav_id) + 1 END
		DECLARE @trav_value CHAR(10)

		-- For getting loop count
		DECLARE @counter SMALLINT = LEN(@add_did) - LEN(REPLACE(@add_did, @delim, '')) + 1

		--Adding entries to user settings
		WHILE @counter > 0 BEGIN
			SET @oid_value = CONVERT(BINARY(8), SUBSTRING(@add_oid, @start_oid, @end_oid - @start_oid))
			SET @did_value = SUBSTRING(@add_did, @start_did, @end_did - @start_did)
			SET @step_value = SUBSTRING(@add_step, @start_step, @end_step - @start_step)
			SET @level_value = SUBSTRING(@add_mask_level, @start_level, @end_level - @start_level)
			SET @trav_value = SUBSTRING(@add_trav_id, @start_trav, @end_trav - @start_trav)
			INSERT INTO dbo.user_settings (user_settings_OID, username, did, process_step, mask_level, trav_id) VALUES (
			@oid_value,
			@username,
			@did_value,
			@step_value,
			@level_value,
			@trav_value
			)
			SET @start_oid = @end_oid + 1
			SET @start_did = @end_did + 1
			SET @start_step = @end_step + 1
			SET @start_level = @end_level + 1
			SET @start_trav = @end_trav + 1

			SET @end_oid = CASE WHEN CHARINDEX(@delim, @add_oid, @start_oid) > 0 THEN CHARINDEX(@delim, @add_oid, @start_oid) ELSE LEN(@add_oid) + 1 END
			SET @end_did = CASE WHEN CHARINDEX(@delim, @add_did, @start_did) > 0 THEN CHARINDEX(@delim, @add_did, @start_did) ELSE LEN(@add_did) + 1 END
			SET @end_step = CASE WHEN CHARINDEX(@delim, @add_step, @start_step) > 0 THEN CHARINDEX(@delim, @add_step, @start_step) ELSE LEN(@add_step) + 1 END
			SET @end_level = CASE WHEN CHARINDEX(@delim, @add_mask_level, @start_level) > 0 THEN CHARINDEX(@delim, @add_mask_level, @start_level) ELSE LEN(@add_mask_level) + 1 END
			SET @end_trav = CASE WHEN CHARINDEX(@delim, @add_trav_id, @start_trav) > 0 THEN CHARINDEX(@delim, @add_trav_id, @start_trav) ELSE LEN(@add_trav_id) + 1 END

			SET @counter = @counter - 1
		END
	END TRY
	BEGIN CATCH
		DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
		DECLARE @ErrorNumber INT = ERROR_NUMBER();
		DECLARE @ErrorSeverity SMALLINT = ERROR_SEVERITY();
		DECLARE @ErrorProcedure VARCHAR(55) = ERROR_PROCEDURE();
		DECLARE @ErrorLine INT = ERROR_LINE();
		DECLARE @ErrorState INT = ERROR_STATE();

		SELECT  
		@ErrorNumber AS ErrorNumber,
		@ErrorSeverity AS ErrorSeverity,
		@ErrorProcedure AS ErrorProcedure,
		@ErrorLine AS ErrorLine,
		@ErrorMessage AS ErrorMessage;

		IF (XACT_STATE()) = -1 BEGIN
			ROLLBACK TRANSACTION
		END

		-- rollback transaction in CATCH block to not commit statements that ran prior to error
		IF (XACT_STATE()) = 1 BEGIN
			ROLLBACK TRANSACTION
		END

		RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
	END CATCH
END
```
