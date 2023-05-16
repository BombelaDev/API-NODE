"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificacionVenta = exports.desconectarUsuario = exports.conectUserLogueado = exports.ConectarSocketClient = exports.socketEvents = exports.UsuariosConectados = void 0;
const Genericos_1 = __importDefault(require("../../helpers/Genericos"));
const UsuariosSockets_1 = require("../../helpers/UsuariosSockets");
exports.UsuariosConectados = new UsuariosSockets_1.UsuariosLista();
let users;
const socketEvents = (socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    const idClienteConection = socket.id;
    const { nameRoom } = socket.handshake.query;
    console.log("CLIENTE CONECTADO", idClienteConection);
    //     console.log(nameRoom);
    //     socket.join(nameRoom);
    //socket.join(usuario)
    //ESCUCHA EVENTO GLOBAL 
    io.emit('global', { title: "evento global " });
    //ESCUCHA LOS EVENTOS "evento"
    socket.on('evento', (res) => {
        console.log(res);
        //MANDA ESTA NOTIFICACION A TODOS LOS DISPOSITIVOS QUE PERTENEZCAN A ESTE GRUPO LA SALA.
        socket.to(socket.handshake.query.nameRoom).emit("evento", res);
    });
    socket.on('venta', (res) => {
        console.log(res);
        socket.to(socket.handshake.query.nameRoom).emit("venta", res);
    });
    socket.on('token', (res) => __awaiter(void 0, void 0, void 0, function* () {
        const usuario = yield Genericos_1.default.comprobarJWT(res.Token);
        if (!usuario) {
            return socket.disconnect();
        }
        socket.join(usuario.CL_USUARIO);
        users.push({ id: socket.id, usuario });
        console.log("Se conecto..", usuario.CL_USUARIO);
        /*  ///LIMPIAR CUANDO ALGUIEN SE DESCONECTA
         socket.on('disconnect',() =>{
           //  delete users[usuario.]
           users = users.filter((user:any) => user.id != socket.id);
           
           console.log('Cliente desconectado', usuario.CL_USUARIO);
       }); */
    }));
    socket.on('disconnect', () => {
        users = users.filter((user) => user.id != socket.id);
        console.log('CLIENTE DESCONECTADO', socket.id);
    });
});
exports.socketEvents = socketEvents;
const ConectarSocketClient = (socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    const idClienteConection = socket.id;
    const { nameRoom } = socket.handshake.query;
    console.log("CLIENTE CONECTADO => ", idClienteConection + " EN => " + nameRoom);
    //UNIRLO A LA SALA GENERAL DE CARALIANZ AUNQUE NO ESTE LOGUEADO;
    socket.join(nameRoom);
    //AÑADIRLO A LA LISTA DE USUARIOS CONECTADOS;
    //   const usuario = new UserSocket();
    exports.UsuariosConectados.agregar(socket.id, null);
});
exports.ConectarSocketClient = ConectarSocketClient;
const conectUserLogueado = (socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on('token', (res) => __awaiter(void 0, void 0, void 0, function* () {
        const usuario = yield Genericos_1.default.comprobarJWT(res.Token);
        if (!usuario) {
            return socket.disconnect();
        }
        console.log(socket.id);
        exports.UsuariosConectados.actualizarUsuario(socket.id, usuario);
        // Conectarlo a una sala especial
        socket.join(usuario.ID_USUARIO);
    }));
});
exports.conectUserLogueado = conectUserLogueado;
const desconectarUsuario = (socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.UsuariosConectados.borrarUsuario(socket.id);
    });
});
exports.desconectarUsuario = desconectarUsuario;
const notificacionVenta = (socket, io) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on('venta', (res) => {
        const id_usuario = "153";
        console.log(res);
        //   socket.to(id_usuario).emit("venta",res);
        socket.to(socket.handshake.query.nameRoom).emit("venta", { message: "Nuevo auto añadido", image: "https://cdn.aarp.net/content/dam/aarp/auto/2017/07/1140-hyundai-ioniq-great-cars-road-trips-esp.imgcache.revfd63981c76a67e8a4ed28622bb76883e.jpg", type: "Global" });
    });
});
exports.notificacionVenta = notificacionVenta;
//# sourceMappingURL=Sockest.js.map