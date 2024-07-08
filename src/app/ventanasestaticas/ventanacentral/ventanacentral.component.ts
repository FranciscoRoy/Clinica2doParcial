import { Component, OnInit } from '@angular/core';
import { ErrorComponent } from "../../ventanasdinamicas/error/error.component";
import { IngresoComponent } from "../../ventanasdinamicas/ingreso/ingreso.component";
import { Usuario, UsuariosinIngresar} from '../../clases/usuario';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { InicioComponent } from "../../ventanasdinamicas/inicio/inicio.component";
import { DatospersonalesComponent } from "../../ventanasdinamicas/datospersonales/datospersonales.component";
import { AyudaComponent } from "../../ventanasdinamicas/ayuda/ayuda.component";
import { RegistroComponent } from "../../ventanasdinamicas/registro/registro.component";
import { EsperaComponent } from "../../ventanasdinamicas/espera/espera.component";
import { TurnosComponent } from "../../ventanasdinamicas/turnos/turnos.component";
import { GestionturnosComponent } from "../../ventanasdinamicas/gestionturnos/gestionturnos.component";
import { GestionusuariosComponent } from "../../ventanasdinamicas/gestionusuarios/gestionusuarios.component";
import { GestionturnosProfesionalComponent } from "../../ventanasdinamicas/gestionturnos-profesional/gestionturnos-profesional.component";
import { GestionturnosGerenteComponent } from "../../ventanasdinamicas/gestionturnos-gerente/gestionturnos-gerente.component";

@Component({
    selector: 'app-ventanacentral',
    standalone: true,
    templateUrl: './ventanacentral.component.html',
    styleUrl: './ventanacentral.component.css',
    imports: [ErrorComponent, IngresoComponent, InicioComponent, DatospersonalesComponent, AyudaComponent, RegistroComponent, EsperaComponent, TurnosComponent, GestionturnosComponent, GestionusuariosComponent, GestionturnosProfesionalComponent, GestionturnosGerenteComponent]
})

export class VentanacentralComponent implements OnInit  {
  usuarioActual: Usuario = new UsuariosinIngresar;
  ventanaActivaActual: string = 'inicio';
  tipoUsuarioSolicitante: string = 'Invitado';

  constructor(
    private ventanaActivaService: VentanaActivaService,
  ) { }
  
  ngOnInit(): void {
    this.ventanaActivaService.getVentanaActiva().subscribe(ventanaActiva => {this.ventanaActivaActual = ventanaActiva;})
    this.ventanaActivaService.getTipoUsuarioSolicitado().subscribe(usuarioTipo => {this.tipoUsuarioSolicitante = usuarioTipo;})
  }

}