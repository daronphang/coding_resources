### CSS
Stands for Cascading Style Sheets that specify document's style i.e. page layouts, colors, and fonts. Consists of selector and declaration.
```
p {
    color: red;
    text-align: center;
  }
  
# p is the selector that specifies which html element the CSS styling will effect
# text-align is the declaration that contains properties and values applied to the selector
```

### Units
```
// Absolute length:
cm, mm, in, px

// Relative length:
rem     Relative to font-size of browser base font size and does not inherit from parent element
vw      Relative to 1% of width of viewport; scales with sizing.
vh      Relative to 1% of height of viewport.
%       Relative to parent element.
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
    align-items: flex-start;            Default is flex-stretch
    justify-content: center;            flex-start, flex-end, space-around, space-between, space-evenly
    flex-wrap: nowrap;
    
    flex: 1 1 auto;                     Grow, shrink, basis
    flex-basis: auto;                   Sets initial main size of flex item, else content size
    flex-grow: -1/1                     Cause items to stretch and take up any available space 
    flex-shrink: -1/1                   If postiive, can become smaller than flex-basis if insufficient space  
}

.break {
    height: 70px;  
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


### CSS Tricks
```css
min-width: 55em;                    Prevent container size from resizing when user resizes window
overflow: hidden;                   Prevent inner content from overflowing the wrapping container outline
z-index: 50;                        Positive stacks in front, negative stacks behind (changes transparency)

top: 50px;                          Used together with position, no effect on surrounding elements
position: relative;

Visibility: Hidden                  Not visible but takes up original space
Display: None                       Hidden and takes no space; can also set inline, block, inline-block

word-wrap: break-word;              Text wrapping

writing-mode: vertical-rl;          Changing orientation 

resize: both|horizontal|vertical;   Defines if and how an element is resizable

overflow: scroll|hidden|visible;    Specifies what should happen if content overflows an element box

scroll-behavior: smooth;

white-space: pre;                   Allows inline spacing

overflow: hidden;                   Overflow text represented by ellipsis
white-space: nowrap;
width: 100%;
text-overflow: ellipsis;

display: -webkit-box;               For modern browsers spanning over multiple lines
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;

cursor: pointer;                    Change cursor to hand upon hover

box-sizing: border-box;             Sets total width and height that to account for border/padding

html {                              Offset for anchor tag if have fixed navbar
    scroll-padding-top: 70px;
}

filter: blur(5px);                  Applies graphical effects to an element to adjust rendering of images/borders
```

### Pseudo Elements
Allows you to insert content on the page without writing HTML for it i.e. not an actual DOM element. Inline by default. Cannot use an image in pseudo elements. 
To style specified parts of an element. Used with :: as contrast with pseudo-classes (single :). Useful cases include icons, borders, arrows and quotes.

Pseudo classes such as :before and :after WILL NOT WORK in html input element. To work, encapsulate the input element with a div container and adding css class to div.

```css
p::first-line {             
  color: #ff0000;
  font-variant: small-caps;
}

P::before {
    content: '';
    background-color: red;
    display: block;
}

P::after {
    content: '';
    background-color: red;
    display: block;
}
```
