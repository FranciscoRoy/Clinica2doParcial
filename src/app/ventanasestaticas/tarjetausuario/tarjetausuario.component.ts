import { Component, OnInit } from '@angular/core';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { Subscription } from 'rxjs';
import { Paciente } from '../../clases/usuario';
import { NgClass } from '@angular/common';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-tarjetausuario',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tarjetausuario.component.html',
  styleUrl: './tarjetausuario.component.css'
})

export class TarjetaUsuarioComponent implements OnInit {
  nombreUsuario: string = '';
  fotoUsuario: string = '';
  private subscription: Subscription = new Subscription;
  valPend: number = 0;
  chatsPend: number = 0;

  constructor(
    private usuarioActivoService: UsuarioActivoService,
    private ventanaActivaService: VentanaActivaService,
  ){}

  ngOnInit() {
    this.subscription = this.usuarioActivoService.usuarioActual$.subscribe(usuario => {
      if (usuario) {
        const user = this.usuarioActivoService.getUsuarioActivo()
        this.nombreUsuario = user.nombre + ' ' + user.apellido;
        this.fotoUsuario = user.foto;
        this.chatsPend = user.chatsPend;
        if (user instanceof Paciente) {this.valPend = user.valPend;} else {this.valPend = 0};
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  irValorarServicios(){
    this.ventanaActivaService.cambiarVentana('valoraciones');
  }

}
