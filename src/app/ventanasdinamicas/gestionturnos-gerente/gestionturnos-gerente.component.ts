import { Component, OnInit } from '@angular/core';
import { Turno } from '../../clases/turno';
import { ApiService } from '../../servicios/api.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionturnos-gerente',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './gestionturnos-gerente.component.html',
  styleUrl: './gestionturnos-gerente.component.css'
})
export class GestionturnosGerenteComponent implements OnInit{
  turnosDisponibles: Turno[] = [];
  emailTemporal: string = '';
  mostrarCampoEmail: number | null = null;

  constructor(
    private apiService: ApiService,
    private ventanaActivaService: VentanaActivaService
  ){}

  especialidades: string[] = ['Clínica Médica', 'Cardiología', 'Dermatología', 'Ginecología', 'Oftalmología', 'Pediatría', 'Psiquiatría', 'Neurología', 'Traumatología', 'Urología'];
  dias: string[] = [];
  horarios: string[] = [];
  profesionales: string[] = [];

  filtroEspecialidad: string = '';
  filtroDia: string = '';
  filtroHorario: string = '';
  filtroProfesional: string = '';

  alMenosUnFiltroSeleccionado(): boolean {
    return this.filtroEspecialidad !== '' || this.filtroDia !== '' || this.filtroHorario !== '' || this.filtroProfesional !== '';
  }

  turnosFiltrados() {
    return this.turnosDisponibles.filter(turno =>
      (this.filtroEspecialidad ? turno.especialidad === this.filtroEspecialidad : true) &&
      (this.filtroDia ? turno.dia === this.filtroDia : true) &&
      (this.filtroHorario ? turno.horario === this.filtroHorario : true) &&
      (this.filtroProfesional ? turno.profesional === this.filtroProfesional : true)
    );
  }

  ngOnInit(): void {
    this.buscarTurnos();
  }

  solicitarTurno(index: number): void {
    this.mostrarCampoEmail = index;
  }

buscarTurnos(): void{
  this.apiService.verTurnos().subscribe(
    (data: Turno[]) => {
      this.turnosDisponibles = [];
      data.forEach(turno => {
        this.turnosDisponibles.push(new Turno('', turno.especialidad, turno.dia, turno.horario, turno.profesional, 0));
        if (!this.dias.includes(turno.dia)) {this.dias.push(turno.dia);};
        if (!this.horarios.includes(turno.horario)) {this.horarios.push(turno.horario);};
        if (!this.profesionales.includes(turno.profesional)) {this.profesionales.push(turno.profesional);};
      });
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

/*
buscarTurnos(): void{
  this.apiService.verTurnos().subscribe(
    (data: Turno[]) => {
      this.turnosDisponibles = [];
      data.forEach(turno => {
        this.turnosDisponibles.push(new Turno('', turno.especialidad, turno.dia, turno.horario, turno.profesional, 0));
      });
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}
*/

asignarTurno(paciente: string, especialidad: string, dia: string, horario: string, profesional: string){
  if (this.emailTemporal) {
    var nuevoTurno = new Turno(paciente, especialidad, dia, horario, profesional, 0);
    this.apiService.insertarTurno(nuevoTurno).subscribe();
    this.ventanaActivaService.cambiarVentana('gestionTurnosGerente');
  }
}


}
