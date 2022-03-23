### CSS

Stands for Cascading Style Sheets that specify document's style i.e. page layouts, colors, and fonts. Consists of selector and declaration. The selector p specifies which html element the CSS styling will effect; text-align is the declaration that contains properties and values applied to the selector.

```css
p {
  color: red;
  text-align: center;
}
```

### Units

#### Absolute Length

```
cm, mm, in, px
```

#### Relative Length

```
rem     Relative to font-size of browser base font size and does not inherit from parent element
vw      Relative to 1% of width of viewport; scales with sizing
vh      Relative to 1% of height of viewport
%       Relative to parent element
```

### Display

To style an element with a width an height, need to set display to "block".

```
inline          Default like <span>
block           Block elements like <div> or <p>; Able to set wiwdth and height
inline-block    Shows an element as an inline-level block container
box-sizing      Displays browser-sizing properties
```

### Flex

Method used for space distribution between items in an interface with powerful alignment capabilities.

```css
.container {
    display: flex;
    flex-direction: column/row;
    align-items: flex-start;      Default is flex-stretch
    justify-content: center;      flex-start, flex-end, space-around, space-between, space-evenly
    flex-wrap: nowrap;

    flex: 1 1 auto;               Grow, shrink, basis
    flex-basis: auto;             Sets initial main size of flex item, else content size
    flex-grow: 1;                 Cause items to stretch and take up any available space
    flex-shrink: -1;              If postiive, can become smaller than flex-basis if insufficient space
}
```

### Horizontal/Vertical Alignment

```css
.horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
  align-left: auto;
  align-right: auto;
  text-align: center;
}

.vertical {
  line-height: 10px;
  align-top: auto;
  align-bottom: auto;
}

.right {
  float: right;
}
```
