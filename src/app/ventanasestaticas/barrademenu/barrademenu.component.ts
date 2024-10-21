import { Component, OnInit } from '@angular/core';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { UsuariosinIngresar, Usuario } from '../../clases/usuario';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColoresService } from '../../servicios/colores.service';

@Component({
  selector: 'app-barrademenu',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, FormsModule],
  templateUrl: './barrademenu.component.html',
  styleUrls: ['./barrademenu.component.css']
})
export class BarrademenuComponent implements OnInit {
  usuarioActivo: Usuario = new UsuariosinIngresar();
  selectedTipoUsuario: string = '';
  paletaDefault = 'azules';

  constructor(
    private ventanaActivaService: VentanaActivaService,
    private usuarioActivoService: UsuarioActivoService,
    private coloresServiceLocal: ColoresService,
  ) {}

  ngOnInit() {
    this.usuarioActivoService.usuarioActual$.subscribe(usuario => {
      this.usuarioActivo = usuario;
    });
  }
  
  inicio() {
    this.ventanaActivaService.cambiarVentana('inicio');}

  ingresar() {
    this.ventanaActivaService.cambiarVentana('ingreso');}

  misDatos() {
    this.ventanaActivaService.cambiarVentana('datospersonales');}

  misTurnos() {
    this.ventanaActivaService.cambiarVentana('turnos');}

  gestionarTurnosP() {
    this.ventanaActivaService.cambiarVentana('gestionTurnosProfesional');}

  gestionarTurnosG() {
    this.ventanaActivaService.cambiarVentana('gestionTurnosGerente');}
    
  gestionarUsuariosG() {
    this.ventanaActivaService.cambiarVentana('gestionUsuarios');}

  ayuda() {
    this.ventanaActivaService.cambiarVentana('ayuda');}
    
  salir() {
    this.usuarioActivoService.cerrarSesion();
    this.ventanaActivaService.cambiarVentana('inicio');}
    
  atras(){
    this.ventanaActivaService.historial(-1);
  }

  adelante(){
    this.ventanaActivaService.historial(1);
  }

  cambiarColores(paleta: string | null){
    if (!paleta) {this.coloresServiceLocal.aplicarPaleta('azules');}
    else {this.coloresServiceLocal.aplicarPaleta(paleta);}
  }

}