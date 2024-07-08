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


}
