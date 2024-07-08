import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Turno } from '../../clases/turno';
import { ApiService } from '../../servicios/api.service';
import { Profesional } from '../../clases/usuario';

@Component({
  selector: 'app-gestionturnos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './gestionturnos.component.html',
  styleUrl: './gestionturnos.component.css'
})
export class GestionturnosComponent implements OnInit{
  profesionalesActivos: Profesional[] = [];
  turnosDeProfesionales: Turno[] = [];

  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit(): void {
    this.buscarTodosProfesionales();
    console.log(this.profesionalesActivos); //este funciona
    console.log(this.profesionalesActivos[0]); //este no - undefined
    /* NI SIQUIERA ENTRA ACA
    for (const P of this.profesionalesActivos){
      console.log(P);
    }
    */
    this.generarTurnos();
  }

  //TRAE TODOS LOS PROFESIONALES ACTIVOS
  buscarTodosProfesionales(): void{
    this.profesionalesActivos = [];
    this.apiService.buscarTodosProfesionales().subscribe(
      (data: Profesional[]) => {
        var i = 0;
        for (const prof of data) {
          var P = new Profesional(prof.nombre, prof.apellido, prof.dni, prof.email, '*******',prof.foto, prof.especialidad, prof.diasAtencion, prof.fotoEsp);
          this.profesionalesActivos[i] = P;
          i = i +1;
        //data.forEach(prof => {this.profesionalesActivos.push(new Profesional(prof.nombre, prof.apellido, prof.dni, prof.email, '*******',prof.foto, prof.especialidad, prof.diasAtencion, prof.fotoEsp));});
      }},
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  //GENERA TURNOS - NO FUNCIONA EL FOR
  generarTurnos(): void {
    const horarioInicio = 9;
    const horarioFin = 16;
    this.turnosDeProfesionales = [];

    for (const prof of this.profesionalesActivos){
      const diasArray = prof.diasAtencion.split('/');
      for (const dia of diasArray) {
        for (let hora = horarioInicio; hora < horarioFin; hora++) {
            const horario = `${hora}:00 - ${hora + 1}:00`;
            this.turnosDeProfesionales.push(new Turno('',prof.especialidad,dia,horario,`${prof.nombre} ${prof.apellido}`));
        }
      }
    }

  }

}


