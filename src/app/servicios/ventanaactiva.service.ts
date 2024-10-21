import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { UsuarioActivoService } from './usuario-activo.service';

@Injectable({
  providedIn: 'root'
})

export class VentanaActivaService{
  private ventanaActivaSubject = new BehaviorSubject<string>('inicio');
  private tipoUsuarioSolicitadoSubject = new BehaviorSubject<string>('Invitado');
  private historialNavegacion: string[] = [];
  private indiceActual: number = -1;

  constructor(
    private usuarioActivoService: UsuarioActivoService,
  ){}

cambiarVentana(ventana: string,tipoUsuarioEntrada?: string){
  if (tipoUsuarioEntrada) {
    this.tipoUsuarioSolicitadoSubject.next(tipoUsuarioEntrada);
  } else if (!tipoUsuarioEntrada) {
    var tipo = this.usuarioActivoService.getUsuarioActivo().getTipoUsuario();
    this.tipoUsuarioSolicitadoSubject.next(tipo);
  }
  this.ventanaActivaSubject.next(ventana);
  if (ventana != 'espera') {this.agregarDestino(ventana)}
}

getTipoUsuarioSolicitado(){return this.tipoUsuarioSolicitadoSubject;}

getVentanaActiva(){return this.ventanaActivaSubject}

navegar(origen: string, tiempo: number) {
  this.cambiarVentana('espera');
  setTimeout(() => {
    this.cambiarVentana(origen);
  }, tiempo*1000);
}

historial(direccion: number) {
  if (direccion === -1) {
    if (this.indiceActual > 0) {
      this.indiceActual--;
      this.cambiarVentana(this.historialNavegacion[this.indiceActual]);
    }
  } else if (direccion === 1) {
    if (this.indiceActual < this.historialNavegacion.length - 1) {
      this.indiceActual++;
      this.cambiarVentana(this.historialNavegacion[this.indiceActual]);
    }
  }
}

agregarDestino(ventana: string) {
  if (this.historialNavegacion.length < 20) {
    this.historialNavegacion.push(ventana);
    this.indiceActual = this.historialNavegacion.length - 1;
  } else {
    this.historialNavegacion.shift();
    this.historialNavegacion.push(ventana);
    this.indiceActual--;
  }
}

}
