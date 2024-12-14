import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
//import { AddCvComponent } from "./add-cv.component";

export function cinAgeValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const age = form.get('age')?.value;
    const cin = form.get('cin')?.value;

    if (age == null || cin == null || cin.length < 8) {
      return null; 
    }

    const firstTwoDigits = parseInt(cin.substring(0, 2), 10);

    if (age >= 60 && firstTwoDigits > 19) {
      return { cinFirstCars: 'l zouz lawlenin mtaa l cin lezem byyn  00 et 19 la3mor akther mel 60.' };
    }

    if (age < 60 && firstTwoDigits <= 19) {
      return { cinFirstCars: 'l zouz lawlenin mtaa l cin lezem akther men 19 la3mor a9al mel 60.' };
    }

    return null; 
  };
}
