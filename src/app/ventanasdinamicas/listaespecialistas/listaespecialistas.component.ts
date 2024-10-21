import { Component } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { VentanaActivaService } from '../../servicios/ventanaactiva.service';
import { Profesional } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js'; 
import { BaseChartDirective } from 'ng2-charts';

// Importa los módulos de Chart.js que vas a utilizar
import { Chart, registerables } from 'chart.js';

// Registra los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-listaespecialistas',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, BaseChartDirective],
  templateUrl: './listaespecialistas.component.html',
  styleUrls: ['./listaespecialistas.component.css']
})
export class ListaespecialistasComponent {
  usuariosActivos: Profesional[] = [];
  filtroEspecialidad: string = '';

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Puntuación de Profesionales',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  constructor(
    private apiService: ApiService,
    private ventanaActivaService: VentanaActivaService
  ) { }

  ngOnInit(): void {
    this.buscarProfesionalesActivos();
  }

  especialidades: string[] = ['Clínica Médica', 'Cardiología', 'Dermatología', 'Ginecología', 'Oftalmología', 'Pediatría', 'Psiquiatría', 'Neurología', 'Traumatología', 'Urología'];

  alMenosUnFiltroSeleccionado(): boolean {
    return this.filtroEspecialidad !== '';
  }

  buscarProfesionalesActivos() {
    this.apiService.buscarProfesionalesPorEstado(1).subscribe(
      (data: Profesional[]) => {
        this.usuariosActivos = data.map(prof => {
          const P = new Profesional(
            prof.nombre,
            prof.apellido,
            prof.dni,
            prof.email,
            '*******',
            prof.foto,
            prof.especialidad,
            prof.diasAtencion,
            prof.inicioAtencion,
            prof.finAtencion,
            prof.fotoEsp
          );
          P.puntuacion = parseFloat((prof.puntuacion / 100).toFixed(2));
          return P;
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // Método para filtrar profesionales
  get profesionalesFiltrados(): Profesional[] {
    return this.usuariosActivos.filter(usuario => 
      this.filtroEspecialidad === '' || usuario.especialidad === this.filtroEspecialidad
    );
  }

  // Actualiza el gráfico con los profesionales filtrados
  actualizarGrafico() {
    const profesionales = this.profesionalesFiltrados;
    const nombres = profesionales.map(prof => prof.nombre + ' ' + prof.apellido);
    const puntuaciones = profesionales.map(prof => prof.puntuacion);

    this.barChartData.labels = nombres;
    this.barChartData.datasets[0].data = puntuaciones;
  }

  // Se ejecuta al cambiar el filtro
  onFiltroEspecialidadChange() {
    this.actualizarGrafico();
  }

  refrescar() { this.ventanaActivaService.refrescar('listaEspecialistas') }
}