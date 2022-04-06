### Pandas

Library built on top of Numpy that allows for fast analysis and data cleaning. Has built in visualization features. Can work with data from variety of sources including strings, functions, and numbers. When performing operations, integers will be converted to float.

```python
import numpy as np
import pandas as pd

list = [1,2,3]
dict = {'a': 1, 'b': 2, 'c':3}

pd.series(list)
pd.series(dict)           # takes key as index, value as data
pd.series([1,2,3],['US','CH', 'SG'])
```

### Dataframes

```python
df = pd.DataFrame(data, index, columns, dtype, copy)
df.head()
df.describe()
df = pd.read_csv()
df.values()                   # returns a numpy representation of df
df.unique()
df['col1'].count()            # returns number of non-NA elements in series
df.value_counts()             # unique combinations of columns
df.sort_values(by='col1')
df.isnull()                   # checks for any null values, returns boolean
df.pivot_table(values,index,column)
df.query()
df.stack()

# accessing columns/rows
df['col_name1', 'col_name2']
df.loc['row or col name']
df.loc['row name', 'col name']
df.iloc['index number']
df.iloc[:3]                   # or df.iloc[0,2]

# removing rows/columns
df.drop('col_name', axis=1)   # axis=0 for rows

# conditional selection
df[df>0]
df[df['col_name']>0][['row_name', 'col_name']]
df[(df['col_name']>0) & (df['col_name1'])]        # pipe operator |

# index
df.reset_index()
df.set_index()
df.index = np.arange(1, len(df) + 1)

# convert to numpy
df.to_numpy()
array = df.values

# missing values
df.dropna(axis=0)       # drops any row with NaN, axis=1 for column

# replacing missing values
df.fillna(value='some value')

# rename columns
df = df.rename(columns={'B': 'Block'})

# groupby
df.groupby(['col name', 'col name 2']).sum().loc['col name']
.getgroup[]

# merging
pd.concat([df1,df2])
pd.merge(left, right, row, on='key')

# applying functions
df.apply(function)

```

### Hacks

#### Reading Datetime

Sometimes Pandas may swap month with day and datetime sorting would not be correct. To fix, do not parse datetime directly when reading from CSV or JSON.

```py
df = pd.read_json(fname, convert_dates=False)
df['date'] = pd.to_datetime(df['date'], format='%d-%m-%Y')
```
