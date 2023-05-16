class chatMensajes{
    mensajes:any[] = [];
    usuarios = {};
    constructor(){
       

    }

    get ultimos10(){
        this.mensajes = this.mensajes.splice(0,10);
        return this.mensajes;
    }

    get usuariosArr(){
        return Object.values(this.usuarios);
    }

    enviarMensaje(uid:string,nombre:string,mensaje:string){

    }
}

class Mensaje{
    uid:string;
    nombre:string;
    mensaje:string;

    constructor(uid:string,nombre:string,mensaje:string){
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
    }
}