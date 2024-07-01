import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Gerente } from '../../../clases/usuario';
import { ApiService } from '../../../servicios/api.service';
import { VentanaActivaService } from '../../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-registro-gerente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-gerente.component.html',
  styleUrl: './registro-gerente.component.css'
})
export class RegistroGerenteComponent {
  registroFormGerente: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private ventanaActivaService: VentanaActivaService
  ) {

    this.registroFormGerente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      secreto: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.registroFormGerente.valid) {
      const nuevoGerente = new Gerente(
        this.registroFormGerente.value.nombre,
        this.registroFormGerente.value.apellido,
        this.registroFormGerente.value.email,
        this.registroFormGerente.value.pass,
        this.registroFormGerente.value.secreto);
      this.registrarGerente(nuevoGerente);
    } else {
      console.log('El formulario no es válido');
    }
  }

  registrarGerente(nuevoGerente: Gerente){
    this.apiService.insertarGerente(nuevoGerente).subscribe(t=>{});
    this.ventanaActivaService.cambiarVentana('ingreso');
  }
   
}
