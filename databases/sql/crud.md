## Datatable Types:
```
Boolean
Character               # CHAR, VARCHAR, TEXT
Numeric                 # INTEGER, FLOAT, SMALLINT
Temporal                # DATE, TIME, TIMESTAMP, INTERVAL
UUID                    # Universally Unique Identifiers
Array
JSON
Hstore key-value pair
```
## Primary and Foreign Keys:
Primary key is a column or gorup of columns used to identify a row uniquely in a table. A table can have multiple primary keys, and each table SHOULD have a primary key to uniquely identify a row for CRUD. Foreign key is a field or group of fields in a table that uniquely identifies a row in another table; references to the primary key of the other table i.e. FK in child table, PK in parent table. A table can have multiple FK depending on its relationship with other tables.

## Constraints:
Rules enforced on data columns in a table. Used to prevent invalid data from being entered into the database and hence, ensuring accuracy and reliability.
Commonly used in PK and FK. Constraints can be for column or table.

To view constraints in table, execute the following in query.
```sql
SHOW CREATE TABLE table1
```

```sql
NOT NULL
UNIQUE          Combination of unique columns UNIQUE(col1, col2, col3)
CHECK           Value must satisfy Boolean
REFERENCES      Used for indicating foreign key
PRIMARY KEY     Multiple columns can be PK. Same as UNIQUE NOT NULL

CREATE TABLE example(a INTEGER, b INTEGER, c INTEGER, PRIMARY KEY(a,c))
```
## Creating Tables:
```sql
USE stock_app;
CREATE TABLE user_portfolios (
id SERIAL,
userId CHAR(36) NOT NULL,
portfolioName VARCHAR(36) NOT NULL,
orderId TINYINT NOT NULL,
createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
PRIMARY KEY (id, portfolioName),
UNIQUE(userId, portfolioName),
UNIQUE(userId, orderId),
FOREIGN KEY (userId) REFERENCES stock_app.users (_id)
)

# General syntax
CREATE TABLE table_name (
  col_name1 TYPE col_constraint,
  col_name2 TYPE col_constraint,
  table_constraint table_constraint)

CREATE TABLE account(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP)

CREATE TABLE account_job(
  user_id REFERENCES account(user_id),
  hire_date TIMESTAMP)

CREATE TABLE example(
  user_id SERIAL PRIMARY KEY,
  age SMALLINT CHECK(age > 21),
  parent_age SMALLINT CHECK(parent_age > age))

CREATE TABLE products(
  product_no INTEGER,
  name TEXT,
  price NUMERIC CHECK(price > 0),
  discounted_price NUMERIC,
  CHECK(discounted_price > 0 AND price > discounted_price))

```
### INSERT:
SERIAL columns do not need to be provided a value. Inserted row values must match up for the table including constraints. 
```sql
INSERT INTO account(username, passwword, create_on)
VALUES('Jose', '1234', CURRENT_TIMESTAMP),
      ('John', '1234', CURRENT_TIMESTAMP)
      
INSERT INTO table(col1,col2) SELECT col1,col2 FROM table2
```
### UPDATE:
```sql
# Use UPDATE and SET
UPDATE account SET last_login = CURRENT_TIMESTAMP WHERE username = 'Jose'
```
### RETURNING:
```sql
UPDATE account SET last_login = CURRENT_TIMESTAMP RETURNING username, last_login
```
### DELETE:
```sql
DELETE FROM table WHERE row_id = 1
```
### ALTER:
Allows for changes to an existing table structure:
- Adding/dropping/renaming columns
- Changing column's data type
- setting default values for a column
- Adding CHECK constraints

```sql
ALTER TABLE stock_app.user_portfolios ADD COLUMN tickerCount TINYINT NOT NULL AFTER portfolioName

ALTER TABLE stock_app.users 
MODIFY COLUMN createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
MODIFY COLUMN updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()

ALTER TABLE account ADD COLUMN job_role TEXT
ALTER TABLE account DROP COLUMN job CASCADE     # CASCADE removes all dependencies
ALTER TABLE account DROP COLUMN IF EXISTS col1

ALTER TABLE account ALTER COLUMN col1 VARCHAR(50) [NULL | NOT NULL]
```





