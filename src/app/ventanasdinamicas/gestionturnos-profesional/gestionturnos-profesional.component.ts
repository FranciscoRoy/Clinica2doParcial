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

  turnoRechazar(paciente: string, especialidad: string, dia: string, horario: string){
    this.apiService.turnoAceptarCancelar(paciente, especialidad,dia,horario,this.profesional,-1).subscribe();
    this.buscarTurnosPropios();
  }

  turnoAceptar(paciente: string, especialidad: string,dia: string, horario: string){
    this.apiService.turnoAceptarCancelar(paciente,especialidad,dia,horario,this.profesional,1).subscribe();
    this.buscarTurnosPropios();
  }

  turnoFinalizar(paciente: string, especialidad: string, dia: string, horario: string){
    this.apiService.turnoAceptarCancelar(paciente, especialidad,dia,horario,this.profesional,2).subscribe();
    //ACA VA LA NAVEGACION A ESCRIBIR EL REPORTE
  }

  obtenerEstado(estado: number){
    if (estado == 1) {return 'ACEPTADO'}
    else return 'PENDIENTE';
  }

  descargarTurnosCSV() {
    const csvContent = this.generarCSV(this.turnosAceptados);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'turnos_tomados.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  generarCSV(turnos: Turno[]): string {
    const headers = 'Paciente, Especialidad, Fecha, Horario\n';
    const rows = turnos.map(turno => {
      return `${this.eliminarTildes(turno.paciente)}, ${this.eliminarTildes(turno.dia)}, ${turno.horario}`;
    });

    return headers + rows.join('\n');
  }

  eliminarTildes(palabra: string): string {
    let nuevaPalabra = '';

    for (let letra of palabra) {
        if (letra === 'á') {
            nuevaPalabra += 'a';
        } else if (letra === 'é') {
            nuevaPalabra += 'e';
        } else if (letra === 'í') {
            nuevaPalabra += 'i';
        } else if (letra === 'ó') {
            nuevaPalabra += 'o';
        } else if (letra === 'ú') {
            nuevaPalabra += 'u';
        } else {
            nuevaPalabra += letra;
        }
    }
    return nuevaPalabra;
  }

}
