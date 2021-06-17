## Animation States:
```
active => *   	Wildcard represents default/all states of the element. Change from active to anything else
(void)        	State when element is created but not yet part of DOM, or when element is removed
custom        	Custom names to indicate a certain state of an element
:enter        	Alias for void => *, transition runs when any *ngIf or *ngFor is placed on view page
:leave		Alias for * => void
```
## Queries:
Can be used to target multiple elements i.e. look for elements that meet query parameters and apply animation trigger.

## Animating Children Elements:
```html
<div *ngIf=”isDisplayed” @container>
	<div @enterExitLeft></div>
	<div @enterExitRight></div>
</div>
```
```javascript
export const EnterExitLeft = [
    trigger('enterExitLeft', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateX(-200px)' }),
            animate(
                '300ms ease-in',
                style({ opacity: 1, transform: 'translateX(0)' })
            ),
    	]),
	    transition(':leave', [
            animate(
                '300ms ease-in',
                style({ opacity: 0, transform: 'translateX(-200px)' })
            ),
	    ]),
    ]),
];
export const EnterExitRight = [
    trigger('enterExitRight', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateX(200px)' }),
            animate(
                '300ms ease-in',
                style({ opacity: 1, transform: 'translateX(0)' })
            ),
        ]),
        transition(':leave', [
            animate(
                '300ms ease-in',
                style({ opacity: 0, transform: 'translateX(200px)' })
	        ),
        ]),
	]),
];

// parent animation:
export const Container = [
	trigger('container', [
		transition(':enter, :leave', [
			query('@*', animateChild()),  
		]),
	]),
];
```

## Route Animations:
Applied to view transitions during a route change.
```html
<!--  app-route.module.ts or modules with routing: -->
<div [@routeAnimation]="prepareRoute(outlet)">
	<router-outlet #outlet="outlet"></router-outlet>
</div>
```
