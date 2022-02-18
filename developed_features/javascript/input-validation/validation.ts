import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';

export function errorMsgValHandler(field: AbstractControl) {
  if (field.invalid && (field.dirty || field.touched)) {
    return false;
  }
  return true;
}

// For input wrapper to change icon using pseudo class
export function validationClass(field: AbstractControl, type: string) {
  if (field.valid) {
    switch (type) {
      case 'INPUT':
        return 'input-is-valid';
      case 'TEXTAREA':
        return 'text-area-is-valid';
      case 'NGSELECT':
        return 'ng-select-is-valid';
      default:
        break;
    }
  }

  if (field.invalid && (field.dirty || field.touched)) {
    switch (type) {
      case 'INPUT':
        return 'input-is-invalid';
      case 'TEXTAREA':
        return 'text-area-is-invalid';
      case 'NGSELECT':
        return 'ng-select-is-invalid';
      default:
        break;
    }
  }

  if (field.invalid) {
    // For initial loading of inputs; no validation classes should be applied
    return '';
  }
}

export function validateAllFields(form: FormGroup) {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched();
    }
    if (control instanceof FormGroup) {
      validateAllFields(control);
    }
    if (control instanceof FormArray) {
      control.controls.forEach((fg) => {
        if (fg instanceof FormGroup) {
          const fgroup = fg as FormGroup;
          validateAllFields(fgroup);
        }
        // For selection arrays with form control
        if (fg instanceof FormControl) {
          fg.markAsTouched();
        }
      });
    }
  });
}

// Form array with form controls or form group for selection
// Need different logic to handle as value is true/false without Validators
export function validateCheckbox(checkbox: FormGroup | FormArray) {
  if (checkbox instanceof FormArray) {
    // Check if fields are touched or dirty
    const isTouchedDirty = checkbox.controls
      .map((control) => {
        if (control.dirty || control.touched) {
          return true;
        }
        return false;
      })
      .includes(true);

    const checkValue = checkbox.controls.map((control) => control.value).includes(true);

    if (isTouchedDirty && !checkValue) return false;
    return true;
  }

  if (checkbox instanceof FormGroup) {
    const isTouchedDirty = Object.keys(checkbox.controls)
      .map((key) => {
        const control = checkbox.controls[key] as FormControl;
        if (control.dirty || control.touched) {
          return true;
        }
        return false;
      })
      .includes(true);

    const checkValue = Object.keys(checkbox.controls)
      .map((key) => {
        const control = checkbox.controls[key] as FormControl;
        return control.value;
      })
      .includes(true);

    if (isTouchedDirty && !checkValue) return false;
    return true;
  }
}
