import { Component, Input, OnInit } from '@angular/core';
import logoEspecialidad from '../../archivos/especialidades/pediatria.json';

@Component({
  selector: 'app-tarjetausuario',
  standalone: true,
  imports: [],
  templateUrl: './tarjetausuario.component.html',
  styleUrl: './tarjetausuario.component.css'
})

export class TarjetaUsuarioComponent implements OnInit {
  @Input() nombreUsuario: string = 'Nombre del Usuario';
  @Input() imagenUrl: string = 'ruta/a/imagen.jpg';

  imagenData: string = '';


  ngOnInit() {
    this.imagenData = logoEspecialidad.toString();
  }

}
