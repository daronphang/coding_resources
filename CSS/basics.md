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

### Position

Both absolute and fixed will not flow around the elements on page and do not take up space. For relative, takes up space but offets do not occupy space.

```
static
absolute    Position anywhere on page, relative to next parent element with relative/absolute positioning
fixed       Positioned relative to viewport/browser window i.e. for navbar
relative    Relative to itself and able to use z-index
sticky      Positioned based on user's scroll position
```

### Display

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

### Pseudo Elements

Allows you to insert content on the page (style specific parts of an element) without writing HTML for it i.e. not an actual DOM element. Inline by default. Cannot use an image in pseudo elements. Used with :: as contrast with pseudo-classes (single :). Useful cases include icons, borders, arrows and quotes.

Pseudo classes such as :before and :after WILL NOT WORK in html input element. To work, encapsulate the input element with a div container and adding css class to div.

```css
p::first-line {
  color: #ff0000;
  font-variant: small-caps;
}

P::before {
  content: "";
  background-color: red;
  display: block;
}

P::after {
  content: "";
  background-color: red;
  display: block;
}
```
