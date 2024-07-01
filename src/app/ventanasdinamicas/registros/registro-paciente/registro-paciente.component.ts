import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Paciente } from '../../../clases/usuario';
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
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      secreto: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.registroFormPaciente.valid) {
      const nuevoPaciente = new Paciente(
        this.registroFormPaciente.value.nombre,
        this.registroFormPaciente.value.apellido,
        this.registroFormPaciente.value.email,
        this.registroFormPaciente.value.pass,
        this.registroFormPaciente.value.secreto);
      this.registrarPaciente(nuevoPaciente);
    } else {
      console.log('El formulario no es válido');
    }
  }

  registrarPaciente(nuevoPaciente: Paciente){
    this.apiService.insertarPaciente(nuevoPaciente).subscribe(t=>{});
    this.ventanaActivaService.cambiarVentana('ingreso');
  }
   
}