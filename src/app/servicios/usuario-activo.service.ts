import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario, UsuariosinIngresar } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActivoService {
  usuarioDefault = new UsuariosinIngresar();
  private usuarioActual = new BehaviorSubject<Usuario>(this.usuarioDefault);
  usuarioActual$ = this.usuarioActual.asObservable();

  constructor() { }

  setUsuarioActivo(nuevoUsuario: Usuario) {
    this.usuarioActual.next(nuevoUsuario);
    console.log(nuevoUsuario);
  }

  getUsuarioActivo(): Usuario {
    return this.usuarioActual.value;
  }

  estaUsuarioActivo(): boolean {
    return this.usuarioActual.value !== null;
  }

  cerrarSesion(){
    this.usuarioActual = new BehaviorSubject<Usuario>(this.usuarioDefault);
  }

  getAlias(){
    console.log(this.usuarioActual.value.nombre);
    return this.usuarioActual.value.nombre;}
}
