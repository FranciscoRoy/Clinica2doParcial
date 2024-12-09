import { Injectable } from '@angular/core';
//import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ConversacionesService {
  private conversaciones: { email: string; mensajes: string[] }[] = [];

  constructor(
    //private ApiService: ApiService,
  ) {}

  recuperarConversaciones(email: string){
    //return this.ApiService.recuperarConversaciones(email);
  }
  
  obtenerConversaciones() {
    return this.conversaciones;
  }

  agregarConversacion(email: string) {
    if (!this.conversaciones.find(convo => convo.email === email)) {
      this.conversaciones.push({ email, mensajes: [] });
    }
  }

  enviarMensaje(email: string, mensaje: string) {
    const conversacion = this.conversaciones.find(convo => convo.email === email);
    if (conversacion) {
      conversacion.mensajes.push(mensaje);
    }
  }


  
}

