import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setAttributesInfo(attributes: any): void {
    console.log('attributesInfo',attributes)
    localStorage.clear();
    localStorage.setItem('user', attributes.user);
    localStorage.setItem('name', attributes.name);
    localStorage.setItem('mail', attributes.email);
    localStorage.setItem('numDoc', attributes.numDoc);
    localStorage.setItem('typeDoc', attributes.typeDoc);
    localStorage.setItem('given_name', attributes.given_name);
    localStorage.setItem('family_name', attributes.family_name);
    localStorage.setItem('session_state', attributes.session_state);
    localStorage.setItem('Direccion', attributes.Direccion);
    localStorage.setItem('PrimerApellido', attributes.PrimerApellido);
    localStorage.setItem('PrimerNombre', attributes.PrimerNombre);
    localStorage.setItem('SegundoApellido', attributes.SegundoApellido);
    localStorage.setItem('SegundoNombre', attributes.SegundoNombre);
    localStorage.setItem('Telefono', attributes.Telefono);
    localStorage.setItem('LOA', attributes.LOA);
  }

  getLOA(): string {
    return localStorage.getItem('LOA');
  }

  getUsername(): string {
    return localStorage.getItem('user');
  }

  getFullname(): string {
    return localStorage.getItem('name');
  }

  getEmail(): string {
    return localStorage.getItem('mail');
  }

  getNumDoc(): string {
    const documento = localStorage.getItem('user');
    const numDoc = documento.split(",");
    return numDoc[1];
  }

  getDireccion(): string {
    return localStorage.getItem('Direccion');
  }

  getPrimerApellido(): string {
    return localStorage.getItem('PrimerApellido');
  }

  getPrimerNombre(): string {
    return localStorage.getItem('PrimerNombre');
  }

  getSegundoApellido(): string {
    return localStorage.getItem('PrimerNombre');
  }

  getSegundoNombre(): string {
    return localStorage.getItem('SegundoNombre');
  }

  getTelefono(): string {
    return localStorage.getItem('Telefono');
  }

  getNombreCompleto(): string {
    return localStorage.getItem('PrimerNombre') + ' ' + localStorage.getItem('PrimerApellido');
  }

  getTypeDoc(): string {
    const documento = localStorage.getItem('user');
    const tipoDoc = documento.split(",");
    return tipoDoc[0].toUpperCase();
  }

  getGivenName(): string {
    return localStorage.getItem('given_name');
  }

  getFamilyName(): string {
    return localStorage.getItem('family_name');
  }

  getSessionState(): string {
    return localStorage.getItem('session_state');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  clear(): void {
    localStorage.clear();
  }
}
