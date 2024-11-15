import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, map, tap } from 'rxjs';
import { UserLogin } from '../dto/user.dto';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() {
    const storage = localStorage.getItem("user");
    if (storage) {
      this.userSignal.set(JSON.parse(storage));
    }
  }
  userSignal = signal<UserLogin | null>(null);

  isAuthenticated = computed<boolean>(() => {
    const user = this.userSignal();
    return user !== null ;
  });


  login(credentials: CredentialsDto): Observable<boolean> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        const user: UserLogin = {
          id: response.id,
          token: response.id,
          created: response.created,
          ttl: response.ttl,
          userId: response.userId,
          email: credentials.email,
        };

        this.userSignal.set(user);
        localStorage.setItem("user", JSON.stringify(user));
      }),
      map(() => true)
    );
  }

  logout() {
    this.userSignal.set(null);
    localStorage.removeItem("user");
  }
}