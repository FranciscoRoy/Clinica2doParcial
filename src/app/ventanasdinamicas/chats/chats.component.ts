import { Component } from '@angular/core';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { Usuario, UsuariosinIngresar } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../servicios/api.service';
import { Conversacion } from '../../clases/conversacion';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  usuarioActual: Usuario = new UsuariosinIngresar();
  listaContactos: string[] = [];
  emailActivo: string = '';
  conversacionActiva: Conversacion | null = null;

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

  mostrarConversacion(receptor: string){

  }

  iniciarConversacion() {
    
  }

  enviarMensaje() {

  }
}
