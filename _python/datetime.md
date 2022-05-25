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

### Converting to Datetime

```py
self.start_date = datetime.fromtimestamp(payload['start_date'] / 1000).strftime('%m/%d/%Y')
self.end_date = datetime.fromtimestamp(payload['end_date'] / 1000).strftime('%m/%d/%Y')
self.delta_days = (datetime.strptime(self.end_date, "%m/%d/%Y") - datetime.strptime(self.start_date, "%m/%d/%Y")).days
```

### Date Range

```py
import pandas
date_range_dtIndex = pd.date_range(start=self.start_date, end=self.end_date)  # returns datetime Index
date_range = []

for x in date_range_dtIndex:
  date_range.append(x.strftime('%Y-%m-%d'))
```
