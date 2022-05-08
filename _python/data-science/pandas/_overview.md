### Pandas

Library built on top of Numpy that allows for fast analysis and data cleaning. Has built in visualization features. Can work with data from variety of sources including strings, functions, and numbers. When performing operations, integers will be converted to float.

```py
import numpy as np
import pandas as pd

list = [1,2,3]
dict = {'a': 1, 'b': 2, 'c':3}

pd.series(list)
pd.series(dict)           # takes key as index, value as data
pd.series([1,2,3],['US','CH', 'SG'])
```

### Reading Datetime

Sometimes Pandas may swap month with day and datetime sorting would not be correct. To fix, do not parse datetime directly when reading from CSV or JSON.

```py
df = pd.read_json(fname, convert_dates=False)
df['date'] = pd.to_datetime(df['date'], format='%d-%m-%Y')
```
