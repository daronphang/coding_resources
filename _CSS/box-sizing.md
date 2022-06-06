## Box-Sizing

Without CSS box-sizing property, the actual width and height of a box element often appears larger than you have set as both will include the size of padding and border. With box-sizing, you can include padding and border in the element's total width and height.

```
box-sizing: border-box;     Includes both padding and border in the width and height
box-sizing: content-box;    Width and height are applied to content box only by default i.e. border/padding will increase the actual size 
box-sizing: padding-box;

box-sizing: inherit;
box-sizing: initial;
box-sizing: revert;
box-sizing: revert-layer;
box-sizing: unset;
```

### Reset

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

