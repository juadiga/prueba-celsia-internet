import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const fecha = new Date(control.value);
    if (isNaN(fecha.getTime())) {
      return { pastDate: true };
    }

    return fecha.getTime() < Date.now() ? null : { pastDate: true };
  };
}
