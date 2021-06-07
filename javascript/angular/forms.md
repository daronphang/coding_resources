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
## Template:
```javascript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})

export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticating: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  response = new Subject<any>();

  private clear() {
    this.error = false;
    this.errorMessage = '';
  }

  onSubmit (form: NgForm) {
    this.clear();
    this.isAuthenticating = true;

    let email = form.value.email;
    let password = form.value.password;
    
    let response = this.authService.authenticateUser(email, password)
    response.subscribe(resData => {
      console.log(`User ${resData.email} has logged in`); 
      this.isAuthenticating = false;
      this.router.navigate(['/dashboard']);

    }, errorMsg => {
      console.log(errorMsg);
      this.isAuthenticating = false;
      this.error = true;
      this.errorMessage = errorMsg;
    });
    form.reset();
  }

  ngOnInit(): void {
  
  }
}
``` 
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
                    <form #authForm="ngForm" (ngSubmit)="onSubmit(authForm)">
                        <div class="mt-4"><input id="email" type="email" class="form-control" placeholder="Your email" ngModel name="email" required></div>
                        <div class="mt-2"><input id="password" type="password" class="form-control" placeholder="Your password" ngModel name="password" required></div>
                        <button class="btn btn-primary mt-3 mx-auto d-block" type="submit" [disabled]="!authForm.valid">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
``` 
