import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gerente, Paciente, Profesional } from '../clases/usuario'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://roy_dm-apiclinica.mdbgo.io/';

  constructor(private http: HttpClient) { }
/*
  insertarPaciente(nuevoPaciente: Paciente) {
    return this.http.post(this.apiUrl + 'registroPaciente', nuevoPaciente);
  }
*/
insertarPaciente(nuevoPaciente: Paciente): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(this.apiUrl + 'registroPaciente', nuevoPaciente, {headers});
}

insertarProfesional(nuevoProfesional: Profesional){
  return this.http.post(this.apiUrl + 'registroProfesional', nuevoProfesional);
}

insertarGerente(nuevoGerente: Gerente){
  return this.http.post(this.apiUrl + 'registroGerente', nuevoGerente);
}


}

