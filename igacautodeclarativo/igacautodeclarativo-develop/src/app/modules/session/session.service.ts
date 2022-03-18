import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '@app/shared/services/storage/storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  //TODO: 

  public accessToken = '';
  private sessionApiUrl = environment.apiUrl + "sesion";

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {
    this.sessionApiUrl = environment.production ? environment.apiUrl + "sesion" : '../../../../assets/mocks/autodeclarativo/successfulLoginResponse.json';
  }

  public isLoggedIn(): boolean {
    let token = this.storageService.getToken();    
    return token !== null && !this.isTokenExpired();
  };

  public loginObservable(credentials: Credentials) {
    const header = {
      'Content-Type': 'application/json',
      'Acces-Control-Allow-Credentials': 'true',
    };
    const httpOptions = {
      headers: header,
      observe: 'response' as 'response'
    };

    if (environment.production) {
      var observable = new Observable<User>(observer => {
        this.httpClient.post<PostSessionResponse>(this.sessionApiUrl, credentials, httpOptions).subscribe(
          // sessionReponse        
          (sessionReponse: HttpResponse<PostSessionResponse>) => {
            if (sessionReponse.body == undefined) {
              observer.error(sessionReponse);
            }
            else {
              let user = null;
              let sessionResponseBody = sessionReponse.body;
              if (sessionResponseBody.tokenType == "Bearer") {
                user = <User>{
                  username: sessionResponseBody.username,
                  photo: ""
                }
                this.storageService.setToken(sessionResponseBody.accessToken);
                this.storageService.setFullname(sessionResponseBody.fullname);
              }
            }
          },
          // PostSession Error
          (error: HttpErrorResponse) => {
            observer.error(error);
          }
        );
      });
    }
    // Development
    else {
      var observable = new Observable<User>(observer => {
        this.httpClient.get<PostSessionResponse>(this.sessionApiUrl, httpOptions).subscribe(
          // sessionReponse        
          (sessionReponse: HttpResponse<PostSessionResponse>) => {
            console.log("sessionService login response", sessionReponse);
            if (sessionReponse.body == undefined) {
              observer.error(sessionReponse);
            }
            else {
              let user = null;
              let sessionResponseBody = sessionReponse.body;
              console.log("sessionService login response body: ", sessionResponseBody);
              if (sessionResponseBody.tokenType.toLowerCase() == "bearer") {
                console.log("sessionService login response has Bearer", sessionResponseBody);
                user = <User>{
                  username: sessionResponseBody.username,
                  photo: ""
                }
                this.storageService.setToken(sessionResponseBody.accessToken);
                this.storageService.setFullname(sessionResponseBody.fullname);
                console.log("getTokenExpirationDate:",
                  this.getTokenExpirationDate(),
                  new Date(new Date().toDateString()),
                  "isTokenExpired:",this.isTokenExpired(),                  
                  );
              }

              observer.next(user);
            }
          },
          // PostSession Error
          (error: HttpErrorResponse) => {
            observer.error(error);
          }
        );
      });
    }

    return observable;
  };

  public logoutObservable() {
    localStorage.clear();
  };

  isTokenExpired():boolean {
    let tokenDate = this.getTokenExpirationDate();
    let now = new Date(new Date().toDateString());
    return now > tokenDate;
  }

  getTokenExpirationDate(): Date {
    let token = this.storageService.getToken();
    const decodedToken = helper.decodeToken(token);

    if (decodedToken.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }


}

export interface Credentials {
  user: string;
  password: string;
}

export interface PostSessionResponse {
  accessToken: string;
  tokenType: string;
  username: string;
  fullname: string;
  expiresIn: string;
}
// TODO: borrar
export interface DeleteSessionResponse {

}

export interface User {
  username: string;
  photo?: string
}