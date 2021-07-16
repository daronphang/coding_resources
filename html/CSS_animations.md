## Animations:
Consists of two components, a style describing the CSS animation and a set of keyframes that indicate the start and end states.
When specifying CSS styles inside @keyframes, animation will gradually change from current style to new style at certain times.

```
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}

div {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
}
```
