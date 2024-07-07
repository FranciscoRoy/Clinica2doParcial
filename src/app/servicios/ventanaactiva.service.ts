import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { UsuarioActivoService } from './usuario-activo.service';

@Injectable({
  providedIn: 'root'
})

export class VentanaActivaService{
  private ventanaActivaSubject = new BehaviorSubject<string>('inicio');
  private tipoUsuarioSolicitadoSubject = new BehaviorSubject<string>('Invitado');

  constructor(
    private usuarioActivoService: UsuarioActivoService,
  ){}

cambiarVentana(ventana: string,tipoUsuarioEntrada?: string){
  if (tipoUsuarioEntrada) {
    this.tipoUsuarioSolicitadoSubject.next(tipoUsuarioEntrada);
  } else if (!tipoUsuarioEntrada) {
    this.tipoUsuarioSolicitadoSubject.next(this.usuarioActivoService.getUsuarioActivo().getTipoUsuario());
  }
  this.ventanaActivaSubject.next(ventana);
}

getTipoUsuarioSolicitado(){return this.tipoUsuarioSolicitadoSubject;}

getVentanaActiva(){return this.ventanaActivaSubject}

}
