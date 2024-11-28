import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { catchError, Observable, of, shareReplay,filter,map } from "rxjs";
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
    private cvService: CvService
  ) {
    this.cvs$=this.cvService.getCvs().pipe(

      shareReplay(1),
      catchError(()=>{
       
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
          return of(this.cvService.getFakeCvs())
      
    }));
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
