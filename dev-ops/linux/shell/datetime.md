### Getting X Date from Current

```sh
CUR_DATE=$(date +%m-%d-%Y)
LAST_DATE=$(date --date="-$1 day" +%m-%d-%Y)

echo "$CUR_DATE"
echo "$LAST_DATE"
```
