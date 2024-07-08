import { Component, Input } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Gerente, Paciente, Profesional } from '../../clases/usuario';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {
  @Input() tipoUsuario: string;
  usuarioBuscado: any;
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private usuarioActivoService: UsuarioActivoService,
    private ventanaActivaService: VentanaActivaService,
  ){
    this.tipoUsuario = 'Invitado';
  }

ingreso(){
  switch (this.tipoUsuario) {
    case 'Paciente':
      this.ingresarComoPaciente();
      break;
    case 'Profesional':
      this.ingresarComoProfesional();
      break;
    case 'Gerente':
      this.ingresarComoGerente();
      break;
    default:
      console.error('Tipo de usuario no válido');
      break;
  };
  setTimeout(() => {
    this.usuarioActivoService.setUsuarioActivo(this.usuarioBuscado);
    this.ventanaActivaService.cambiarVentana('inicio');
  }, 2500);
}

ingresarComoPaciente(){
  this.apiService.buscarPaciente(this.email,this.password).subscribe(
    (data: Paciente) => {
      this.usuarioBuscado = new Paciente (data.nombre, data.apellido, data.dni, data.email, '*******', data.foto);
      //console.log(this.usuarioBuscado);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

ingresarComoProfesional(){
  this.apiService.buscarProfesional(this.email,this.password).subscribe(
    (data: Profesional) => {
      this.usuarioBuscado = new Profesional (data.nombre, data.apellido, data.dni, data.email, '*******', data.foto, '', '', '');
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

ingresarComoGerente(){
  this.apiService.buscarGerente(this.email,this.password).subscribe(
    (data: Gerente) => {
      this.usuarioBuscado = new Gerente(data.nombre, data.apellido, data.dni, data.email, '*******', data.foto);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}


}
