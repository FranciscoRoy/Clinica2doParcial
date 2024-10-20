import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Profesional } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-gestionusuarios',
  standalone: true,
  imports: [NgFor],
  templateUrl: './gestionusuarios.component.html',
  styleUrl: './gestionusuarios.component.css'
})
export class GestionusuariosComponent implements OnInit{
  usuariosActivos: Profesional[] = [];
  usuariosPendientes: Profesional[] = [];
  
  constructor(
    private apiService: ApiService,
  ){}

  ngOnInit(): void {
    this.buscarProfesionalesActivos();
    this.buscarProfesionalesPendientes();
  }

  buscarProfesionalesActivos(){
    this.usuariosActivos = [];
    this.apiService.buscarProfesionalesPorEstado(1).subscribe(
      (data: Profesional[]) => {
        var i = 0;
        for (const prof of data) {
          var P = new Profesional(prof.nombre, prof.apellido, prof.dni, prof.email, '*******',prof.foto, prof.especialidad, prof.diasAtencion, prof.inicioAtencion, prof.finAtencion, prof.fotoEsp);
          this.usuariosActivos[i] = P;
          i = i +1;
      }},
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  buscarProfesionalesPendientes(){
    this.usuariosPendientes = [];
    this.apiService.buscarProfesionalesPorEstado(0).subscribe(
      (data: Profesional[]) => {
        var i = 0;
        for (const prof of data) {
          var P = new Profesional(prof.nombre, prof.apellido, prof.dni, prof.email, '*******',prof.foto, prof.especialidad, prof.diasAtencion, prof.inicioAtencion, prof.finAtencion, prof.fotoEsp);
          this.usuariosPendientes[i] = P;
          i = i +1;
      }},
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  profesionalHabilitarDeshabilitar(email: string, estado: number){
    this.apiService.profesionalesActivarDesactivar(email,estado).subscribe();
  }

  exportarPDF() {
    console.log('funcion ejecutada');
    const doc = new jsPDF();
    console.log(doc);
    
    // Cargar el logo
    const img = new Image();
    //img.src = this.logoUrl;

    /*
    img.onload = () => {
      // Agregar el logo
      doc.addImage(img, 'PNG', 10, 10, 50, 20); // Posición y tamaño del logo en el PDF
    */

    // Título
    doc.setFontSize(16);
    doc.text('Nómina de Especialistas', 70, 30);

    // Agregar la lista de especialistas
    let y = 50; // Posición inicial para el contenido
    this.usuariosActivos.forEach(especialista => {
      doc.setFontSize(12);
      doc.text(`Nombre: ${especialista.nombre}`, 20, y);
      doc.text(`Especialidad: ${especialista.especialidad}`, 120, y);
      y += 10; // Espacio entre filas
    });

    // Descargar el PDF
    console.log(doc);
    doc.save('nomina_especialistas.pdf');
  };
}

