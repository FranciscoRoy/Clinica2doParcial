import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-espera',
  standalone: true,
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css'],
  imports: [NgIf]
})

export class EsperaComponent implements OnInit {
  @Input() tiempoEspera: number = 10;
  @Input() ventanaDestino: string = 'inicio';
  public imagenUrl: string = 'https://cdn.pixabay.com/animation/2022/08/15/19/03/19-03-25-52_512.gif';
  mensaje: string = 'Recopilando información...';
  mostrandoGif: boolean = true;

  constructor(
    private ventanaActivaService: VentanaActivaService,
  ) { }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.mostrandoGif = false;
      this.ventanaActivaService.cambiarVentana(this.ventanaDestino);
    }, this.tiempoEspera*1000);
  }

  
}
