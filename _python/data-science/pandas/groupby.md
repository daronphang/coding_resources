## GroupBy (Split-Apply-Combine)

Involves some combination of splitting the object, applying a function, and combining the results. This can be used to group large amounts of data and compute operations on these groups. Essentially splits the data into different groups depending on a column of your choice. **If grouping by multiple keys, it will result in a MultiIndex Dataframe** which may not be practical if data analysis is to be performed. This can be reset by calling reset_index() or setting as_index argument to False.

Is lazy in nature i.e. doesn't do any operations to produce a useful result until you say so.
Has default sorting unless specified otherwise.

Arithmetic operations can be quickly applied to the groupby object to obtain summary statistics for each group. Output from an aggregation operation produces a Dataframe if more than one column of results is expected, else it will produce a Series.

Groupby is used in splitting process. In the apply step, you may perform aggregation, transformation or filtration.

```py
df.groupby('Sex')

grp_df = df.groupby(['Area', 'Design Id', 'Chart Type'], as_index=False)

# groupby ignores missing values by default
# to include them, set dropna parameter
subset.groupby(['Sex', 'Pclass'], dropna=False)
```

## Aggregation

```py
# performs aggregation across all columns
df.groupby('Sex').mean()

# performing aggregation on specified columns
grp_obj = df.groupby(['Area', 'Design Id', 'Chart Type'])
# need supply tuple for multiple keys
grp_obj.get_group(('DIFFUSION', 'B47R', 'CSPL'), as_index=False).dropna()\
    [['Uploaded #Samples', 'Any Violation #OOC(1)']].sum().to_string()

# alternative if column is not of type int
df.groupby(['col1', 'col2'])['col3', 'col4'].apply(lambda x: x.astype(int).sum())
```

### Agg()

Allows you to specify multiple aggregation functions at once.

For agg(), returns a dataframe instead of groupby object. If you want to output the results, remember to use reset_index().

```py
df.groupby('Sex').Age.agg(['max', 'mean', 'min', 'sum'])

# for custom column names
df.groupby('Sex').Age.agg(sex_max=('max'), sex_min=('min'))

# selecting specific columns and renaming agg functions
# selecting instanceID col, and renaming count column to 'countCol'
grouped_df = data_df.groupby('date_by_day').agg(countCol=('instanceID', 'count')).reset_index()

# custom aggregation function
def categorize(x):
    m = x.mean()
    return True if m > 29 else False

df.groupby('Sex').Age.agg(['max', 'mean', categorize])
df.groupby('Sex').Age.agg(
    ['max', 'mean', lambda x: True if x.mean() > 50 else False]
)

# agg returns dataframe
ecap_agg_overall_df = ecap_df.groupby('date_by_day').instanceID.agg(count=('count')).reset_index()
```

## Transformation

A process in which group-specific computations are performed and return a like-indexed (same length) object of that being grouped. Methods transform() and apply() are most commonly used.

```py
standardization = lambda x: (x - x.mean()) / x.std()

df.groupby('Sex').Age.transform(standardization)
df.groupby('Sex').Age.apply(standardization)
```

## Filtration

A process in which some groups are discarded based on group-wise computation that evaluates to boolean.

```py
# filter groups with less than 4 people in cabin
df.groupby('Cabin').filter(lambda x: len(x) >= 4)
```

## Methods

```python
grouped_obj = df.groupby('col1')

# get number of groups
grouped_obj.ngroups

# get groups object
# output is a dict
grouped_obj.groups

# get group sizes i.e. how many elements in each group
grouped_obj.size()

# preview groups
grouped_obj.first()
grouped_obj.last()

# retrieve one of the created groups
grouped_obj.get_group('female')
grouped_obj.get_group(['female', 'male'])
```
