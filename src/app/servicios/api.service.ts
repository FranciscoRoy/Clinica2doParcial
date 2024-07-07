import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gerente, Paciente, Profesional, Usuario } from '../clases/usuario'; 
import { Observable } from 'rxjs';
import { UsuarioActivoService } from './usuario-activo.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://roy_dm-apiclinica.mdbgo.io/';

  constructor(private http: HttpClient) {}

insertarPaciente(nuevoPaciente: Paciente): Observable<any>{
const headers = new HttpHeaders({'Content-Type': 'application/json'});
return this.http.post(this.apiUrl + 'registroPaciente', nuevoPaciente, {headers});
}

insertarProfesional(nuevoProfesional: Profesional): Observable<any>{
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(this.apiUrl + 'registroProfesional', nuevoProfesional, {headers});
}

insertarGerente(nuevoGerente: Gerente): Observable<any>{
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post(this.apiUrl + 'registroGerente', nuevoGerente, {headers});
}

buscarPaciente(emailIngresado: string, passwordIngresado: string): Observable<any>{
  var recuperarPaciente = this.http.post(this.apiUrl + 'buscarPaciente', {email: emailIngresado, password: passwordIngresado});
  return recuperarPaciente;
}

buscarProfesional(emailIngresado: string, passwordIngresado: string): Observable<any>{
  var recuperarProfesional = this.http.post(this.apiUrl + 'buscarProfesional', {email: emailIngresado, password: passwordIngresado});
  return recuperarProfesional;
}

buscarGerente(emailIngresado: string, passwordIngresado: string): Observable<any>{
  var recuperarGerente = this.http.post(this.apiUrl + 'buscarGerente', {email: emailIngresado, password: passwordIngresado});
  return recuperarGerente;
}

}

