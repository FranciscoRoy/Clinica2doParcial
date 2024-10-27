import { Component, Input, OnInit } from '@angular/core';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjetausuario',
  standalone: true,
  imports: [],
  templateUrl: './tarjetausuario.component.html',
  styleUrl: './tarjetausuario.component.css'
})

export class TarjetaUsuarioComponent implements OnInit {
  nombreUsuario: string = '';
  fotoUsuario: string = '';
  private subscription: Subscription = new Subscription;

  constructor(
    private usuarioActivoService: UsuarioActivoService
  ){}

  ngOnInit() {
    this.subscription = this.usuarioActivoService.usuarioActual$.subscribe(usuario => {
      if (usuario) {
        const user = this.usuarioActivoService.getUsuarioActivo()
        this.nombreUsuario = user.nombre + ' ' + user.apellido;
        this.fotoUsuario = user.foto;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
