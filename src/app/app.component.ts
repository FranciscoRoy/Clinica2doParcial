import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraDeMenuComponent } from './ventanasestaticas/barrademenu/barrademenu.component';
import { VentanacentralComponent } from './ventanasestaticas/ventanacentral/ventanacentral.component';
import { PiedepaginaComponent } from './ventanasestaticas/piedepagina/piedepagina.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, BarraDeMenuComponent, VentanacentralComponent, PiedepaginaComponent]
})
export class AppComponent {
  title = 'clinicamedica';
}