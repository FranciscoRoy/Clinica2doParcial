import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario, UsuariosinIngresar } from '../clases/usuario'; // Importar las clases de usuario

@Injectable({
  providedIn: 'root' // Proveer el servicio a nivel de aplicación
})
export class UsuarioActivoService {
  private usuarioActualSubject = new BehaviorSubject<Usuario>(new UsuariosinIngresar()); // inicializa con un usuario sin ingreso
  usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor() { }

  // Método para establecer el usuario activo
  setUsuarioActivo(usuario: Usuario) {
    this.usuarioActualSubject.next(usuario);
  }

  // Método para obtener el usuario activo
  getUsuarioActivo(): Usuario {
    return this.usuarioActualSubject.value;
  }

  // Método para verificar si hay un usuario activo
  estaUsuarioActivo(): boolean {
    return this.usuarioActualSubject.value !== null;
  }
}
