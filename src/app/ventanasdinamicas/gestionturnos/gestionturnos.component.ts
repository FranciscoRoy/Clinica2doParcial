import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Turno } from '../../clases/turno';
import { ApiService } from '../../servicios/api.service';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-gestionturnos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './gestionturnos.component.html',
  styleUrl: './gestionturnos.component.css'
})
export class GestionturnosComponent implements OnInit{
  turnosDisponibles: Turno[] = [];
  emailPaciente: string = '';

  constructor(
    private apiService: ApiService,
    private usuarioActivoService: UsuarioActivoService,
    private ventanaActivaService: VentanaActivaService
  ){}

  ngOnInit(): void {
    this.emailPaciente = this.usuarioActivoService.getUsuarioActivo().email;
    this.buscarTurnos();
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

solicitarTurno(paciente: string, especialidad: string, dia: string, horario: string, profesional: string){
  var nuevoTurno = new Turno(paciente, especialidad, dia, horario, profesional, 0);
  this.apiService.insertarTurno(nuevoTurno).subscribe();
  this.ventanaActivaService.cambiarVentana('turnos');
}


}
