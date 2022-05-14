## Data Types

```
Boolean                 # 0 as false, 1 as true
Character               # CHAR, VARCHAR, TEXT, BINARY
Numeric                 # INTEGER, FLOAT, SMALLINT
Temporal                # DATE, TIME, TIMESTAMP, INTERVAL
UUID                    # Universally Unique Identifiers
Array
JSON
Hstore key-value pair
```

### CHAR/VARCHAR/VARCHAR2

Stores values as a fixed-length string. For string values, space characters will be added to them to match the length.

Both VARCHAR and VARCHAR2 are used to store variable-length strings. However, if we relay empty string and NULL to be the same, should use VARCHAR2 as it treats both of them the same. For VARHCAR, it identifies NULL and empty strings separately.

In Oracle, both VARCHAR and VARCHAR2 are the same.

### Binary

Storing byte-arrays in SQL can be useful for storing large binary objects (documents, multimedia, images, etc). Can also be used to store hash values for faster searching/high-level analysis. Binary value in SQL Server is a series of bytes (byte-array). Different types include BINARY(1-8000), VARBINARY(1-8000) or VARBINARY(MAX). SQL displays binary values as hexadecimal values prefixed with "0x".

https://sqlsunday.com/2017/01/09/binary-types/

```sql
SELECT CAST('HexTest' AS VARBINARY);
SELECT CAST(0x48657854657374 AS VARCHAR);
SELECT CAST (0x48656C6C6F20776F726C6421 AS VARCHAR(MAX)) -- 'Hello World!'

-- 1 style tells SQL to treat string as hex string in text form
-- 2 style tells SQL to skip "0x"
SELECT CONVERT (BINARY(8), '0x48656C6C6F20776F726C6421', 1);  -- 0x48656C6C6F20776F726C6421
```
