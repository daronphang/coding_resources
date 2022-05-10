### Plotting

When creating subplots, it returns two variables fig (figure) and ax (axes) as tuple:

- Fig can be considered as the frame of the plot
- Fig can be resized and reshaped, but it cannot be drawn on.
- Each fig can have multiple subplots, which is synonymous with axes.
- Axes is the canvas that you can draw on and add axis.
- An axes object can only belong to one figure.
- Axes object can be decoupled as a tuple for multiple subplots.

```py
fig = plt.figure()
ax = fig.add_subplot()

# creates a subplot 111 implicitly

fig, ax = plt.subplots()
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 5))
```

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
