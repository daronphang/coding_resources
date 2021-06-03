## Approaches:
1) Template-Driven: Angular infers the form object from DOM.
2) Reactive: Form is created programmatically and synchronized with the DOM.

## Template-Driven:
```javascript
// component.ts:
onSubmit(form: NgForm) {console.log('submitted!')}

// html:
<form #Secret="ngForm" (ngSubmit)="onSubmit(Secret)">   // alias used to get access to form
<input type="text" id="username" class="form-control" ngModel name="username">  // input is registered to "name"
```
