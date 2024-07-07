import { Component, OnInit } from '@angular/core';
import { Usuario, UsuariosinIngresar } from '../../clases/usuario';
import { UsuarioActivoService } from '../../servicios/usuario-activo.service';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent implements OnInit {
  usuario: Usuario = new UsuariosinIngresar();

  constructor(
    private usuarioActivoService: UsuarioActivoService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.usuario = this.usuarioActivoService.getUsuarioActivo();
  }
  
}