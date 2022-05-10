## Dataframe Methods

### Basics

```py
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
df = df.rename(columns={'B': 'Block'})

df.to_string()
```

### Dealing with Missing Values

```py
df.dropna(axis=0)       # drops any row with NaN, axis=1 for column
df.fillna(value='some value')
```

### Resetting Index

```py
df.reset_index()
df.set_index()
df.index = np.arange(1, len(df) + 1)
```

### Accessing Rows/Columns

Use iloc for index, and loc for column name.

```py
df['col_name1', 'col_name2']
df.loc['row or col name']
df.loc['row name', 'col name']
df.iloc['index number']
df.iloc[:3]                         # or df.iloc[0,2], access by index
```

### Deleting Rows/Columns

```py
df.drop('col_name', axis=1)   # axis=0 for rows
```

### Filtering Rows/Columns

```py
# for OR, use pipe operator |
df[df>0]
df[df['col_name']>0][['row_name', 'col_name']]
df[(df['col_name']>0) & (df['col_name1'])]
```

### Mask

Method is an application of the if-then idiom i.e. replaces values where the condition is True. Returns an object of the same shape as self.

```py
s = pd.Series(range(5))
s.where(s > 0)
s.mask(s > 0)   # replaces all values with NaN
s.mask(s > 0, 1)
```

### Tilde Operator (Bitwise Negation)

Takes the binary number and flips all bits 0 to 1 and 1 to 0 to obtain the complement binary number. Negates the boolean value returned i.e. True to False and vice versa.

```py
# to access all rows where user doesn't contain A
df = df[~df['User'].str.contains('A')]
```

## Adding to DataFrames

Instead of creating an empty DataFrame and filling it later, should accumulate the data in a list first followed by initializing a DataFrame once ready. Iteratively appending rows to a DataFrame can be more computationally expensive than a single concatenate. Lists also take up less memory and are a lighter data structure as compared to DataFrames.

```py
data = []
for row in some_function_that_yields_data():
    data.append(row)

df = pd.DataFrame(data)
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
