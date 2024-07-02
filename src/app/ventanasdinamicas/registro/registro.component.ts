import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Paciente, Profesional } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  @Input() tipoUsuario: string;
  formularioGeneral: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private ventanaActivaService: VentanaActivaService
  ) {
    this.tipoUsuario = 'Invitado';

    this.formularioGeneral = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      foto: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.formularioGeneral.valid) {
      const nuevoPaciente = new Paciente(
        this.formularioGeneral.value.nombre,
        this.formularioGeneral.value.apellido,
        this.formularioGeneral.value.dni,
        this.formularioGeneral.value.email,
        this.formularioGeneral.value.password,
        this.formularioGeneral.value.foto);
      this.registrarPaciente(nuevoPaciente);
    } else {
      console.log('El formulario no es válido');
    }
  }

  registrarPaciente(nuevoPaciente: Paciente){
    this.apiService.insertarPaciente(nuevoPaciente).subscribe();
    this.ventanaActivaService.cambiarVentana('ingreso');
  }

  registrarProfesional(nuevoProfesional: Profesional){
    this.apiService.insertarProfesional(nuevoProfesional).subscribe();
    this.ventanaActivaService.cambiarVentana('ingreso');
  }

}

