## START TRANSACTION, COMMIT and ROLLBACK:
MySQL runs with autocommit enabled i.e. if have 3 queries and second fails, first query will be committed. To disable autocommit, use START TRANSACTION.

## Implict Commits:
Some statements implicitly end any transaction active in current session i.e. done a commit before executing the statement, and also cause implicit commit after executing.

https://dev.mysql.com/doc/refman/8.0/en/implicit-commit.html


## Example:
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