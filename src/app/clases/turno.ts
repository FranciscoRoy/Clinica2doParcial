export class Turno {
    paciente: string;
    especialidad: string;
    dia: string;
    horario: string;
    profesional: string;

    constructor(paciente: string, especialidad: string, dia: string, horario: string, profesional: string){
        this.paciente = paciente;
        this.especialidad = especialidad;
        this.dia = dia;
        this.horario = horario;
        this.profesional = profesional;
    }

}