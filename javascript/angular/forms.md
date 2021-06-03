## Approaches:
1) Template-Driven: Angular infers the form object from DOM.
2) Reactive: Form is created programmatically and synchronized with the DOM.

## Template-Driven:
```javascript
// component.ts:
onSubmit(form: NgForm) {console.log('submitted!')}

defaultQues = "What is your first pet?"; 

// html:
<form #Secret="ngForm" (ngSubmit)="onSubmit(Secret)">   // alias used to get access to form
<input type="email" id="email" class="form-control" [ngModel]="defaultQues" name="email" required email #email="ngModel">  // input is registered to "name"
<span class="help-block" *ngIf="!email.valid && email.touched"Please enter a valid email </span>
```
```javascript
// Using ViewChild
// component.ts:

export class AppComponent {
  @ViewChild('Secret') signupForm: NgForm;
  
  onSubmit() {console.log(this.signupForm};}
}
```
