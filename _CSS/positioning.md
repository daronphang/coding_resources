### Static

Position an element based on its current position in the flow. Top, right, bottom, left and z-index properties do not apply. This is the default for every single page element. 

### Relative

Position an element based on its current position without changing layout around it. Takes up the original space and hence, leaves a gap where it would have been without additional positioning. Has ability to use z-index; even if it is not used, the element will appear on top of any other statically positioned element. 

### Absolute

Position an element based on its closest positioned ancestor/parent position. **Does not take up space as elements are removed from the flow of elements on the page**. If there is no parent, it will position based on <html> element i.e. relative to the page itself. 
  
```html
<div class=”parent”>
 <div class=”box” id=”one”>One</div>
 <div class=”box” id=”two”>Two</div>
 <div class=”box” id=”three”>Three</div>
 <div class=”box” id=”four”>Four</div>
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
