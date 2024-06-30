import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraDeMenuComponent } from './ventanasestaticas/barrademenu/barrademenu.component';
import { VentanacentralComponent } from './ventanasestaticas/ventanacentral/ventanacentral.component';
import { PiedepaginaComponent } from './ventanasestaticas/piedepagina/piedepagina.component';
import { PruebaComponent } from "./prueba/prueba.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, BarraDeMenuComponent, VentanacentralComponent, PiedepaginaComponent, PruebaComponent]
})
export class AppComponent {
  title = 'clinicamedica';
}