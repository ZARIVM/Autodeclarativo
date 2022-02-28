import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor() {
  }

  uploadFile(request: any): Observable<any> {
    return new Observable<any>( subscriber => {
      subscriber.complete();
    });
  }
}
