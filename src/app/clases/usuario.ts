export interface Usuario {
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    password: string;
    foto: string;
    acceso: number;

    getAcceso(): number;
    getTipoUsuario(): string;
  }
  
  export class UsuariosinIngresar implements Usuario {
    nombre = '';
    apellido = '';
    dni = 0;
    email = '';
    password = '';
    foto = '';
    acceso = 0;

    getAcceso(): number {return this.acceso;}
    getTipoUsuario(): string {return 'Invitado'}

  }

  export class Paciente implements Usuario {
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    password: string;
    foto: string;
    acceso = 1;

    getAcceso(): number {return this.acceso;}
    getTipoUsuario(): string {return 'Paciente'}
  
    constructor(nombre: string, apellido: string, dni: number, email: string, password: string, foto: string) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      this.email = email;
      this.password = password;
      this.foto = foto;
    }
  }

  export interface Profesional extends Usuario {
    especialidad: string;
    diasAtencion: string[];
    fotoEsp: string;
  }
  
  export class Profesional implements Profesional { 
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    password: string;
    foto: string;
    acceso = 2;
    especialidad: string;
    diasAtencion: string[];
    fotoEsp: string;

    getAcceso(): number {return this.acceso;}
    getTipoUsuario(): string {return 'Profesional'}
  
    constructor(
      nombre: string,
      apellido: string,
      dni: number,
      email: string,
      password: string,
      foto: string,
      especialidad: string,
      diasAtencion: string[],
      fotoEsp: string
    ) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      this.email = email;
      this.password = password;
      this.foto = foto;
      this.especialidad = especialidad;
      this.diasAtencion = diasAtencion;
      this.fotoEsp = fotoEsp;
    }
  }
  
  export class Gerente implements Usuario {
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    password: string;
    foto: string;
    acceso = 3;

    getAcceso(): number {return this.acceso;}
    getTipoUsuario(): string {return 'Gerente'}
  
    constructor(nombre: string, apellido: string, dni: number, email: string, password: string, foto: string) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      this.email = email;
      this.password = password;
      this.foto = foto;
    }
  }


