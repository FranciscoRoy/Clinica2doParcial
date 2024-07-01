import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Profesional } from '../../../clases/usuario';
import { ApiService } from '../../../servicios/api.service';
import { VentanaActivaService } from '../../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-registro-profesional',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-profesional.component.html',
  styleUrl: './registro-profesional.component.css'
})
export class RegistroProfesionalComponent {
  registroFormProfesional: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private ventanaActivaService: VentanaActivaService
  ) {

    this.registroFormProfesional = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      especialidad: ['', Validators.required],
      diasAtencion: ['', Validators.required],
      pass: ['', Validators.required],
      secreto: ['', Validators.required],
      segundaPalabraSecreta: ['', Validators.required],
    });

  }

  onSubmit() {
    if (this.registroFormProfesional.valid) {
      const nuevoProfesional = new Profesional(
        this.registroFormProfesional.value.nombre,
        this.registroFormProfesional.value.apellido,
        this.registroFormProfesional.value.email,
        this.registroFormProfesional.value.especialidad,
        this.registroFormProfesional.value.diasAtencion,
        this.registroFormProfesional.value.pass,
        this.registroFormProfesional.value.secreto,
        this.registroFormProfesional.value.segundaPalabraSecreta);
      this.registrarProfesional(nuevoProfesional);
    } else {
      console.log('El formulario no es válido');
    }
  }

  registrarProfesional(nuevoProfesional: Profesional){
    this.apiService.insertarProfesional(nuevoProfesional).subscribe(t=>{});
    this.ventanaActivaService.cambiarVentana('ingreso');
  }

}
