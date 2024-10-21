import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Turno } from '../../clases/turno';
import { ApiService } from '../../servicios/api.service';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-valoraciones',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './valoraciones.component.html',
  styleUrl: './valoraciones.component.css'
})
export class ValoracionesComponent {
  turnosFinalizados: Turno[] = [];
  emailPaciente: string = '';
  calificaciones: number[] = [];

  constructor(
    private apiService: ApiService,
    private usuarioActivoService: UsuarioActivoService,
  ){}


  ngOnInit(): void {
    this.emailPaciente = this.usuarioActivoService.getUsuarioActivo().email;
    this.buscarTurnosFinalizados();
  }

buscarTurnosFinalizados(): void{
  this.apiService.verTurnosFinalizados(this.emailPaciente).subscribe(
    (data: Turno[]) => {
      this.turnosFinalizados = [];
      data.forEach(turno => {
        this.turnosFinalizados.push(new Turno(turno.paciente, turno.especialidad, turno.dia, turno.horario, turno.profesional, turno.estado));
      });
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

valorar(turno: any, calificacion: number) {
  if (calificacion) {
    this.apiService.calificarProfesional(turno, calificacion).subscribe();
  } else {
    console.error('Seleccione una calificación antes de valorar.');
  }
}

}