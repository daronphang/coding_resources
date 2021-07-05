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

## Styles:
```
Visibility: Hidden          Not visible but takes up original space
Display: None               Hidden and takes no space

top:                        Used together with position
position: relative        

margin-top: 10em            Move block of element away from other elements
```
