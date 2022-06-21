## Approaches

1. Template-Driven: Angular infers the form object from DOM. Uses NgModel directive to create form control.
2. Reactive: Form is created programmatically and synchronized with the DOM. Uses FormControl directive.

FormBuilder provides syntactic sugar that shortens creating instances of FormControl, FormGroup or FormArray i.e. reduces boilerplate code.

### Multi-Forms

Use form arrays nested in form groups.

-   https://blog.angular-university.io/angular-form-array/
-   https://medium.com/aviabird/complete-angular2-guide-reactive-forms-in-depth-part-1-21a8e2428904

To iterate form arrays, use controls as they inherit from it.

```js
const array = this.form.get('array') as FormArray;
array.controls.findIndex();
```

### CSS Classes

```
ng-valid
ng-invalid
ng-pristine
ng-dirty            When user changes value in watched field
ng-touched          When user blurs the form control element
ng-untouched
```

### Events

```
// keystroke
(change)            Fires when input loses focus
(ngModelChange)     Used in conjuction with NGModel
(keypress)          Doesn't trigger on certain keystrokes like backspace
(keydown)           Gets element state before keystroke was registered
(keyup)             Triggers each time a key push event is completed
(input)*            Fire when both input or binding value has changed

// others
(blur)
(focus)
```

## Template-Driven Forms

```js
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
```

```html
<form #Secret="ngForm" (ngSubmit)="onSubmit(Secret)">
    <div id="user-data" ngModelGroup="userData">
        <!--ngModelGroup is to group data-->
        <input
            type="email"
            id="email"
            class="form-control"
            [ngModel]="defaultQues"
            name="email"
            required
            email
            #email="ngModel"
        />
        <!--input is registered to "name"-->
        <span class="help-block" *ngIf="!email.valid && email.touched">Please enter a valid email </span>
        <div class="radio" *ngFor="let gender of genders">
            <label> <input type="radio" name="gender" ngModel [value]="gender" {{ gender }} /></label>
        </div>
    </div>
</form>
```

```js
// Using ViewChild
// component.ts:

export class AppComponent {
  @ViewChild('Secret') signupForm: NgForm;

  onSubmit() {console.log(this.signupForm};}
}
```

### Setting Default Values

```js
export class AppComponent {
  @ViewChild('Secret') signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'superuser';
    this.signupForm.form.patchValue({   // .setValue() to overwrite entire form
      userData: {username: suggestedName}   // userData is alias for ngModelGroup, username is id from input
    });
  }
```

```html
<button class="btn btn-primary" type="button" (click)="suggestUserName()">Suggest a name</button>
```

## Reactive Forms

```js
export class AuthComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  credentialsForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]]
```

### Custom Form Controls

AngularForm/ReactiveForm modules come with built-in directives to bind native HTML elements like inputs, checkboxes, select text areas to a form group. these directives implement Control Value Accessor interface to work with ngModel directive i.e. responsible for writing data from model (component) to view and vice versa. Besides standard HTML elements, may want to use custom form controls like dropdowns, selection boxes, toggle buttons, sliders, etc. To have ability to configure them as form fields using built-in directives like ngModel, formControl, formControlName, need to implement CVA directive.

### CVA interface

-   writeValue: this method is called by the Forms module to write a value into a form control
-   registerOnChange: When a form value changes due to user input, we need to report the value back to the parent form. This is done by calling a callback, that was initially registered with the control using the registerOnChange method
-   registerOnTouched: When the user first interacts with the form control, the control is considered to have the status touched, which is useful for styling. In order to report to the parent form that the control was touched, we need to use a callback registered using the registerOnToched method
-   setDisabledState: form controls can be enabled and disabled using the Forms API. This state can be transmitted to the form control via the setDisabledState method

```javascript
@Component({
    selector: "choose-quantity",
    templateUrl: "choose-quantity.component.html",
    styleUrls: ["choose-quantity.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ChooseQuantityComponent,
        },
    ],
})
export class ChooseQuantityComponent implements ControlValueAccessor {
    quantity = 0;

    @Input()
    increment: number;

    onChange = (quantity) => {};

    onTouched = () => {};

    touched = false;

    disabled = false;

    onAdd() {
        this.markAsTouched();
        if (!this.disabled) {
            this.quantity += this.increment;
            this.onChange(this.quantity);
        }
    }

    onRemove() {
        this.markAsTouched();
        if (!this.disabled) {
            this.quantity -= this.increment;
            this.onChange(this.quantity);
        }
    }

    writeValue(quantity: number) {
        this.quantity = quantity;
    }

    registerOnChange(onChange: any) {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }
}
```

### Child Forms in Parent Form

To implement custom form control to integrate with Angular Forms, implement ControlValueAccessor. If want the integration to include validation, need to implement Validator interface and provide custom control as a multi provider to built-in NG_VALIDATOR token as validators are at top-level form (parent component).
