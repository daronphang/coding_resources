## START TRANSACTION, COMMIT and ROLLBACK:
MySQL runs with autocommit enabled i.e. if have 3 queries and second fails, first query will be committed. To disable autocommit, use START TRANSACTION.

## Implict Commits:
Some statements implicitly end any transaction active in current session i.e. done a commit before executing the statement, and also cause implicit commit after executing.

https://dev.mysql.com/doc/refman/8.0/en/implicit-commit.html
