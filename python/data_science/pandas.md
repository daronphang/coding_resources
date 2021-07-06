## Basics:
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

## Dataframes:

```python
df = pd.DataFrame(data, index, columns, dtype, copy)

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


```
