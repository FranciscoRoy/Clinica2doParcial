import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Profesional } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-gestionusuarios',
  standalone: true,
  imports: [NgFor],
  templateUrl: './gestionusuarios.component.html',
  styleUrl: './gestionusuarios.component.css'
})
export class GestionusuariosComponent implements OnInit{
  usuariosActivos: Profesional[] = [];
  usuariosPendientes: Profesional[] = [];
  
  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit(): void {
    this.buscarProfesionalesActivos();
    this.buscarProfesionalesPendientes();
  }

  buscarProfesionalesActivos(){
    this.usuariosActivos = [];
    this.apiService.buscarProfesionalesPorEstado(1).subscribe(
      (data: Profesional[]) => {
        var i = 0;
        for (const prof of data) {
          var P = new Profesional(prof.nombre, prof.apellido, prof.dni, prof.email, '*******',prof.foto, prof.especialidad, prof.diasAtencion, prof.inicioAtencion, prof.finAtencion, prof.fotoEsp);
          this.usuariosActivos[i] = P;
          i = i +1;
      }},
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  buscarProfesionalesPendientes(){
    this.usuariosPendientes = [];
    this.apiService.buscarProfesionalesPorEstado(0).subscribe(
      (data: Profesional[]) => {
        var i = 0;
        for (const prof of data) {
          var P = new Profesional(prof.nombre, prof.apellido, prof.dni, prof.email, '*******',prof.foto, prof.especialidad, prof.diasAtencion, prof.inicioAtencion, prof.finAtencion, prof.fotoEsp);
          this.usuariosPendientes[i] = P;
          i = i +1;
      }},
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  profesionalHabilitarDeshabilitar(email: string, estado: number){
    this.apiService.profesionalesActivarDesactivar(email,estado).subscribe();
  }


}
