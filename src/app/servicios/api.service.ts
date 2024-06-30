import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://roy_dm-apiclinica.mdbgo.io/prueba';

  constructor(private http: HttpClient) { }


  //Metodo para probar el servicio API
  probarApi(): string{
    return 'Api ANDANDO'
  }

  insertarPersona() {
    return this.http.post(this.apiUrl,'');
  }

  // Método para obtener datos de la API
  getData(endpoint: string): Observable<any> {
    return this.http.get(this.apiUrl + endpoint);
  }

  // Método para enviar datos a la API
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + endpoint, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Método para actualizar datos en la API
  putData(endpoint: string, data: any): Observable<any> {
    return this.http.put(this.apiUrl + endpoint, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Método para eliminar datos de la API
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(this.apiUrl + endpoint);
  }
}

