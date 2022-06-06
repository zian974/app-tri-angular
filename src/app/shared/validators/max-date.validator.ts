import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

/**
 * Check if control value is inferior to date in parameter
 * @export
 */
export function maxDateValidator(maxDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // parse control value to Date
    const date = new Date(control.value);

    // check if control value is superior to date given in parameter
    if (dateToYMD(date) <= dateToYMD(maxDate)   ) {
      return null;
    } else {
      return { 'max': { value: control.value, expected: maxDate } };

    }
  };
}


const dateToYMD = (date: Date): string => {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
