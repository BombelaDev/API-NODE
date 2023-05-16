import jwt from "jsonwebtoken";
import fs from "fs";
import { db } from "../config/config";

class Genericos {
  static GenerarPassword(): any {
    let letras = "1234567890ABCDFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz";
    let nuevaPassword = letras[Math.floor(Math.random() * letras.length)];

    for (let i = 0; i < 8; i++) {
      nuevaPassword =
        nuevaPassword + letras[Math.floor(Math.random() * letras.length)];
    }

    return nuevaPassword;
  }

  static async generarJWT(id_usuario: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const payload = {
        id_usuario,
      };

      jwt.sign(
        payload,
        process.env.SEED_TOKEN,
        { expiresIn: process.env.CADUCIDAD_TOKEN },
        (err, token) => {
          if (err) {
            console.log(err);
            reject("No se pudo generar el JWT ");
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  static RenuevaJWT = (id_usuario: string) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id_usuario,
      };

      jwt.sign(
        payload,
        process.env.SEED_TOKEN,
        { expiresIn: process.env.CADUCIDAD_TOKEN },
        (err, token) => {
          if (err) {
            console.log(err);
            reject("No se pudo generar el JWT ");
          } else {
            resolve(token);
          }
        }
      );
    });
  };

  static comprobarJWT = async (token: string) => {
    try {
      if (token.length < 10) {
        return null;
      }

      const uid: any = jwt.verify(token, process.env.SEED_TOKEN!);

      const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
      const replacements = [uid.id_usuario];

      let respuesta: any = await db.query(query, { replacements });

      const USUARIO = respuesta[0];
      if (USUARIO) {
        return USUARIO;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);

      console.log("vineeeeeeeeeeeeeeeeeee");

      return null;
    }
  };
}
export default Genericos;
