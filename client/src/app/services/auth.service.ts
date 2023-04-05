import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  APIURL = environment.apiUrl;

  constructor(private http :HttpClient,
    private tokenStorage : TokenStorageService,
    private jwtHelper : JwtHelperService
    ) { }

  register(userData : any) : Observable<any>{
    return this.http.post(this.APIURL + "/register" , userData);
  }

  login(userData : any) : Observable<any> {
    return this.http.post(this.APIURL + "/login", userData );
  }

  logout () {
    this.tokenStorage.removeToken();
  }

  isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    // Check whether the token is expired and return
    // true or false
    if(token == null){
      console.log("Not signed in");
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
