## Animations:
Consists of two components, a style describing the CSS animation and a set of keyframes that indicate the start and end states. When specifying CSS styles inside @keyframes, animation will gradually change from current style to new style at certain times.

```css
/*CSS properties*/
transform-origin: -100% 50%;
transform: rotate(45deg);
transform: translate(100px, 200px);
transform: translateX(-50px)

transform: scaleX(1)
transform-origin: 0% 50%;           Default is set at center
```

```css
/*animation properties*/
animation-name                      Name of keyframes
animation-duration                  Duration for animation to complete one cycle
animation-timing-function           Establishes preset acceleration curves such as ease-in-out, linear, cubic-bezier
animation-delay                     Delay between element loaded and start of animation sequence
animation-iteration-count           Number of times animation should repeat, can specify infinite
animation-direction                 Sets the direction after cycle; default resets on each cycle; normal, alternate
animation-fill-mode                 Sets styles to its target before/after its execution; none, forwards, backwards, both
animation-play-state                Pause/play animation; paused, running
```

```
// need to use pseudo element to avoid applying animation to text
.activeRouterClass::after {
    border-bottom: 2px solid white;
    display: block;
    content: '';
    animation-name: activeRouter;
    animation-duration: 0.5s;
  }

  @keyframes activeRouter {
      0% {
          transform: scaleX(0);
          border-bottom: 0px;
        }
      100% {
          transform: scaleX(1);
          border-bottom: 2px solid white;
        }
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
