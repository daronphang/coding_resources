## Basics:
Stored procedure is a batch of statements that is stored in relational database management system as a group that can be reused. Can access/modify data in a database, but not tied to a specific database. Allows passing of dynamic parameters. 

```
SET           Assign a value directly SET @var = 1;
DECLARE       Initialized to NULL when stored procedure is called
```

## Passing Parameters:
- MySQL uses IN and OUT, whereas SQL Server uses @ to declare input parameters.
- Can only pass parameters to query statements and not tablename.
- Avoid name collision between parameter names and name of columns. 

```sql
CREATE PROCEDURE `deletePortfolio`(IN user_id CHAR(36), IN portfolio_name VARCHAR(255))
BEGIN
DELETE FROM user_portfolios WHERE userId = user_id AND portfolioName = portfolio_name;
END
```
```sql
CREATE PROCEDURE PRO
@ID INT
@NAME NVARCHAR
AS BEGIN
DECLARE @ADDRESS NVARCHAR 
END
```

## Dynamic SQL:
MySQL provides PREPARE, EXECUTE and DEALLOCATE PREPARE statements that can contain placeholder values. If using CONCAT, script is susceptible to SQL injection attacks.

https://dev.mysql.com/doc/refman/8.0/en/sql-prepared-statements.html

```sql
PREPARE stmt1 FROM 'SELECT SQRT(POW(?,2) + POW(?,2)) AS hypotenuse';
SET @a = 3;
SET @b = 4;
EXECUTE stmt1 USING @a, @b;
DEALLOCATE PREPARE stmt1;
```

```sql
SET @s = 'SELECT SQRT(POW(?,2) + POW(?,2)) AS hypotenuse';
PREPARE stmt2 FROM @s;
SET @a = 6;
SET @b = 8;
EXECUTE stmt2 USING @a, @b;
DEALLOCATE PREPARE stmt2;
```

```sql
CREATE PROCEDURE `deletePortfolio`(IN queryString VARCHAR(255))
BEGIN
SET @deletesql=CONCAT('DELETE FROM user_portfolios WHERE ', queryString);
PREPARE dynamic_statement FROM @deletesql;
EXECUTE dynamic_statement;
DEALLOCATE PREPARE dynamic_statement;
END
```

## Execute Stored Procedures:
SQL Server uses exec or sp_executesql for dynamic SQL.
```
CALL stored_proc_name('some variable')      Inside mysql command interpreter
cursor.callproc('proc_name', (args,))       Python
```

https://dev.mysql.com/doc/refman/8.0/en/cursors.html

## Example:
```sql
CREATE PROCEDURE curdemo()
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE a CHAR(16);
  DECLARE b, c INT;
  DECLARE cur1 CURSOR FOR SELECT id,data FROM test.t1;
  DECLARE cur2 CURSOR FOR SELECT i FROM test.t2;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur1;
  OPEN cur2;

  read_loop: LOOP
    FETCH cur1 INTO a, b;
    FETCH cur2 INTO c;
    IF done THEN
      LEAVE read_loop;
    END IF;
    IF b < c THEN
      INSERT INTO test.t3 VALUES (a,b);
    ELSE
      INSERT INTO test.t3 VALUES (a,c);
    END IF;
  END LOOP;

  CLOSE cur1;
  CLOSE cur2;
END;
```