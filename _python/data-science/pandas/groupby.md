### GroupBy

### Aggregation

```py
grp_df = df.groupby(['Area', 'Design Id', 'Chart Type', 'WW', 'Fab'])
# need supply tuple for multiple keys
grp_df.get_group(('DIFFUSION', 'B47R', 'CSPL', '2022-16', 'F10W')).dropna()[['Uploaded #Samples', 'Any Violation #OOC(1)']].sum().to_string()

# alternative if column is not of type int
df.groupby(['col1', 'col2'])['col3', 'col4'].apply(lambda x: x.astype(int).sum())
```
