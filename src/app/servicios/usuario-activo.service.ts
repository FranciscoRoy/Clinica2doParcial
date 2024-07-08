import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gerente, Paciente, Profesional, Usuario, UsuariosinIngresar } from '../clases/usuario';
import { VentanaActivaService } from './ventanaactiva.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActivoService {
  usuarioDefault = new UsuariosinIngresar();
  private usuarioActual = new BehaviorSubject<Usuario>(this.usuarioDefault);
  usuarioActual$ = this.usuarioActual.asObservable();

  constructor() { }

  setUsuarioActivo(datosUsuario: Usuario) {
    var ingresarUsuario: Usuario;
    switch (true) {
      case datosUsuario instanceof Paciente:
        ingresarUsuario = new Paciente(datosUsuario.nombre, datosUsuario.apellido, datosUsuario.dni, datosUsuario.email, '*******', datosUsuario.foto);
        break;
      case datosUsuario instanceof Profesional:
        ingresarUsuario = new Profesional(datosUsuario.nombre, datosUsuario.apellido, datosUsuario.dni, datosUsuario.email, '*******', datosUsuario.foto, '', '', '');
        break;
      case datosUsuario instanceof Gerente:
        ingresarUsuario = new Gerente(datosUsuario.nombre, datosUsuario.apellido, datosUsuario.dni, datosUsuario.email, '*******', datosUsuario.foto);
        break;
      default:
        ingresarUsuario = this.usuarioDefault;
        break;
    }
    this.usuarioActual.next(ingresarUsuario);
  }

  getUsuarioActivo(): Usuario {
    return this.usuarioActual.value;
  }

  cerrarSesion(){
    this.setUsuarioActivo(this.usuarioDefault);
  }

}
