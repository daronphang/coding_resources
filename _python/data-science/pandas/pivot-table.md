### Pivot Table

A pivot table is used to summarize, sort, reorganize, group, count, total or average data stored in a table. Allows us to transform columns into rows and vice versa. Also allows grouping by any column, and using advanced calculations on them.

Creates a spreadsheet-style pivot table as a Dataframe. When pivoting, automatically averages the data. To perform other aggregate functions, simply have to specify in "aggfunc" argument. Aggregration functions only apply to the columns specified in "values" argument.

To further segregate the values aggregated, you can specify "columns" argument.

```py
# index is the feature to group your data
pd.pivot_table(df,index=["Name","Rep","Manager"])

# explicitly defining the columns
pd.pivot_table(df,index=["Manager","Rep"],values=["Price"])

```

### Aggfunc

Can specify an aggregate function, a list of functions, or a dictionary specifying the aggregate functions to be performed for individual columns.

```py
# aggfunc can take in a list of functions
pd.pivot_table(df,index=["Manager","Rep"],values=["Price"],aggfunc=np.sum)

pd.pivot_table(df,index=["Manager","Rep"],values=["Price"],aggfunc=[np.mean,len])

pd.pivot_table(
    df,
    index=["Manager","Status"],columns=["Product"],
    values=["Quantity","Price"],
    aggfunc={"Quantity":len,"Price":np.sum},
    fill_value=0
)
```
