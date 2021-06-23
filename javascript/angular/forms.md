## Approaches:
1) Template-Driven: Angular infers the form object from DOM.
2) Reactive: Form is created programmatically and synchronized with the DOM.

## Template-Driven:
```javascript
// component.ts:
onSubmit(form: NgForm) {
  if (!form.valid) { return; }
  
  const email = form.value.email;
  const password = form.value.password;
  
  this.authService.signIn(email, password).subscribe(resData => console.log(resData), error => console.log(error));
  console.log('submitted!')
  form.rest();

}

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
    this.signupForm.form.patchValue({   // .setValue() to overwrite entire form
      userData: {username: suggestedName}   // userData is alias for ngModelGroup, username is id from input
    });
  }
  
<button class='btn btn-primary' type='button' (click)="suggestUserName()">Suggest a name</button>
```
## Reactive Forms:
```html
<body class="auth">
    <app-loading-spinner *ngIf="isAuthenticating"></app-loading-spinner>
    <div class="container" style="width: 800px; position: relative; top: 100px; text-align: center">
            <div *ngIf="error" class="alert alert-danger" role="alert"><h4>Login was unsuccessful. {{ errorMessage }}</h4></div>
    </div>

    <div *ngIf="!isAuthenticating" class="container">
        <div class="login">
            <div class="row">
                <div class="wrapper">
                    <h3 class="text-center">MyAssistant Login</h3>
                    <form [formGroup]="credentialsForm" (ngSubmit)="onSubmit()">
                        <div class="mt-4"><input id="username" type="text" class="form-control" placeholder="Your username" formControlName="username"></div>
                        <div class="mt-2"><input id="password" type="password" class="form-control" placeholder="Your password" formControlName="password"></div>
                        <button class="btn btn-primary mt-3 mx-auto d-block" type="submit" [disabled]="!credentialsForm.valid">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
```
```javascript
export class AuthComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  credentialsForm = this.fb.group({
    username: ['', [Validators.required]], 
    password: ['', [Validators.required, Validators.minLength(5)]]
```

## Custom Form Controls:
AngularForm/ReactiveForm modules come with built-in directives to bind native HTML elements like inputs, checkboxes, select text areas to a form group. these directives implement Control Value Accessor interface to work with ngModel directive i.e. responsible for writing data from model (component) to view and vice versa.



## Child Forms in Parent Form:
To implement custom form control to integrate with Angular Forms, implement ControlValueAccessor. If want the integration to include validation, need to implement Validator interface and provide custom control as a multi provider to built-in NG_VALIDATOR token as validators are at top-level form (parent component).

