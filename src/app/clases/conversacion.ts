export class Conversacion {
    usuario: string;
    destinatario: string;
    mensajes: Mensaje[] = [];

    constructor(emisor: string, receptor: string, mensajes: Mensaje[]){
        this.usuario = emisor;
        this.destinatario = receptor;
        this.mensajes = mensajes;
    }

}

export class Mensaje {
    emisor: string;
    receptor: string;
    mensaje: string;
    fecha: string;
    hora: string;
    
    constructor(emisor: string, receptor: string, mensaje: string, fecha: string, hora: string){
        this.emisor = emisor;
        this.receptor = receptor;
        this.mensaje = mensaje;
        this.fecha = fecha;
        this.hora = hora;
    }
}

/*
    recuperarMensajes(): void {
        this.apiService.recuperarConversaciones(this.usuario, this.destinatario).subscribe(
            (mensajes: string[]) => {
                this.mensajes = mensajes;
                console.log('Mensajes recuperados:', mensajes);
            },
            (error) => {
                console.error('Error al recuperar mensajes:', error);
            }
        );
    }
*/