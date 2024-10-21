import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { Paciente } from '../../clases/usuario';

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
  alias: string = 'Invitado';
  valoracionesPendientes: number = 3;

  constructor(
    private ventanaActivaService: VentanaActivaService,
    private usuarioActivoService: UsuarioActivoService,
  ){}

ngOnInit(): void {
  this.ventanaActivaService.getTipoUsuarioSolicitado().subscribe(usuarioTipo => {this.tipoUsuarioActivo = usuarioTipo;});
  this.alias = this.usuarioActivoService.getUsuarioActivo().nombre;
  this.valoracionesPendientes = (this.usuarioActivoService.getUsuarioActivo() as Paciente).valPend;
}

irIngreso(){
  this.ventanaActivaService.cambiarVentana('ingreso',this.selectedTipoUsuario);}

irRegistro(){
  this.ventanaActivaService.cambiarVentana('registro',this.selectedTipoUsuario);}

irDatosPersonales(){
  this.ventanaActivaService.cambiarVentana('datosPersonales');}

irTurnos(){
  this.ventanaActivaService.cambiarVentana('turnos');}

irTurnosProfesional(){
  this.ventanaActivaService.cambiarVentana('gestionTurnosProfesional');}

irAyuda(){
  this.ventanaActivaService.cambiarVentana('ayuda');}

irGestionUsuarios(){
  this.ventanaActivaService.cambiarVentana('gestionUsuarios');}

irGestionTurnosGerente(){
  this.ventanaActivaService.cambiarVentana('gestionTurnosGerente');
}

irValorarServicios(){
  this.ventanaActivaService.cambiarVentana('valoraciones');}

salir() {
  this.usuarioActivoService.cerrarSesion();
  this.ventanaActivaService.cambiarVentana('inicio');}

}
