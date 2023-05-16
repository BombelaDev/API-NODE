import { SEND_NOTIFICATIONS } from "./../enums/enums";
const cron = require("node-cron");
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import route from "../routes";
import { bbc, db } from "../config/config";
import socketIO from "socket.io";
import {
  conectUserLogueado,
  ConectarSocketClient,
  desconectarUsuario,
  notificacionVenta,
} from "../controllers/sockets/Sockest";

class Server {
  private app: Application;
  private port: string;
  private static _intance: Server;

  //CONFIGURACION SOCKETS
  public io: socketIO.Server;
  private Server: http.Server;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.ConectionDB();
    this.port = process.env.PORT || "3000";
    this.Server = new http.Server(this.app);
  }

  EscucharSockets() {
    this.io.on("connection", (socket) => {
      //conectar cliente
      ConectarSocketClient(socket, this.io);

      //Conectar cliente logueado
      conectUserLogueado(socket, this.io);

      desconectarUsuario(socket, this.io);

      notificacionVenta(socket, this.io);

      // socketEvents(socket, this.io) ;
    });
  }

  listen() {
    this.Server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }

  public static get instance() {
    return this._intance || (this._intance = new this());
  }

  routes() {
    this.app.use(`/api/caralianz`, route);

    this.app.use((req, res, next) => {
      const err: any = new Error("Not Found");
      err.status = 404;
      next(err);
    });

    this.app.use((err, req, res, next) => {
      console.log(err.stack);

      res.status(err.status || 500);
      res.json({
        statusCode: err.status || 500,
        errors: {
          message: err.message,
          error: err,
        },
      });
    });
  }

  async dbConection(out: boolean) {
    try {
      if (out) {
        return true;
      } else {
        await db.authenticate();
        console.log("Database is connect!");
        return true;
      }
    } catch (error: any) {
      console.error(error);
      // db.close();
      setTimeout(() => {
        return this.dbConection(false);
      }, 5000);
      //  throw new Error(error);
    }
  }

  middlewares() {
    this.app.use(cors()); //
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  async ConectionDB() {
    (async () => {
      try {
        await this.dbConection(false);
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    })();
  }
}

export default Server;
