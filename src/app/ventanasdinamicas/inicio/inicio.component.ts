import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  selectedTipoUsuario: string = '';

  constructor(private ventanaActivaService: VentanaActivaService,){}

irIngreso(){
  this.ventanaActivaService.cambiarVentana('ingreso');}

irRegistro(){
  this.ventanaActivaService.cambiarVentana('registroPaciente');}

irAyuda(){
  this.ventanaActivaService.cambiarVentana('ayuda');}

}
