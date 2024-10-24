import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Gerente, Paciente, Profesional } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  @Input() tipoUsuario: string;
  formularioGeneral: FormGroup;
  formularioProfesional: FormGroup;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  diasSeleccionados: string[] = [];
  horarios: string[] = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
  horariosfin: string[] = [];
  inicioSeleccionado: string = '';
  finSeleccionado: string = '';
  inicioAtencionSeleccionados: string[] = [];
  finAtencionSeleccionados: string[] = [];
  especialidades: string[] = ['Clínica Médica', 'Cardiología', 'Dermatología', 'Ginecología', 'Oftalmología', 'Pediatría', 'Psiquiatría', 'Neurología', 'Traumatología', 'Urología'];
  
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
      inicioAtencion: ['', Validators.required],
      finAtencion: ['', Validators.required],
      fotoEsp: ['', Validators.required]
    });

  }

  onDiaChange(event: any): void {
    const dia = event.target.value;
    if (event.target.checked) {
      this.diasSeleccionados.push(dia);
    } else {
      const index = this.diasSeleccionados.indexOf(dia);
      if (index > -1) {
        this.diasSeleccionados.splice(index, 1);
      }
    }
    this.formularioProfesional.patchValue({
      diasAtencion: this.diasSeleccionados.join('/')
    });
  }

  onInicioAtencionChange(event: any, dia: string): void {
    const inicio = event.target.value;
    if (event.target.value) {
      this.inicioAtencionSeleccionados.push(inicio);
    } else {
      const index = this.diasSeleccionados.indexOf(dia);
      if (index > -1) {
        this.inicioAtencionSeleccionados.splice(index, 1);
      }
    }
    this.formularioProfesional.patchValue({
      inicioAtencion: this.inicioAtencionSeleccionados.join('/')
    });
    const indexInicio = this.horarios.indexOf(inicio);
    this.horariosfin = this.horarios.slice(indexInicio+1);

  }

  onFinAtencionChange(event: any, dia: string): void {
    const fin = event.target.value;
    if (event.target.value) {
      this.finAtencionSeleccionados.push(fin);
    } else {
      const index = this.diasSeleccionados.indexOf(dia);
      if (index > -1) {
        this.finAtencionSeleccionados.splice(index, 1);
      }
    }
    this.formularioProfesional.patchValue({
      finAtencion: this.finAtencionSeleccionados.join('/')
    });
  }

  fotoSeleccionada(event: any): void {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          const originalWidth = img.width;
          const originalHeight = img.height;
  
          // Determinamos el lado más corto y ajustamos el recorte
          let cropX = 0, cropY = 0, cropSize = 0;
  
          if (originalWidth > originalHeight) {
            cropSize = originalHeight;
            cropX = (originalWidth - cropSize) / 2;  // Recorte desde ambos lados del ancho
          } else {
            cropSize = originalWidth;
            cropY = (originalHeight - cropSize) / 2;  // Recorte desde ambos lados del alto
          }
  
          // Redimensionamos la imagen recortada a 300x300
          canvas.width = 300;
          canvas.height = 300;
  
          // Dibujamos la imagen recortada en el canvas
          ctx?.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, 300, 300);
  
          let quality = 0.9;  // Iniciamos con una calidad del 90%
          let resizedBase64 = canvas.toDataURL('image/jpeg', quality);
  
          // Convertimos la base64 a un Blob para medir el tamaño
          const blob = this.base64ToBlob(resizedBase64);
  
          // Reducimos la calidad si el tamaño del archivo es mayor a 100KB
          while (blob.size > 100 * 1024 && quality > 0.1) {
            quality -= 0.1;  // Reducimos la calidad
            resizedBase64 = canvas.toDataURL('image/jpeg', quality);
          }
  
          // Actualizamos el formulario con la imagen comprimida
          this.formularioGeneral.patchValue({
            foto: resizedBase64.split(',')[1]  // eliminamos el prefijo 'data:image/jpeg;base64,'
          });
        };
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  // Función para convertir base64 a Blob
  base64ToBlob(base64: string): Blob {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], { type: mimeString });
  }

  fotoEspSeleccionada(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = 300;
          canvas.height = 300;
          
          ctx?.drawImage(img, 0, 0, 300, 300);
          
          const resizedBase64 = canvas.toDataURL('image/png').split(',')[1];
          
          this.formularioProfesional.patchValue({
            foto: resizedBase64
          });
        };
      };
  
      reader.readAsDataURL(file);
    }
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
        this.formularioProfesional.value.inicioAtencion,
        this.formularioProfesional.value.finAtencion,
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
    this.ventanaActivaService.navegar('inicio',6);
  }

  registrarProfesional(nuevoProfesional: Profesional){
    this.apiService.insertarProfesional(nuevoProfesional).subscribe();
    this.ventanaActivaService.navegar('inicio',6);
  }

  registrarGerente(nuevoGerente: Gerente){
    this.apiService.insertarGerente(nuevoGerente).subscribe();
    this.ventanaActivaService.navegar('inicio',6);
  }

}

