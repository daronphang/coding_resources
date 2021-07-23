## VIEW:
Database object of a stored query i.e. virtual table.
```
CREATE VIEW view_name AS SELECT col1,col2 FROM table 

# To view virtual table
SELECT * FROM view_name

# To edit
CREATE OR REPLACE VIEW view_name AS ...

# To rename
ALTER VIEW view_name RENAME TO info_table

# To delete
DROP VIEW IF EXISTS view_name
```
