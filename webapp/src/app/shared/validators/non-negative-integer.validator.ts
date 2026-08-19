import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nonNegativeIntegerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === '') {
      return null;
    }

    const value = Number(control.value);
    return Number.isInteger(value) && value >= 0 ? null : { nonNegativeInteger: true };
  };
}
