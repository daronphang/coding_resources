import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, FormArray } from '@angular/forms';
import { regExArrHelper, stringDelimiterHandler } from '../helpers/generic';

export const customValidators = {
  checkAttributeValidator: checkAttributeValidator,
  checkEmailListValidator: checkEmailListValidator,
  checkRequestIdValidator: checkRequestIdValidator,
  checkLotListValidator: checkLotListValidator,
  checkProcessStepValidator: checkProcessStepValidator,
  checkCheckboxValidator: checkCheckboxValidator,
};

export function checkAttributeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return { checkAttr: 'Please enter an attribute and choose to include or exclude.' };
    // ZWPY22SPETLCTBCR2R (123456) => need exclude (123456)
    const result = regExArrHelper([control.value], 'attribute');
    return !result[0] ? { checkAttr: 'Please enter a valid attribute and choose to include or exclude.' } : null;
  };
}

export function checkRequestIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return { invalid: true };
    const trimmedInput = control.value.trim();
    if (trimmedInput.length < 30) return { invalid: true };
    return null;
  };
}

// Each checkbox must be a FormGroup within FormArray
export function checkCheckboxValidator(key: string, minRequired: number): ValidatorFn {
  return (formArray: FormArray): ValidationErrors | null => {
    let checked = 0;
    formArray.controls.forEach((fg: FormGroup) => {
      if (fg.controls[key].value) {
        checked++;
      }
    });
    if (checked < minRequired) {
      return { invalid: true };
    }
    return null;
  };
}

// For Instacap details form validation
export function checkLotListValidator(isSingle: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return { checkLotList: 'Please enter a lot ID.' };
    let lotArr: string[];
    if (isSingle) {
      lotArr = [control.value];
    } else {
      lotArr = stringDelimiterHandler(control.value, '\n');
    }
    const result = regExArrHelper(lotArr, 'lotID'); // returns ['1234567.007', false]

    if (result.length === 0) return { checkLotList: 'RegEx does not exist.' };

    let errMsg = 'The following lots provided are invalid: ';
    // Check for false values
    const falseExists = result.filter((item) => !item);
    if (falseExists.length > 0) {
      // return custom error message for false lot IDs
      result.forEach((item, i) => {
        if (item) return;
        errMsg += `${lotArr[i]},`;
      });
      return { checkLotList: errMsg.slice(0, errMsg.length - 1) };
    }

    // Check duplicates
    const uniqueResult = Array.from(new Set(result));
    const duplicateLength = result.length - uniqueResult.length;
    if (duplicateLength > 0) return { checkLotList: 'Please remove duplicate lots.' };

    // Check if lot Ids provided less than 21 lots
    return uniqueResult.length > 20 ? { checkLotList: 'You can only provide maximum of 20 lot IDs.' } : null;
  };
}

// For email list validation
export function checkEmailListValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const emailArr = stringDelimiterHandler(control.value, ',');
    const result = regExArrHelper(emailArr, 'email');
    let errMsg = 'The following emails provided are invalid: ';
    // Check for false values
    const falseExists = result.filter((item) => !item);
    if (falseExists.length > 0) {
      // return custom error message for incorrect emails
      result.forEach((item, i) => {
        if (item) return;
        errMsg += `${emailArr[i]},`;
      });
      return { checkEmailList: errMsg.slice(0, errMsg.length - 1) };
    }

    // Check duplicates
    const uniqueResult = Array.from(new Set(result));
    const duplicateLength = result.length - uniqueResult.length;
    if (duplicateLength > 0) return { checkEmailList: 'Please remove duplicate emails.' };

    // All checks passed
    return null;
  };
}

export function checkProcessStepValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return { checkStep: 'Please enter a process step.' };
    const result = regExArrHelper([control.value], 'processStep');
    // Check for false values
    return !result[0] ? { checkStep: 'Please enter a valid step name.' } : null;
  };
}
