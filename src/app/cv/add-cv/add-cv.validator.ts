import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function cinAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.get('age')?.value;
    const cin = control.get('cin')?.value;

    if (age == null || cin == null || cin.length < 2) {
      return null; // Pas de validation si les champs ne sont pas complets
    }

    const firstTwoDigits = parseInt(cin.substring(0, 2), 10);

    if (age >= 60 && (firstTwoDigits < 0 || firstTwoDigits > 19)) {
      return { cinFirstCars: 'Les deux premiers chiffres du CIN doivent être entre 00 et 19 pour les personnes de 60 ans ou plus.' };
    }

    if (age < 60 && firstTwoDigits <= 19) {
      return { cinFirstCars: 'Les deux premiers chiffres du CIN doivent être supérieurs à 19 pour les personnes de moins de 60 ans.' };
    }

    return null; // Pas d'erreur
  };
}
