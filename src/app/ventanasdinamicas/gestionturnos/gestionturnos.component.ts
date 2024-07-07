import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Turno } from '../../clases/turno';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-gestionturnos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './gestionturnos.component.html',
  styleUrl: './gestionturnos.component.css'
})
export class GestionturnosComponent implements OnInit{
  turnos: Turno[] = [];

  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit(): void {
    //this.usuario = this.usuarioActivoService.getUsuarioActivo();
    this.buscarTurnosDisponibles();
  }

  buscarTurnosDisponibles(){
    this.apiService.verTurnosDisponibles().subscribe(
      (data: Turno[]) => {
        this.turnos = [];
        data.forEach(turno => {
          this.turnos.push(new Turno('',turno.especialidad, turno.dia, turno.horario, turno.profesional));
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


}
