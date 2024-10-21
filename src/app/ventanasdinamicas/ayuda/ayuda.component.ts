import { Component } from '@angular/core';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {

  constructor(
    private ventanaActivaService: VentanaActivaService,
  ){}

  verProfesionales(){
    this.ventanaActivaService.cambiarVentana('listaespecialistas');
  }

  refrescar() {this.ventanaActivaService.refrescar('ayuda')};

}
