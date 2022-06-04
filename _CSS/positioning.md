## Overview

Both absolute and fixed will not flow around the elements on page and do not take up space. For relative, takes up space but offets do not occupy space.

```
static
absolute    Position anywhere on page, relative to next parent element with relative/absolute positioning
fixed       Positioned relative to viewport/browser window i.e. for navbar
relative    Relative to itself and able to use z-index
sticky      Positioned based on user's scroll position
```

### Static

Position an element based on its current position in the flow. Top, right, bottom, left and z-index properties do not apply. This is the default for every single page element.

### Relative

Position an element based on its current position without changing layout around it. Takes up the original space and hence, leaves a gap where it would have been without additional positioning. Has ability to use z-index; even if it is not used, the element will appear on top of any other statically positioned element.

### Fixed

Element is positioned relative to the viewport or the browser window itself. Viewport doesn't change when the window is scrolled and hence, it will stay right where it is.

### Absolute

Position an element based on its closest positioned ancestor/parent position. **Does not take up space as elements are removed from the flow of elements on the page**. If there is no parent, it will position based on <html> element i.e. relative to the page itself. **For children elements to have positioning of "absolute", parent is required to have position as either "relative" or "absolute"**. Take note that when an element has position relative/absolute, it will be placed on top of any element with "static" positioning.

### Example

```html
<div class="”parent”">
  <div class="”box”" id="”one”">One</div>
  <div class="”box”" id="”two”">Two</div>
  <div class="”box”" id="”three”">Three</div>
  <div class="”box”" id="”four”">Four</div>
</div>
```

```css
.parent {
  border: 2px black dotted;
  display: inline-block;
}

.box {
  display: inline-block;
  background: red;
  width: 100px;
  height: 100px;
}

#relative {
  top: 20px;
  left: 20px;
  background: green;
  position: relative;
}
```
