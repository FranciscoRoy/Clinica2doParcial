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
  turnosDisponibles: Turno[] = [];

  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit(): void {
    this.buscarTurnos();
  }

buscarTurnos(): void{
  this.apiService.verTurnos().subscribe(
    (data: Turno[]) => {
      this.turnosDisponibles = [];
      data.forEach(turno => {
        this.turnosDisponibles.push(new Turno('', turno.especialidad, turno.dia, turno.horario, turno.profesional));
      });
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}


}
