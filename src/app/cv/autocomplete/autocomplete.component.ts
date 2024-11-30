import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);

  form = this.formBuilder.group({ search: [""] });

  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  //Using asyncpipe
  filteredCvs$ = this.search.valueChanges.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    switchMap((name) =>
      name
        ? this.cvService.selectByName(name).pipe(
            catchError(() => of([]))
          )
        : of([])
    )
  );

  //using subscribe
  
  //  filteredCvs: Cv[] = []; 

  //   constructor(){
  //   this.search.valueChanges
  //     .pipe(
  //       debounceTime(400), 
  //       distinctUntilChanged(),
  //       switchMap((name) =>
  //         name
  //           ? this.cvService.selectByName(name).pipe(
  //               catchError(() => {
                  
  //                 return of([]);
  //               })
  //             )
  //           : of([])
  //       )
  //     )
  //     .subscribe((results) => {
  //       this.filteredCvs = results;
  //     });
  // }
  
}
