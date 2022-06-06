## CSS

Stands for Cascading Style Sheets that specify document's style i.e. page layouts, colors, and fonts. Using CSS modularizes your websites which allows for greater design consistency and easier maintenance.

Consists of selector and declaration. The selector p specifies which html element the CSS styling will effect; text-align is the declaration that contains properties and values applied to the selector.

```css
p {
  color: red;
  text-align: center;
}
```

## Benefits

### Separation of Style and Structure

Basic idea behind CSS is to separate the structure (HTML) from the presentation of the document. Moreover, it is much easier to change the styling across multiple files as compared to manually updating each of them.

### Faster webpage download time

Using CSS leads to less code which helps with the downloading of webpages. As CSS file is cached after the initial browser request, it does not need to be downloaded again for subsequent pages. 

### Greater control of presentation

CSS allows for more control over the presentation of your webpages. Also allows you to make webpages printer friendly by tweaking a few styles. 

## Downsides

### Cross-browser issues

Different browsers work differently and hence, need to check that changes implemented in the website are reflected properly across browsers.

### Security issues

CSS has limited security.


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


