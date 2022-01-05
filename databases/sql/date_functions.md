### Common Date Functions

```sql
CURRENT_DATE()
CURRENT_TME()
CURRENT_TIMESTAMP()         -- Returns current date and time
AGE(timestamp)              -- Subtracts from CURRENT_DATE
AGE(timestamp, timestamp)   -- Subtracts arguments with result in years, months, days
NOW()                       -- Returns current date and time

SELECT NOW()
SELECT TIMEOFDAY()
```

### Extracting Information from Timebased Data

```sql
EXTRACT()   -- Arguments include YEAR, MONTH, DAY, WEEK, QUARTER

SELECT EXTRACT(YEAR FROM col1) FROM table
```

### Converting Data Type to Text

```sql
-- Useful for timestamp formatting
TO_CHAR()

-- Check document for template patterns for datetime formatting
SELECT TO_CHAR(col1,'mm/dd/yyyy') FROM table
```

### Inserting Date Values to SQL

Need insert string in date-time format.

```py
if kwargs['status'] == 'completed':
      completed_at = dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
else:
    completed_at = 'NULL'
```
