import { Component, OnInit } from '@angular/core';
import { Usuario, UsuariosinIngresar } from '../../clases/usuario';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { NgIf } from '@angular/common';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-datospersonales',
  standalone: true,
  imports: [NgIf],
  templateUrl: './datospersonales.component.html',
  styleUrl: './datospersonales.component.css'
})

export class DatospersonalesComponent implements OnInit {
  usuario: Usuario = new UsuariosinIngresar();

  constructor(
    private usuarioActivoService: UsuarioActivoService,
    private ventanaActivaService: VentanaActivaService,
  ) { }

  ngOnInit(): void {
    this.usuario = this.usuarioActivoService.getUsuarioActivo();
  }
  
  refrescar() {this.ventanaActivaService.refrescar('datosPersonales')};
  

}
