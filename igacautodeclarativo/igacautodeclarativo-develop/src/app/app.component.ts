import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private http: HttpClient,
  ) {
    
  }

  async ngOnInit() {
    this.getCsrfToken();  
  }  
  
  /**
   * Obtener TOKEN anti CSRF y guardarlo para despues pornerlo en los headers de las 
   * subsecuentes peticiones POST, PUT y DELETE
   */
  getCsrfToken() {
    console.log("getCsrfToken called");
    const headers = new HttpHeaders({ 'Accept': 'application/json' });
    const httpOptions = {
      headers: headers,
      observe: 'response' as 'response' // Para que leer la toda la respuesta HTTP y no solo el body
    };    
    this.http.get(environment.apiUrl + 'csrf-cookie', httpOptions).subscribe(
      (res: HttpResponse<any>) => {
        console.log('getCsrfToken response from server:', res);
      }, err => {
        console.log('getCsrfToken', err);
      }
    );
  }
}
