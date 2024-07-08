import { Component, OnInit } from '@angular/core';
import { Usuario, UsuariosinIngresar } from '../../clases/usuario';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { ApiService } from '../../servicios/api.service';
import { Turno } from '../../clases/turno';
import { NgFor } from '@angular/common';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent implements OnInit {
  usuario: Usuario = new UsuariosinIngresar();
  turnosUsuario: Turno[] = [];
  
  constructor(
    private usuarioActivoService: UsuarioActivoService,
    private apiService: ApiService,
    private ventanaActivaService: VentanaActivaService,
  ) {}

  ngOnInit(): void {
    this.usuario = this.usuarioActivoService.getUsuarioActivo();
    this.buscarTurnosActivos();
  }

  buscarTurnosActivos(){
    this.apiService.verTurnosActivos(this.usuario.email).subscribe(
      (data: Turno[]) => {
        this.turnosUsuario = [];
        data.forEach(turno => {
          this.turnosUsuario.push(new Turno(turno.paciente, turno.especialidad, turno.dia, turno.horario, turno.profesional, turno.estado));
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  solicitarTurno(){
    this.ventanaActivaService.cambiarVentana('gestionTurnos');
  }

  mostrarEstadoTurno(estado: number): string{
    if (estado===1) {return 'ACEPTADO'}
    return 'PENDIENTE';
  }
  
  eliminarTurno(){

  }

}