## CSS:
Stands for Cascading Style Sheets that specify document's style i.e. page layouts, colors, and fonts. Consists of selector and declaration.
```
p {
    color: red;
    text-align: center;
  }
  
# p is the selector that specifies which html element the CSS styling will effect
# text-align is the declaration that contains properties and values applied to the selector
```

## Units:
```
// Absolute length:
cm, mm, in, px

// Relative length:
rem     Relative to font-size of browser base font size and does not inherit from parent element
vw      Relative to 1% of width of viewport; scales with sizing.
vh      Relative to 1% of height of viewport.
%       Relative to parent element.
```

## Flex:
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

## CSS Tricks:
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
```

## Pseudo Elements:
Allows you to insert content on the page without writing HTML for it i.e. not an actual DOM element. Inline by default. Cannot use an image in pseudo elements. 
To style specified parts of an element. Used with :: as contrast with pseudo-classes (single :). Useful cases include icons, borders, arrows and quotes.
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
