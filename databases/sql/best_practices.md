## Avoid Storing Delimited Lists

Violates First Normal Form. Exception would be employing denormalization. If tables are normalized, to avoid storing entries in column as delimited lists for following reasons:

- Can't ensure each value is right data type i.e. 1,2,3,banana,5.
- Can't use FK to link values to lookup table and unable to enforce referential integrity.
- Can't enforce uniqueness and consistency i.e. 1,3,3,5.
- Can't delete a value from list without fetching the whole list.
- Can't store a list longer than the specified length of string column.
- Difficult to search for all entities with a given value in list with inefficient table-scan.
- Difficult to count elements in list or perform aggregate functions.
- Difficult to fetch list in sorted order.

https://stackoverflow.com/questions/3653462/is-storing-a-delimited-list-in-a-database-column-really-that-bad

## Updating Number Field

Include subquery in SET clause for UPDATE.

```sql
UPDATE table1 SET quota = (SELECT quota - 2 FROM table1 WHERE id = 5) WHERE id = 5
```
