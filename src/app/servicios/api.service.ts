import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gerente, Paciente, Profesional } from '../clases/usuario'; 

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://roy_dm-apiclinica.mdbgo.io/';

  constructor(private http: HttpClient) { }

  /*
  insertarPersona() {
    return this.http.post(this.apiUrl + 'prueba','');
  }
  */

  insertarPaciente(nuevoPaciente: Paciente) {
    return this.http.post(this.apiUrl + 'registroPaciente', nuevoPaciente);
  }

  insertarProfesional(nuevoProfesional: Profesional){
    return this.http.post(this.apiUrl + 'registroProfesional', nuevoProfesional);
  }

  insertarGerente(nuevoGerente: Gerente){
    return this.http.post(this.apiUrl + 'registroGerente', nuevoGerente);
  }

}

