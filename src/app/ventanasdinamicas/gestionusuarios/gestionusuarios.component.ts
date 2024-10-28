import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Profesional } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import logoClinicaData from '../../archivos/logo_clinica.json';

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
  imagenData: string = '';

  constructor(
    private apiService: ApiService,
    private ventanaActivaService: VentanaActivaService,
  ){}

  ngOnInit(): void {
    this.buscarProfesionalesActivos();
    this.buscarProfesionalesPendientes();
    this.imagenData = logoClinicaData.toString();
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
    this.ventanaActivaService.navegar('gestionUsuarios',3);
  }

  exportarPDF() {
    const doc = new jsPDF();
  
    const img = new Image();
    img.src = 'data:image/png;base64,' + this.imagenData;
    //img.src = "https://i.imgur.com/jl2GOv8.png";

    img.onload = () => {
      doc.addImage(img, 'PNG', 15, 5, 40, 40);
      this.generarPDF(doc);
    };
  }

  generarPDF(doc: jsPDF) {
    doc.setFontSize(16);
    doc.text('Nómina de Especialistas', 70, 30);
  
    //POSICION TEXTO
    let y = 50;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;
  
    this.usuariosActivos.forEach((especialista, index) => {
      //CONTROL DE PAGINAS
      if (y + lineHeight > pageHeight - 10) { 
        doc.addPage();
        y = 20;
      }
  
      doc.setFontSize(10);
      doc.text(`${especialista.nombre + ' ' + especialista.apellido}`, 20, y);
      doc.text(`${especialista.dni}`, 60, y);
      doc.text(`${especialista.especialidad}`, 100, y);
      doc.text(`${especialista.email}`, 140, y);
      y += lineHeight;
    });
  
    doc.save('nomina_especialistas.pdf');
  }

}

