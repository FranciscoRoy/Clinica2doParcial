import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VentanaActivaService{
  private ventanaActivaSubject = new BehaviorSubject<string>('inicio');
  private tipoUsuarioSolicitadoSubject = new BehaviorSubject<string>('Invitado');

cambiarVentana(ventana: string,tipoUsuarioEntrada?: string){
  if (tipoUsuarioEntrada) {this.tipoUsuarioSolicitadoSubject.next(tipoUsuarioEntrada);}
  this.ventanaActivaSubject.next(ventana);
}

getTipoUsuarioSolicitado(){return this.tipoUsuarioSolicitadoSubject;}

getVentanaActiva(){return this.ventanaActivaSubject;}

}
