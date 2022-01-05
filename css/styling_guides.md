### Useful CSS Styles

#### Sizing

```css
min-width: 55em;
overflow: scroll|hidden|visible;
resize: both|horizontal|vertical;
```

#### Positioning

Spacing elements top, bottom, left, right are used together with position.

```css
top: 50px;
position: relative;
```

#### Text Wrapping & Ellipsis

```css
overflow: hidden;
white-space: nowrap;
width: 100%;
text-overflow: ellipsis;

display: -webkit-box;          For modern browsers spanning over multiple lines
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;

word-wrap: break-word;              Text wrapping
writing-mode: vertical-rl;          Changing orientation
```

#### Display

```css
z-index: 50;            Positive stacks in front, negative stacks behind changes transparency
visibility: Hidden;     Not visible but takes up original space
```

#### Scrolling

```css
scroll-behavior: smooth;
scroll-padding-top: 70px;   Offset for anchor tag if have fixed navbar
```

#### Miscellaneous

```css


white-space: pre;   Allows inline spacing

cursor: pointer;    Change cursor to hand upon hover

filter: blur(5px);  Applies graphical effects to an element to adjust rendering of images/borders

box-sizing: border-box;    Sets total width and height that to account for border/padding
```
