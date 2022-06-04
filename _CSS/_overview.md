## CSS

Stands for Cascading Style Sheets that specify document's style i.e. page layouts, colors, and fonts. Consists of selector and declaration. The selector p specifies which html element the CSS styling will effect; text-align is the declaration that contains properties and values applied to the selector.

```css
p {
  color: red;
  text-align: center;
}
```

## Units

### Absolute Length

```
cm, mm, in, px
```

### Relative Length

```
rem     Relative to font-size of browser base font size and does not inherit from parent element
vw      Relative to 1% of width of viewport; scales with sizing
vh      Relative to 1% of height of viewport
%       Relative to parent element
```

## Display

To style an element with a width an height, need to set display to "block".

```
inline          Default like <span>
block           Block elements like <div> or <p>; Able to set wiwdth and height
inline-block    Shows an element as an inline-level block container
box-sizing      Displays browser-sizing properties
```


