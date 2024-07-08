import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gerente, Paciente, Profesional } from '../clases/usuario';
import { Turno } from '../clases/turno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://roy_dm-apiclinica.mdbgo.io/';

  constructor(private http: HttpClient) {}

insertarPaciente(nuevoPaciente: Paciente): Observable<any>{
return this.http.post(this.apiUrl + 'registroPaciente', nuevoPaciente);
}

insertarProfesional(nuevoProfesional: Profesional): Observable<any>{
  return this.http.post(this.apiUrl + 'registroProfesional', nuevoProfesional);
}

insertarGerente(nuevoGerente: Gerente): Observable<any>{
  return this.http.post(this.apiUrl + 'registroGerente', nuevoGerente);
}

buscarPaciente(emailIngresado: string, passwordIngresado: string): Observable<any>{
  var recuperarPaciente = this.http.post<Paciente>(this.apiUrl + 'buscarPaciente', {email: emailIngresado, password: passwordIngresado});
  return recuperarPaciente;
}

buscarProfesional(emailIngresado: string, passwordIngresado: string): Observable<any>{
  var recuperarProfesional = this.http.post<Profesional>(this.apiUrl + 'buscarProfesional', {email: emailIngresado, password: passwordIngresado});
  return recuperarProfesional;
}

buscarTodosProfesionales(): Observable<Profesional[]>{
  var recuperarProfesionales = this.http.post<Profesional[]>(this.apiUrl + 'buscarTodosProfesionales', '1');
  return recuperarProfesionales;
}

buscarProfesionalesPorEstado(criterio: number): Observable<Profesional[]>{
  var recuperarProfesionales = this.http.post<Profesional[]>(this.apiUrl + 'buscarProfesionalesPorEstado', {estado: criterio});
  return recuperarProfesionales;
}

profesionalesActivarDesactivar(emailProfesional: string, estadoProfesional: number): Observable<any>{
  return this.http.post(this.apiUrl + 'profesionalActivarDesactivar', {email: emailProfesional, estado: estadoProfesional});
}

buscarGerente(emailIngresado: string, passwordIngresado: string): Observable<any>{
  var recuperarGerente = this.http.post<Gerente>(this.apiUrl + 'buscarGerente', {email: emailIngresado, password: passwordIngresado});
  return recuperarGerente;
}

verTurnos(): Observable<any>{
  var recuperarTurnosDisponibles = this.http.post<Turno[]>(this.apiUrl + 'buscarTurnosDisponibles','');
  return recuperarTurnosDisponibles;
}

verTurnosActivos(emailIngresado: string): Observable<any>{
  var recuperarTurnosActivos = this.http.post<Turno[]>(this.apiUrl + 'buscarTurnosActivos', {email: emailIngresado});
  return recuperarTurnosActivos;
}

verTurnosActivosPorProfesional(profesionalIngresado: string): Observable<any>{
  var recuperarTurnosActivos = this.http.post<Turno[]>(this.apiUrl + 'buscarTurnosActivosPorProfesional', {profesional: profesionalIngresado});
  return recuperarTurnosActivos;
}

insertarTurno(nuevoTurno: Turno): Observable<any>{
  return this.http.post(this.apiUrl + 'insertarTurno', nuevoTurno);
}

turnoAceptarCancelar(especialidad: string, dia: string, horario: string, profesional: string, accion: number): Observable<any>{
  return this.http.post(this.apiUrl + 'turnoAceptarCancelar', {especialidad: especialidad, dia: dia, horario: horario, profesional: profesional, accion: accion});
}

}

