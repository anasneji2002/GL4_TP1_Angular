import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv$: Observable<Cv> | null = null ;
  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cv$ = this.activatedRoute.data.pipe(map(data => data['cvDetails']));
  }
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).pipe(
      tap(() => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);}),

      catchError( (e) => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
        return throwError(() => {new Error(e)});
      }),
    ).subscribe();
  }
}
