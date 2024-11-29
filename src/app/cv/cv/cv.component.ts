import { Component, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { catchError, Observable, of, shareReplay,filter,map } from "rxjs";
import { ActivatedRoute } from "@angular/router";
//import { AutocompleteComponent } from "../autocomplete/autocomplete.component";

@Component({
  
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
  
})
export class CvComponent {
  cvs$:Observable<Cv[]> ;
  juniorCvs$:Observable<Cv[]> ;
  seniorCvs$:Observable<Cv[]> ;
  selectedCv$: Observable<Cv>;
  show:boolean = true;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService,
    private route: ActivatedRoute
  ) {
    this.cvs$ = this.route.data.pipe(map(data => data['cvs']));
    this.juniorCvs$=this.cvs$.pipe(
      map(cvs => cvs.filter(cv => cv.age < 40))
    )
    this.seniorCvs$=this.cvs$.pipe(
      map(cvs => cvs.filter(cv => cv.age >= 40))
    )
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
    this.selectedCv$= this.cvService.selectCv$ ;
  }

  showJunior(){
    this.show=true;
 }
  showSenior(){
    this.show=false;
 }
}
