## Approaches:
1) Template-Driven: Angular infers the form object from DOM.
2) Reactive: Form is created programmatically and synchronized with the DOM.

## Template-Driven:
```javascript
// component.ts:
onSubmit(form: NgForm) {console.log('submitted!')}

defaultQues = "What is your first pet?"; 
genders = ['male', 'female'];

// html:
<form #Secret="ngForm" (ngSubmit)="onSubmit(Secret)">   // alias used to get access to form
<div id="user-data" ngModelGroup="userData">    // ngModelGroup is to group data
<input type="email" id="email" class="form-control" [ngModel]="defaultQues" name="email" required email #email="ngModel">  // input is registered to "name"
<span class="help-block" *ngIf="!email.valid && email.touched"Please enter a valid email </span>
<div class="radio" *ngFor="let gender of genders">
  <label>
    <input type="radio" name="gender" ngModel [value]="gender" {{ gender }}>
```
```javascript
// Using ViewChild
// component.ts:

export class AppComponent {
  @ViewChild('Secret') signupForm: NgForm;
  
  onSubmit() {console.log(this.signupForm};}
}
```
### Setting Default Values:
```javascript
export class AppComponent {
  @ViewChild('Secret') signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'superuser';
    this.signupForm.form.patchValue({
      userData: {username: suggestedName}   // userData is alias for ngModelGroup, username is id from input
    });
  }
  
<button class='btn btn-primary' type='button' (click)="suggestUserName()">Suggest a name</button>
```
