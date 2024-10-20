import { Component, OnInit } from '@angular/core';
import { Profesional } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import { Turno } from '../../clases/turno';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-gestionturnos-profesional',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './gestionturnos-profesional.component.html',
  styleUrl: './gestionturnos-profesional.component.css'
})

export class GestionturnosProfesionalComponent implements OnInit{
  turnosPendientes: Turno[] = [];
  turnosAceptados: Turno[] = [];
  nombre: string = '';
  apellido: string = '';
  profesional: string = '';

  constructor(
    private apiService: ApiService,
    private usuarioActivoService: UsuarioActivoService
  ){}

  ngOnInit(): void {
    this.nombre = this.usuarioActivoService.getUsuarioActivo().nombre
    this.apellido = this.usuarioActivoService.getUsuarioActivo().apellido
    this.profesional = this.nombre + ' ' + this.apellido;
    this.buscarTurnosPropios();
  }

  buscarTurnosPropios(){
    this.turnosAceptados = [];
    this.turnosPendientes = [];
    this.apiService.verTurnosActivosPorProfesional(this.profesional).subscribe(
      (data: Turno[]) => {
        var i = 0;
        for (const turn of data) {
          var T = new Turno(turn.paciente, turn.especialidad, turn.dia, turn.horario, turn.profesional, turn.estado);
          if (T.estado==0) {this.turnosPendientes.push(T);};
          if (T.estado==1) {this.turnosAceptados.push(T);};
          i = i +1;
      }},
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  turnoRechazar(especialidad: string,dia: string, horario: string){
    this.apiService.turnoAceptarCancelar(especialidad,dia,horario,this.profesional,-1).subscribe();
    this.buscarTurnosPropios();
  }

  turnoAceptar(especialidad: string,dia: string, horario: string){
    this.apiService.turnoAceptarCancelar(especialidad,dia,horario,this.profesional,1).subscribe();
    this.buscarTurnosPropios();
  }

  obtenerEstado(estado: number){
    if (estado == 1) {return 'ACEPTADO'}
    else return 'PENDIENTE';
  }

}
