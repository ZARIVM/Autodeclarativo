import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServiceVariables} from '@shared/constants/service/service-variables';
import {PredioRequest} from '@shared/interfaces/predios/predio-request';
import {PredioResponse} from '@shared/interfaces/predios/predio-response';

@Injectable({
  providedIn: 'root'
})
export class PrediosService extends ServiceVariables {

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  getPredios(request: PredioRequest): Observable<PredioResponse> {
    return this.httpClient.post<PredioResponse>(
      `${this.serverApiInfo}/consultarPredios`, request
    );
  }

  getPredioGeo(numPredial: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.serverApiGeoportal}/predio/geometria/${numPredial}`,
      {
        params: new HttpParams()
          .append('apikey', this.geoportalApiKey)
          .append('u', this.geoportalUser)
      }
    );
  }
}
