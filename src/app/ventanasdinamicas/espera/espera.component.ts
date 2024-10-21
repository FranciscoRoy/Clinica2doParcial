import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-espera',
  standalone: true,
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.css'],
  imports: [NgIf]
})

export class EsperaComponent {
  @Input() tiempoEspera: number = 10;
  @Input() ventanaDestino: string = 'inicio';
  public imagenUrl: string = 'https://cdn.pixabay.com/animation/2022/08/15/19/03/19-03-25-52_512.gif';
  mensaje: string = 'Recopilando información...';
  mostrandoGif: boolean = true;

  constructor() { }
  
}
