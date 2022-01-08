### Animation States

```
active => *   	Wildcard represents default/all states of the element. Change from active to anything else
(void)        	State when element is created but not yet part of DOM, or when element is removed
custom        	Custom names to indicate a certain state of an element
:enter        	Alias for void => *, transition runs when any *ngIf or *ngFor is placed on view page
:leave		      Alias for * => void
```

### Queries

Can be used to target multiple elements i.e. look for elements that meet query parameters and apply animation trigger. Queries will execute in order.

```
query(<html tags or classes>)
query(':enter')				For newly inserted elements
query(':leave')				For removed elements
query(':animating')			For all currently animating elements
query(':@triggerName')			For elements that contain animation trigger
query('@*')				For all elements that contain an animation trigger
query(':self')
```

### Animating Children Elements

```html
<div *ngIf="”isDisplayed”" @container>
  <div @enterExitLeft></div>
  <div @enterExitRight></div>
</div>
```

```javascript
export const EnterExitLeft = [
  trigger("enterExitLeft", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateX(-200px)" }),
      animate(
        "300ms ease-in",
        style({ opacity: 1, transform: "translateX(0)" })
      ),
    ]),
    transition(":leave", [
      animate(
        "300ms ease-in",
        style({ opacity: 0, transform: "translateX(-200px)" })
      ),
    ]),
  ]),
];
export const EnterExitRight = [
  trigger("enterExitRight", [
    transition(":enter", [
      style({ opacity: 0, transform: "translateX(200px)" }),
      animate(
        "300ms ease-in",
        style({ opacity: 1, transform: "translateX(0)" })
      ),
    ]),
    transition(":leave", [
      animate(
        "300ms ease-in",
        style({ opacity: 0, transform: "translateX(200px)" })
      ),
    ]),
  ]),
];

// parent animation:
export const Container = [
  trigger("container", [
    transition(":enter, :leave", [query("@*", animateChild())]),
  ]),
];
```

### Route Animations

Applied to view transitions during a route change.

```html
<!--  app-route.module.ts or modules with routing: -->
<div [@routeAnimation]="prepareRoute(outlet)">
  <router-outlet #outlet="outlet"></router-outlet>
</div>
```

```css
router-outlet ~ * {
  position: absolute; /* to ensure the child components of router overlay one another*/
  height: 100%;
  width: 100%;
}
```

### Multiple Animations

```javascript
// animation-specific route:
{ path: 'home', component: HomeComponent, data: {animationState: 'One'} }
```

```javascript
prepareRoute(outlet: RouterOutlet) {
    return (
        outlet?.activatedRouteData &&
        outlet.activatedRouteData['animationState']
	);
}
```

```javascript
trigger("routeAnimation", [
  transition("home => post", []),
  transition("post => home", []),
]);
```

```javascript
// animation.ts
transition("Three => Two, Two => One", [
  style({ position: "relative" }),
  query(":enter, :leave", [
    style({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
    }),
  ]),
  query(":enter", [style({ left: "-100%", opacity: 0 })]),
  query(":leave", animateChild()),
  group([
    query(":leave", [
      animate("1s ease-out", style({ left: "100%", opacity: 0 })),
    ]),
    query(":enter", [
      animate("1s ease-out", style({ left: "0%", opacity: 1 })),
    ]),
  ]),
  query(":enter", animateChild()),
]);
```

### Disabling Animation

```html
<div [@.disabled]="isDisabled">
  <p [@someAnimation]>Some element</p>
</div>
```

```javascript
// disabling all animations, place in topmost of component
export class AppComponent {
  @HostBinding('@.disabled')
}
```

### Animation Callbacks

Trigger() emits callbacks when it starts and finishes.

```html
<div
  [@openClose]="isOpen ? 'open' : 'closed'"
  (@openClose.start)="onAnimationEvent($event)"
  (@openClose.done)="onAnimationEvent($event)"
  class="open-close-container"
></div>
```

### Animation with HostBinding

Attaching animation to HTML element of a component itself instead of an element in the component's template.

```javascript
import { Component, HostBinding } from '@angular/core';

@Component({
...
})
export class ExampleComponent {
  @HostBinding('@animateArc') get arcAnimation() {
    return this.arc;
  }
}
```
