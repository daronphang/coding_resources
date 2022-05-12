### OVER

Used in almost all invocations of window functions like AVG(), MAX(), and RANK(). Window functions operate on window frames which are sets of rows taht can be different for each record in the query result.

### PARTITION BY

Subclause of the OVER clause. Contrasting with GROUP BY, GROUP BY collapses individual records into a group and as a consequence, you cannot refer to any individual record field i.e. only the columns in the GROUP BY clause can be referenced. 

If you want to get individual records of collapsed columns, need to use window functions.

```sql
-- GROUP BY
SELECT car_make,
       AVG(car_price) AS average_price,
       MAX(car_price) AS top_price
FROM   car_list_prices
GROUP BY car_make

-- PARTITION BY
SELECT
    car_make,
    car_model,
    car_price,
    AVG(car_price) OVER() AS "overall average price",
    AVG(car_price) OVER (PARTITION BY car_type) AS "car type average price"
FROM car_list_prices
```
