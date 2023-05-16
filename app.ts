import dotenv from 'dotenv';
import Server from './server/server';
//import Server from './models/server';

//configurar dot.env
dotenv.config();

//const server = new Server();

const server = Server.instance;


server.listen();