import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Gerente, Paciente, Profesional } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  @Input() tipoUsuario: string;
  formularioGeneral: FormGroup;
  formularioProfesional: FormGroup;
  
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

    this.formularioProfesional = this.fb.group({
      especialidad: ['', Validators.required],
      diasAtencion: ['', Validators.required],
      fotoEsp: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.formularioGeneral.valid && this.tipoUsuario == 'Paciente') {
      const ingresante = new Paciente(
        this.formularioGeneral.value.nombre,
        this.formularioGeneral.value.apellido,
        this.formularioGeneral.value.dni,
        this.formularioGeneral.value.email,
        this.formularioGeneral.value.password,
        this.formularioGeneral.value.foto);
      this.registrarPaciente(ingresante);
    } else if ((this.formularioGeneral.valid && this.formularioProfesional.valid && this.tipoUsuario == 'Profesional')) {
      const ingresante = new Profesional(
        this.formularioGeneral.value.nombre,
        this.formularioGeneral.value.apellido,
        this.formularioGeneral.value.dni,
        this.formularioGeneral.value.email,
        this.formularioGeneral.value.password,
        this.formularioGeneral.value.foto,
        this.formularioProfesional.value.especialidad,
        this.formularioProfesional.value.diasAtencion,
        this.formularioProfesional.value.fotoEsp);
      this.registrarProfesional(ingresante);
    } else if (this.formularioGeneral.valid && this.tipoUsuario == 'Gerente') {
      const ingresante = new Gerente(
        this.formularioGeneral.value.nombre,
        this.formularioGeneral.value.apellido,
        this.formularioGeneral.value.dni,
        this.formularioGeneral.value.email,
        this.formularioGeneral.value.password,
        this.formularioGeneral.value.foto);
      this.registrarGerente(ingresante);
    } else {
      console.log('Datos Incompletos.');
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

  registrarGerente(nuevoGerente: Gerente){
    this.apiService.insertarGerente(nuevoGerente).subscribe();
    this.ventanaActivaService.cambiarVentana('ingreso');
  }

}

