### Multi-Index (Hierarchical Index)

Allows you to have multiple columns acting as a row identifier, while having each index column related to another through a parent/child relationship. In contrast, normal Dataframes have single index. This is similar to groupby function. An example would be comparing the sale of the same dish across McDonald's franchises.

Multi-level indexing means your DataFrame will have two or more dimensions that can be used to identify every row. Opens the door to sosphisticated data analysis and manipulation as it allows you to work with higher level dimensional data.

```py
# creating multi-index
# pass in a list of columns
multi = df.set_index(['Film', 'Chapter', 'Race', 'Character'])

# remove multi-index
# removes parent/child relationship
multi.reset_index()
```
