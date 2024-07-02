import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Paciente, Profesional } from '../../../clases/usuario';
import { ApiService } from '../../../servicios/api.service';
import { VentanaActivaService } from '../../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-registro-paciente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-paciente.component.html',
  styleUrl: './registro-paciente.component.css'
})

export class RegistroPacienteComponent {
  registroFormPaciente: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private ventanaActivaService: VentanaActivaService
  ) {

    this.registroFormPaciente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      foto: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.registroFormPaciente.valid) {
      const nuevoPaciente = new Paciente(
        this.registroFormPaciente.value.nombre,
        this.registroFormPaciente.value.apellido,
        this.registroFormPaciente.value.dni,
        this.registroFormPaciente.value.email,
        this.registroFormPaciente.value.password,
        this.registroFormPaciente.value.foto);
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