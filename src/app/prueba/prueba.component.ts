import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [NgFor],
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
  public pacientes: any[] = [];

  constructor(private apiService: ApiService) {}

  public insertarUsuario(): void {
    console.log('hola inserto 1');
    this.apiService.insertarPersona().subscribe(t=>
      console.log(t)
    );
    console.log('hola inserto 5');
  }

}

