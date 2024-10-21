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
  turnosActivos: Turno[] = [];
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
  especialidadesA: string[] = ['Clínica Médica', 'Cardiología', 'Dermatología', 'Ginecología', 'Oftalmología', 'Pediatría', 'Psiquiatría', 'Neurología', 'Traumatología', 'Urología'];
  diasA: string[] = [];
  horariosA: string[] = [];
  profesionalesA: string[] = [];

  filtroEspecialidad: string = '';
  filtroDia: string = '';
  filtroHorario: string = '';
  filtroProfesional: string = '';
  filtroEspecialidadA: string = '';
  filtroDiaA: string = '';
  filtroHorarioA: string = '';
  filtroProfesionalA: string = '';

  alMenosUnFiltroSeleccionado(): boolean {
    return this.filtroEspecialidad !== '' || this.filtroDia !== '' || this.filtroHorario !== '' || this.filtroProfesional !== '';
  }

  alMenosUnFiltroSeleccionadoA(): boolean {
    return this.filtroEspecialidadA !== '' || this.filtroDiaA !== '' || this.filtroHorarioA !== '' || this.filtroProfesionalA !== '';
  }

  turnosFiltrados() {
    return this.turnosDisponibles.filter(turno =>
      (this.filtroEspecialidad ? turno.especialidad === this.filtroEspecialidad : true) &&
      (this.filtroDia ? turno.dia === this.filtroDia : true) &&
      (this.filtroHorario ? turno.horario === this.filtroHorario : true) &&
      (this.filtroProfesional ? turno.profesional === this.filtroProfesional : true)
    );
  }

  turnosFiltradosA() {
    return this.turnosActivos.filter(turno =>
      (this.filtroEspecialidadA ? turno.especialidad === this.filtroEspecialidadA : true) &&
      (this.filtroDiaA ? turno.dia === this.filtroDiaA : true) &&
      (this.filtroHorarioA ? turno.horario === this.filtroHorarioA : true) &&
      (this.filtroProfesionalA ? turno.profesional === this.filtroProfesionalA : true)
    );
  }

  ngOnInit(): void {
    this.buscarTurnos();
    this.buscarTodosTurnosActivos();
  }

  solicitarTurno(index: number): void {
    this.mostrarCampoEmail = index;
  }

  cancelarTurno(paciente: string, especialidad: string,dia: string, horario: string, profesional: string){
    this.apiService.turnoAceptarCancelar(paciente, especialidad, dia, horario, profesional, -1,'').subscribe();
    this.buscarTodosTurnosActivos();
  }

buscarTurnos(): void{
  this.apiService.verTurnos().subscribe(
    (data: Turno[]) => {
      this.turnosDisponibles = [];
      data.forEach(turno => {
        this.turnosDisponibles.push(new Turno('', turno.especialidad, turno.dia, turno.horario, turno.profesional, 0));
        if (!this.diasA.includes(turno.dia)) {this.dias.push(turno.dia);};
        if (!this.horariosA.includes(turno.horario)) {this.horarios.push(turno.horario);};
        if (!this.profesionalesA.includes(turno.profesional)) {this.profesionales.push(turno.profesional);};
      });
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

buscarTodosTurnosActivos(): void{
  this.apiService.verTodosTurnosActivos().subscribe(
    (data: Turno[]) => {
      this.turnosActivos = [];
      data.forEach(turno => {
        this.turnosActivos.push(new Turno(turno.paciente, turno.especialidad, turno.dia, turno.horario, turno.profesional, turno.estado));
        if (!this.diasA.includes(turno.dia)) {this.diasA.push(turno.dia);};
        if (!this.horariosA.includes(turno.horario)) {this.horariosA.push(turno.horario);};
        if (!this.profesionalesA.includes(turno.profesional)) {this.profesionalesA.push(turno.profesional);};
      });
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

asignarTurno(paciente: string, especialidad: string, dia: string, horario: string, profesional: string){
  if (this.emailTemporal) {
    var nuevoTurno = new Turno(paciente, especialidad, dia, horario, profesional, 0);
    this.apiService.insertarTurno(nuevoTurno).subscribe();
    this.ventanaActivaService.cambiarVentana('gestionTurnosGerente');
  }
}

refrescar() {this.ventanaActivaService.refrescar('gestionTurnosGerente')};

}
