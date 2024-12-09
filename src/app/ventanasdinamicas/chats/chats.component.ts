import { Component, OnInit } from '@angular/core';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { Usuario, UsuariosinIngresar } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../servicios/api.service';
import { Conversacion } from '../../clases/conversacion';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit {
  usuarioActual: Usuario = new UsuariosinIngresar();
  listaContactos: string[] = [];
  emailActivo: string = '';
  conversacionActiva: Conversacion | null = null;
  nuevoEmail: string = '';
  nuevoMensaje: string = '';
  private conversacionSubscription: any;

  constructor(
    private usuarioActivoService: UsuarioActivoService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.usuarioActivoService.getUsuarioActivo();
    this.buscarContactos();
  }
  
  buscarContactos(): void{
    this.apiService.recuperarContactos(this.usuarioActual.email).subscribe(
      (data: any[]) => {
        this.listaContactos = [];
        data.forEach(email => {
          this.listaContactos.push(email.contacto);});
        },
        (error) => {
          console.error('Error:', error);
        }
    );
  }

  mostrarConversacion(email: string): void {
    this.emailActivo = email;
  
    if (this.conversacionSubscription) {
      this.conversacionSubscription.unsubscribe();
    }
  
    this.conversacionSubscription = interval(1000).subscribe(() => {
      this.apiService.recuperarMensajes(this.usuarioActual.email, email).subscribe(
        (mensajes) => {
          this.conversacionActiva = new Conversacion(
            this.usuarioActual.email,
            email,
            mensajes
          );
        },
        (error) => {
          console.error('Error al cargar mensajes:', error);
        }
      );
    });
  }

  /*
  mostrarConversacion(email: string): void {
    this.emailActivo = email;
    this.apiService.recuperarMensajes(this.usuarioActual.email, email).subscribe(
      (mensajes) => {
        this.conversacionActiva = new Conversacion(
          this.usuarioActual.email,
          email,
          mensajes
        );
      },
      (error) => {
        console.error('Error al cargar mensajes:', error);
      }
    );
  }
  */

  cerrarConversacion() {
    if (this.conversacionSubscription) {
      this.conversacionSubscription.unsubscribe();
    }
    this.conversacionActiva = null;
  }

  sumarMensaje(destinatario: string): void {
    if (this.nuevoMensaje) {
      this.apiService.guardarMensajes(this.usuarioActual.email,destinatario,this.nuevoMensaje).subscribe();
      this.nuevoMensaje = '';
      setTimeout(() => {
        this.mostrarConversacion(destinatario);
      }, 1000);
    }
  }

  enviarMensaje(): void {
    if (this.nuevoEmail && this.nuevoMensaje) {
      this.apiService.guardarMensajes(this.usuarioActual.email,this.nuevoEmail,this.nuevoMensaje).subscribe();
      this.nuevoEmail = '';
      this.nuevoMensaje = '';
    }
  }

}