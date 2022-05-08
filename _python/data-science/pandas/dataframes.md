### Dataframe Methods

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

# printing dataframe
df.to_string()

```

## Iterating DataFrames

If you need to perform some processing on each row element, you will need to iterate over rows in the Dataframe. However, iteration in Pandas is an anti-pattern and is something you should only do if you have exhausted all options, if dataset is small, or if performance is not an issue. It can be avoided using a vectorized solution which can be performed using built-in methods or Numpy functions.

### to_numpy()

```py
for item in df.to_numpy():
    print(item[0], item[1], item[2])
```

### apply()

```py
df['species'] = df.apply(lambda row: species_labels[row['species']], axis=1)
```

### map()

```py
species_labels = {'setosa': 0, 'versicolor': 1, 'virginica': 2}

df['species'] = df['species'].map(species_labels)
```

### itertuples() and iterrows()

The iterrows() method does not preserve the datatype across the rows as each row is returned as a series, and data type is inferred differently. To preserve the data types, use itertuples() instead. Iterator returns a copy of the object and hence, performing modifications does not affect the original object.

```py
for idx, row in df.iterrows():
    print(row, '\n')

df.itertuples(index=True, name='Pandas')
```

### iloc() and loc()

Acessing the row elements directly.
