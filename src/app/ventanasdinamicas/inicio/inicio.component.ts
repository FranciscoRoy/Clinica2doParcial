import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, FormsModule, NgIf],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit  {
  selectedTipoUsuario: string = '';
  tipoUsuarioActivo = 'Invitado';
  alias: string = 'ALIAS';

  constructor(
    private ventanaActivaService: VentanaActivaService,
  ){}

ngOnInit(): void {
  this.ventanaActivaService.getTipoUsuarioSolicitado().subscribe(usuarioTipo => {this.tipoUsuarioActivo = usuarioTipo;});
  
}

irIngreso(){
  this.ventanaActivaService.cambiarVentana('ingreso',this.selectedTipoUsuario);}

irRegistro(){
  this.ventanaActivaService.cambiarVentana('registro',this.selectedTipoUsuario);
}

irAyuda(){
  this.ventanaActivaService.cambiarVentana('ayuda');}

}
