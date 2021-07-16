## Animations:
Consists of two components, a style describing the CSS animation and a set of keyframes that indicate the start and end states. When specifying CSS styles inside @keyframes, animation will gradually change from current style to new style at certain times.

```
// CSS properties
transform-origin: -100% 50%;
transform: rotate(45deg);
transform: translate(100px, 200px);
transform: translateX(-50px)
```

```
// animation properties
animation-name
animation-duration
animation-timing-function
animation-delay
animation-iteration-count           Number of times animation should repeat, can specify infinite
animation-direction
animation-fill-mode                 Sets styles to its target before and after its execution; none, forwards, backwards, both
animation-play-state
```

```
// example
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

```
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  75% {
    font-size: 300%;
    margin-left: 25%;
    width: 150%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```
