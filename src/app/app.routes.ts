import { Routes } from '@angular/router';
import { EsperaComponent } from './ventanasdinamicas/espera/espera.component';
import { GestionturnosProfesionalComponent } from './ventanasdinamicas/gestionturnos-profesional/gestionturnos-profesional.component';

export const routes: Routes = [
    { path: 'espera', component: EsperaComponent },
    { path: 'gestionTurnosProfesionales', component: GestionturnosProfesionalComponent },
];
  