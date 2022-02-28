import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Predio } from '@app/shared/interfaces/predioConsulta';
import { Alerta } from '@app/shared/interfaces/alertas/alerta';

@Injectable({
  providedIn: 'root',
})
export class AutodeclarativoService {
  constructor(private httpClient: HttpClient) {}
  private url = '';
  private header = {
    'Content-Type': 'application/json',
    'Acces-Control-Allow-Credentials': 'true',
  };

  getDataSol(): Observable<any[]> {
    if (environment.production) {
      return this.httpClient.post<any[]>(
        environment.apiUrl + 'VentanillaUnica/listarTipos',
        { userName: '', idTipo: 'TLEGS' },
        { headers: this.header }
      );
    } else {
      return this.httpClient.get<any[]>(
        '../../../../assets/mocks/autodeclarativo/legitimidadSol.json'
      );
    }
  }

  getDataGrupoEt(): Observable<any[]> {
    if (environment.production) {
      return this.httpClient.post<any[]>(
        environment.apiUrl + 'VentanillaUnica/listarTipos',
        { userName: '', idTipo: 'GRUPO_ETNICO' },
        { headers: this.header }
      );
    } else {
      return this.httpClient.get<any[]>(
        '../../../../assets/mocks/autodeclarativo/grupoEt.json'
      );
    }
  }
  getDataSex(): Observable<any[]>{
    if (environment.production) {
      return this.httpClient.post<any[]>(
        environment.apiUrl + 'VentanillaUnica/listarTipos',
        { userName: '', idTipo: 'SEXO' },
        { headers: this.header }
      );
    } else {
      return this.httpClient.get<any[]>(
        '../../../../assets/mocks/autodeclarativo/sex.json'
      );
    }
  }

  getDepartments(): Observable<any[]> {
    if (environment.production) {
      return this.httpClient.get<any[]>(
        environment.apiUrl + 'Departamentos/listaDepartamentos',
        { headers: this.header }
      );
    } else {
      return this.httpClient.get<any[]>(
        '../../../../assets/mocks/autodeclarativo/departamentos.json'
      );
    }
  }

  getPredios(id): Observable<any[]> {

    
    if (environment.production) {
      return this.httpClient.get<any[]>(
        environment.apiUrl + 'VentanillaUnica/obtenerPredios/' +id,
        { headers: this.header }
      );
    } else {
      return this.httpClient.get<any[]>(
        '../../../../assets/mocks/autodeclarativo/predios.json'
      );
    }


    
  }

  buscarPredial(filtros): Observable<any[]> {
    if (environment.production) {
      return this.httpClient.post<any[]>(
        environment.apiUrl +'VentanillaUnica/filtrarPredios',
        JSON.stringify(filtros),
        { headers: this.header }
      );
    } else {
    return this.httpClient.get<any[]>(
      '../../../../assets/mocks/autodeclarativo/predios.json'
    );
    }
  }


  

  obtenerInfoContacto(parametros): Observable<Predio[]> {
    if (environment.production) {
      return this.httpClient.get<any>(
        environment.apiUrl + 'InfoContacto/obtenerInfoContacto/' + parametros.idPredio,
        { headers: this.header }
      );
    }else{
      return this.httpClient.get<Predio[]>(
        '../../../../assets/mocks/autodeclarativo/infoContact.json'
      );
    }
   
  
  }
  guardarInfoContacto(parametros) {
    //aqui se usa para guardar el crear de la pestaña 4
    
    if (environment.production) {
      return this.httpClient.post<any[]>(
        environment.apiUrl +'InfoContacto/guardar',
        JSON.stringify(parametros),
        { headers: this.header }
      );
    } else {
    return this.httpClient.put(
      '../../../../assets/mocks/autodeclarativo/infoContact.json',
      parametros
    );
    }
  }

  obtenerUsosConstruccion(id): Observable<any[]> {
    if (environment.production) {
      return this.httpClient.get<any[]>(
        environment.apiUrl +'UsoConstruccion/obtenerUsoConstruccion/'+id,
        { headers: this.header }
      );
    } else {
    return this.httpClient.get<any[]>(
      '../../../../assets/mocks/autodeclarativo/usoYconstruccion.json'
    );
    }
  }

  getAlert(textHtml): Alerta {
    return {
      textHtml,
      btnText: 'Aceptar',
      btnClose: 'cancelar',
      text: '',
      title: 'Mensaje informativo',
      showCancelButton: true,
      showConfirmButton: true,
    };
  }

