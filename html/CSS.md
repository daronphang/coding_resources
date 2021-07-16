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
### Styling Methods:
```
# External
<head>
  <link rel="stylesheet" type="text/css" href=mysitestyle.css">
</head>

# Internal
<head>
  <style>
    body {background-color: powderblue;}
    h1   {color: blue;}
    p    {color: red;}
  </style>
</head>

# Inline
<h1 style="color:blue;">A Blue Heading</h1>

<p style="color:red;">A red paragraph.</p>
```
## Styling:
```
position: "relative";
top: 50%";                  Use position property to change top property.
z-index: 50;                Positive stacks in front, negative stacks behind. Changes transparency/

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
```
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
```
min-width: 55em;                    Prevent container size from resizing when user resizes window
overflow: hidden;                   Prevent inner content from overflowing the wrapping container outline

transform: rotate(20deg);
transform: skewY(20deg);
transform: scaleY(1.5);
```


## Styles:
```
Visibility: Hidden          Not visible but takes up original space
Display: None               Hidden and takes no space

top:                        Used together with position, no effect on surrounding elements
position: relative        

margin-top: 10em            Move block of element away from other elements
```
