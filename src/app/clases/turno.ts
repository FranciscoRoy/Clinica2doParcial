export class Turno {
    paciente: string;
    especialidad: string;
    dia: string;
    horario: string;
    profesional: string;
    estado: number = 0;

    constructor(paciente: string, especialidad: string, dia: string, horario: string, profesional: string, estado: number){
        this.paciente = paciente;
        this.especialidad = especialidad;
        this.dia = dia;
        this.horario = horario;
        this.profesional = profesional;
        this.estado = estado;
    }

}