  getAlertInfo(textHtml, showCancelButton, showConfirmButton): Alerta {
    return {
      textHtml,
      btnText: 'Aceptar',
      btnClose: 'cancelar',
      text: '',
      title: 'Mensaje informativo',
      showCancelButton,
      showConfirmButton,
    };
  }

  getAlertSuccess(textHtml): Alerta {
    return  {
      textHtml: textHtml,
      btnText: 'ACEPTAR',
      btnClose: 'CERRAR',
      text: '',
      title: 'SOLICITUD EXITOSA',
      showCancelButton: true,
      showConfirmButton: true
    };;
  }

  getAlertError(textHtml): Alerta {
    return  {
      textHtml: textHtml,
      btnText: 'ACEPTAR',
      btnClose: 'CERRAR',
      text: '',
      title: 'SOLICITUD FALLIDA',
      showCancelButton: true,
      showConfirmButton: true
    };;
  }


  editarInfoYEconomica(datos: any) {
    if (environment.production) {
      return this.httpClient.put(
        environment.apiUrl +'VentanillaUnica/editarInfoFisiEcono',
        JSON.stringify(datos),
        { headers: this.header }
      );
    } else {
    return this.httpClient.get(
      '../../../../assets/mocks/autodeclarativo/infoContact.json',
      datos
    );
    }
  }

  editarContacto(datos: any) {
    if (environment.production) {
      return this.httpClient.put<any[]>(
        environment.apiUrl +'InfoContacto/actualizar',
        JSON.stringify(datos),
        { headers: this.header }
      );
    } else {
    return this.httpClient.get(
      '../../../../assets/mocks/autodeclarativo/infoContact.json'
    );
    }
  }
  crearContacto(datos: any): Observable<any> {
    if (environment.production) {
      return this.httpClient.post<any>(
        environment.apiUrl +'InfoContacto/guardar',
        JSON.stringify(datos),
        { headers: this.header }
      );
    } else {
    return this.httpClient.get(
      '../../../../assets/mocks/autodeclarativo/infoContact.json'
    );
    }
  }

  getUsosConstruccion(): Observable<any[]> {

    if (environment.production) {
      return this.httpClient.get<any[]>(
        environment.apiUrl +'UsoConstruccion/obtenerListUsoConstruccion',
        { headers: this.header }
      );
    } else {
    return this.httpClient.get<any[]>(
      '../../../../assets/mocks/autodeclarativo/usosConstruccion.json'
    );
    }
  }

  actualizarUsoConstruc(data): Observable<any>  {
    
    if (environment.production) {
      return this.httpClient.put<any>(
        environment.apiUrl +'UsoConstruccion/actualizar',
        JSON.stringify(data),
        { headers: this.header }
      );
    } else {
    return this.httpClient.put<any>(
      '../../../../assets/mocks/autodeclarativo/usosConstruccion.json',
      data
    );
    }
  }
  guardarUsoUsoConstruc(data): Observable<any[]>  {
      
    if (environment.production) {
      return this.httpClient.post<any>(
        environment.apiUrl +'UsoConstruccion/guardar',
        JSON.stringify(data),
        { headers: this.header }
      );
    } else {
    return this.httpClient.post<any[]>(
      '../../../../assets/mocks/autodeclarativo/usosConstruccion.json',
      data
    );
    }
  }

  guardarLegitimidadsolicitante(datos): Observable<any>  {

    if (environment.production) {
      return this.httpClient.post<any>(
        environment.apiUrl + 'VentanillaUnica/guardarLegitimidad1',
        JSON.stringify(datos),
      { headers: this.header }
      );
    }else{
      return this.httpClient.get<any[]>(
        '../../../../assets/mocks/autodeclarativo/infofiyeco.json'
      );
    }
  }


  getTipoDocumentos(){
    if (environment.production) {
      return this.httpClient.post<any[]>(
        environment.apiUrl + 'VentanillaUnica/listarTipos',
        { userName: '', idTipo: 'TIPO_DOCUMENTOS' },
        { headers: this.header }
      );
    } else {
      return this.httpClient.get<any[]>(
        '../../../../assets/mocks/autodeclarativo/tipos_documentos.json'
      );
    }

  }

  getDestinoEconomico(){
    if (environment.production) {
      return this.httpClient.get<any[]>(
        environment.apiUrl + 'VentanillaUnica/obtenerDestinoEconomico',
        { headers: this.header }
      );
    } else {
      return this.httpClient.get<any[]>(
        '../../../../assets/mocks/autodeclarativo/destinoEconomico.json'
      );
    }

  }
}
