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
