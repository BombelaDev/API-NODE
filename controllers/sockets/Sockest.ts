import { AnalysisMessage } from "aws-sdk/clients/iotevents";
import { Socket } from "socket.io";
import socketIO from "socket.io";

import { db } from "../../config/config";
import Genericos from "../../helpers/Genericos";
import { UserSocket, UsuariosLista } from "../../helpers/UsuariosSockets";

export const UsuariosConectados = new UsuariosLista();

let users;
export const socketEvents = async (socket: Socket, io: socketIO.Server) => {
  const idClienteConection = socket.id;
  const { nameRoom } = socket.handshake.query;
  console.log("CLIENTE CONECTADO", idClienteConection);

  //ESCUCHA EVENTO GLOBAL
  io.emit("global", { title: "evento global " });

  //ESCUCHA LOS EVENTOS "evento"
  socket.on("evento", (res) => {
    console.log(res);

    //MANDA ESTA NOTIFICACION A TODOS LOS DISPOSITIVOS QUE PERTENEZCAN A ESTE GRUPO LA SALA.
    socket.to(socket.handshake.query.nameRoom).emit("evento", res);
  });

  socket.on("venta", (res) => {
    console.log(res);
    socket.to(socket.handshake.query.nameRoom).emit("venta", res);
  });

  socket.on("token", async (res) => {
    const usuario = await Genericos.comprobarJWT(res.Token);
    if (!usuario) {
      return socket.disconnect();
    }
    socket.join(usuario.CL_USUARIO);

    users.push({ id: socket.id, usuario });
  });

  socket.on("disconnect", () => {
    users = users.filter((user: any) => user.id != socket.id);

    console.log("CLIENTE DESCONECTADO", socket.id);
  });
};

export const ConectarSocketClient = async (
  socket: Socket,
  io: socketIO.Server
) => {
  const idClienteConection = socket.id;
  const { nameRoom } = socket.handshake.query;
  console.log(
    "CLIENTE CONECTADO => ",
    idClienteConection + " EN => " + nameRoom
  );

  //UNIRLO A LA SALA GENERAL DE CARALIANZ AUNQUE NO ESTE LOGUEADO;
  socket.join(nameRoom);

  //AÑADIRLO A LA LISTA DE USUARIOS CONECTADOS;
  //   const usuario = new UserSocket();
  UsuariosConectados.agregar(socket.id, null);
};

export const conectUserLogueado = async (
  socket: Socket,
  io: socketIO.Server
) => {
  socket.on("token", async (res) => {
    const usuario = await Genericos.comprobarJWT(res.Token);

    if (!usuario) {
      return socket.disconnect();
    }
    console.log(socket.id);

    UsuariosConectados.actualizarUsuario(socket.id, usuario);
    // Conectarlo a una sala especial
    socket.join(usuario.ID_USUARIO);
  });
};

export const desconectarUsuario = async (
  socket: Socket,
  io: socketIO.Server
) => {
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");

    UsuariosConectados.borrarUsuario(socket.id);
  });
};

export const notificacionVenta = async (
  socket: Socket,
  io: socketIO.Server
) => {
  socket.on("venta", (res) => {
    const id_usuario = "153";
    console.log(res);
    //   socket.to(id_usuario).emit("venta",res);
    socket.to(socket.handshake.query.nameRoom).emit("venta", {
      message: "Nuevo auto añadido",
      image:
        "https://cdn.aarp.net/content/dam/aarp/auto/2017/07/1140-hyundai-ioniq-great-cars-road-trips-esp.imgcache.revfd63981c76a67e8a4ed28622bb76883e.jpg",
      type: "Global",
    });
  });
};
