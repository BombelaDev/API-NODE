"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = exports.UserSocket = void 0;
class UserSocket {
    constructor() {
        this.ID_USUARIO = "";
        this.NB_USUARIO = "";
        this.NB_APELLIDO_PATERNO = "";
        this.NB_APELLIDO_MATERNO = "";
        this.FE_NACIMIENTO = "";
        this.URL_FOTO = "";
        this.DS_EMAIL = "";
        this.CL_USUARIO = "";
        this.CL_RFC = "";
        this.NO_TELEFONO_MOVIL = "";
        this.NO_TELEFONO_EMPRESA = "";
    }
}
exports.UserSocket = UserSocket;
class UsuariosLista {
    constructor() {
        this.Usuarios = [];
        this.Usuarios = [];
    }
    // Agregar un usuario
    agregar(id_socket, usuario) {
        this.Usuarios.push({ id_socket, usuario });
        //    console.log( this.Usuarios );  
        return usuario;
    }
    actualizarUsuario(id_socket, usuario) {
        for (let u of this.Usuarios) {
            if (u.id_socket === id_socket) {
                u.usuario = usuario;
                break;
            }
        }
        //  console.log('===== Actualizando usuario ====');
        //    console.log( this.Usuarios );
    }
    // Obtener lista de usuarios
    getLista() {
        return this.Usuarios;
    }
    // Obtener un usuario
    getUsuario(id_socket) {
        return this.Usuarios.find(usuario => usuario.id_socket === id_socket);
    }
    // Borrar Usuario
    borrarUsuario(id_socket) {
        const tempUsuario = this.getUsuario(id_socket);
        this.Usuarios = this.Usuarios.filter(usuario => usuario.id_socket !== id_socket);
        //  console.log(this.Usuarios);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
//# sourceMappingURL=UsuariosSockets.js.map