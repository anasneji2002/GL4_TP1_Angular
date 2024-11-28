import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";
import { FormControl } from "@angular/forms";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  //searchControl = new FormControl(); // FormControl for reactive input
  filteredCvs: Cv[] = []; // Holds filtered suggestions

  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  form = this.formBuilder.group({ search: [""] });

  constructor(){
    this.search.valueChanges
      .pipe(
        debounceTime(400), 
        distinctUntilChanged(),
        switchMap((name) =>
          name
            ? this.cvService.selectByName(name).pipe(
                catchError(() => {
                  
                  return of([]);
                })
              )
            : of([])
        )
      )
      .subscribe((results) => {
        this.filteredCvs = results;
      });
  }
}
