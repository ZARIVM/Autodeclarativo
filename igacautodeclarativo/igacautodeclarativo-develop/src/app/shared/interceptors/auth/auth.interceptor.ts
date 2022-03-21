import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '@app/shared/services/storage/storage.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private storageService: StorageService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.storageService.getToken();
    if (accessToken) {
      req = req.clone({
          setHeaders: {
              Authorization: "Bearer " + accessToken
          }
      });
    }
    return next.handle(req);
}  
}
