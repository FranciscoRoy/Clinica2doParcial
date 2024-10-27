import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { Gerente, Paciente, Profesional } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { NgFor, NgIf } from '@angular/common';
import especialidadesData from '../../clases/lista_especialidades.json';
import horariosData from '../../clases/lista_horarios.json';

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
  
  especialidades: string[] = [];
  horarios: string[] = [];

  horariosfin: string[][] = [[], [], [], [], [], []];
  inicioSeleccionado: string = '';
  finSeleccionado: string = '';

  diasSeleccionados: string[] = [];

  inicioAtencionSeleccionados: string[] = [];
  finAtencionSeleccionados: string[] = [];

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

  ngOnInit(): void {
    especialidadesData.forEach(especialidad => {this.especialidades.push(especialidad);});
    horariosData.forEach(horario => {this.horarios.push(horario);});
  }

  onDiaChange(event: any, index: number): void {
    const dia = event.target.value;
    if (event.target.checked) {
      this.diasSeleccionados.push(dia);
    } else {
      if (index > -1) {
        this.diasSeleccionados.splice(index, 1);
      }
    }
    this.formularioProfesional.patchValue({diasAtencion: this.diasSeleccionados.join('/')});
  }

  onInicioAtencionChange(event: any, index: number): void {
    const inicio = event.target.value;
    if (event.target.value) {
      this.inicioAtencionSeleccionados.push(inicio);
    } else {
      if (index > -1) {
        this.inicioAtencionSeleccionados.splice(index, 1);
      }
    }
    this.formularioProfesional.patchValue({
      inicioAtencion: this.inicioAtencionSeleccionados.join('/')
    });
    var indexInicio = this.horarios.indexOf(inicio);
    this.horariosfin[index] = this.horarios.slice(indexInicio+1);
  }

  onFinAtencionChange(event: any, index: number): void {
    const fin = event.target.value;
    if (event.target.value) {
      this.finAtencionSeleccionados.push(fin);
    } else {
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
  
          //RECORTE
          let cropX = 0, cropY = 0, cropSize = 0;
  
          if (originalWidth > originalHeight) {
            cropSize = originalHeight;
            cropX = (originalWidth - cropSize) / 2;
          } else {
            cropSize = originalWidth;
            cropY = (originalHeight - cropSize) / 2;
          }
  
          //CAMBIO DE TAMAÑO
          canvas.width = 150;
          canvas.height = 150;
  
          ctx?.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, 150, 150);
  
          //CALIDAD
          let quality = 0.9;
          let resizedBase64 = canvas.toDataURL('image/jpeg', quality);
  
          const blob = this.base64ToBlob(resizedBase64);
  
          //AJUSTE TAMAÑO
          while (blob.size > 100 * 1024 && quality > 0.1) {
            quality -= 0.1;
            resizedBase64 = canvas.toDataURL('image/jpeg', quality);
          }
  
          this.formularioGeneral.patchValue({
            foto: resizedBase64.split(',')[1]
          });
        };
      };
  
      reader.readAsDataURL(file);
    }
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
  
          const originalWidth = img.width;
          const originalHeight = img.height;
  
          //RECORTE
          let cropX = 0, cropY = 0, cropSize = 0;
  
          if (originalWidth > originalHeight) {
            cropSize = originalHeight;
            cropX = (originalWidth - cropSize) / 2;
          } else {
            cropSize = originalWidth;
            cropY = (originalHeight - cropSize) / 2;
          }
  
          //CAMBIO DE TAMAÑO
          canvas.width = 150;
          canvas.height = 150;
  
          ctx?.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, 150, 150);
  
          //CALIDAD
          let quality = 0.9;
          let resizedBase64 = canvas.toDataURL('image/jpeg', quality);
  
          const blob = this.base64ToBlob(resizedBase64);
  
          //AJUSTE TAMAÑO
          while (blob.size > 100 * 1024 && quality > 0.1) {
            quality -= 0.1;
            resizedBase64 = canvas.toDataURL('image/jpeg', quality);
          }
  
          this.formularioProfesional.patchValue({
            fotoEsp: resizedBase64.split(',')[1]
          });
        };
      };
  
      reader.readAsDataURL(file);
    }
  }

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

