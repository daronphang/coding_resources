### Color Regions

```py
plt.fill_between(x_values, y, color="#CAFC9B")

# matplotlib auto adds padding to top/bottom/left/right
# to remove extra padding, set the limits directly
bottom, top = plt.ylim()  # get limits
plt.ylim(-0.2, top + 1)   # set limits
plt.axhspan() # fills up the whole x-axis horizontally, spanning from specified ymin to ymax
plt.axvspan() # fills up the whole y-axis vertically, spanning from specified xmin to xmax
```

### Disable Paddings

```py
plt.autoscale(enable=True, axis='y', tight=True)
```
