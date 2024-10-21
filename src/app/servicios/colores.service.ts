import { Injectable } from '@angular/core';

export interface PaletaColores {
  fondo: string;
  boton: string;
  botonSeleccionado: string;
  borde: string;
  fuente: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColoresService {
  private paletas: { [key: string]: PaletaColores } = {
    azules: {
      fondo: '#ADD8E6', // Celeste
      boton: '#F5F5DC', // Beige
      botonSeleccionado: '#4682B4', // Celeste oscuro
      borde: '#87CEFA', // Azul
      fuente: '#000000' // Negro
    },
    rojos: {
      fondo: '#FFC0CB', // Rosa
      boton: '#F5F5DC', // Beige
      botonSeleccionado: '#C71585', // Rosa oscuro
      borde: '#FF0000', // Rojo
      fuente: '#000000' // Negro
    },
    verdes: {
      fondo: '#90EE90', // Verde claro
      boton: '#F5F5DC', // Beige
      botonSeleccionado: '#008000', // Verde oscuro
      borde: '#008000', // Verde
      fuente: '#000000' // Negro
    },
    grises: {
      fondo: '#FFFFFF', // Blanco
      boton: '#D3D3D3', // Gris claro
      botonSeleccionado: '#A9A9A9', // Gris oscuro
      borde: '#000000', // Negro
      fuente: '#000000' // Negro
    }
  };

  obtenerPaleta(nombre: string): PaletaColores {
    return this.paletas[nombre];
  }

  aplicarPaleta(nombre: string): void {
    const paleta = this.obtenerPaleta(nombre);
    if (paleta) {
      document.documentElement.style.setProperty('--fondo', paleta.fondo);
      document.documentElement.style.setProperty('--boton', paleta.boton);
      document.documentElement.style.setProperty('--botonSeleccionado', paleta.botonSeleccionado);
      document.documentElement.style.setProperty('--borde', paleta.borde);
      document.documentElement.style.setProperty('--fuente', paleta.fuente);
    }
  }

}
