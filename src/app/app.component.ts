import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarrademenuComponent } from './ventanasestaticas/barrademenu/barrademenu.component';
import { VentanacentralComponent } from './ventanasestaticas/ventanacentral/ventanacentral.component';
import { PiedepaginaComponent } from './ventanasestaticas/piedepagina/piedepagina.component';
import { PublicidadComponent } from "./ventanasestaticas/publicidad/publicidad.component";
import { VentanausuarioComponent } from "./ventanasestaticas/ventanausuario/ventanausuario.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, BarrademenuComponent, VentanacentralComponent, PiedepaginaComponent, PublicidadComponent, VentanausuarioComponent]
})
export class AppComponent {
  title = 'clinicamedica';
}