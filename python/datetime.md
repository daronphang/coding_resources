### Datetime

```python
import datetime

today = datetime.datetime.now()             # same as datetime.datetime.today()
today_utc = datetime.datetime.utcnow()

date = datetime.date.today()
time = datetime.datetime.now().time()

two_years = today + datetime.timedelta(days=730)

print(today.strftime('%A %x %X %z'))      # look at documentation

```

### Timezone

When working with timezones, convert local time (naive) to UTC and work with UTC (aware). Only convert back to lcoal for end-user. Naive has no .tzinfo. to make datetime object aware, need to use pytz library.

```python
import pytz
import datetime

all_tz = pytz.all_timezones

d = datetime.datetime.now()
timezone_d = pytz.timezone('Asia/Singapore')   # instantiate tz object
d_aware = timezone_d.localize(d)
print(d_aware.tzinfo)

```
