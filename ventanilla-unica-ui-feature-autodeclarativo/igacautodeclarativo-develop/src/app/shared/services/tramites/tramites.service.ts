import {Injectable} from '@angular/core';
import {ServiceVariables} from '@shared/constants/service/service-variables';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tramite} from '@shared/interfaces/tramites/tramite';

@Injectable({
  providedIn: 'root'
})
export class TramitesService extends ServiceVariables {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getByStatusAndDocument(status: string, document: string, typeDoc: string): Observable<Tramite[]> {
    return this.http.get<Tramite[]>(
      `${this.serverApiJbpm}/tramitesCiudadano`,
      {
        params: new HttpParams()
          .append('status', status)
          .append('numDoc', document)
          .append('typeDoc', typeDoc)
      }
    );
  }

  registrarTramite(body: any): Observable<any> {
    /*let _headers = new HttpHeaders();
    //_headers = _headers.append('is-file', 'true');
    _headers = _headers.append('Content-Type', 'application/json; charset=utf8');
    const HttpOptions = {
      headers: _headers
    }*/
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'})
    }
    return this.http.post<any>(
      `${this.serverApiTramite}/registrarTramite`, body , httpOptions
    );
  }

  registrarAnexo(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverApiTramite}/registrarAnexo`, body
    );
  }

  consultarPredios(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverApiTramite}/consulta/predial`, body
    );
  }

  consultarPredio(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverApiTramite}/consulta/predio`, body
    );
  }

  consultarPredioMatricula(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverApiTramite}/consulta/predio/matricula`, body
    );
  }

  getTipoTramite(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverApiTipoTramite}/search/`, body
    );
  }

  getTipoTramiteHijo(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverApiTipoTramite}/hijos/`, body
    );
  }

}
