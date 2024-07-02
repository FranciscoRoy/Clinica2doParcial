import { Component, Input } from '@angular/core';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {
  @Input() tipoUsuario: string;

  constructor(
    private apiService: ApiService
  ){
    this.tipoUsuario = 'Invitado';
  }

  private seleccionarTabla(tipoUsuario: string): string {
    switch (tipoUsuario) {
      case 'Paciente':
        return 'direccion base pacientes';
      case 'Profesional':
        return 'direccion base profesionales';
      case 'Gerente':
        return 'direccion base gerentes';
      default:
        return 'direccion base logs-error';
    }
  }

}
