import { validationResult } from "express-validator";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Responses from "../helpers/responses";

class validaciones {
  static validarCampos = (req: Request, res: Response, next) => {
    const errores = validationResult(req); //cachando errores desde el middleware
    if (!errores.isEmpty()) {
      return Responses.send(res, req, 400, true, errores.mapped().toString());
    }

    //si llega aqui no hay errores
    next();
  };

  static validarToken = (req, res, next) => {
    //LEER DEL TOKEN
    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "unauthorized 401",
      });
    }

    try {
      const id_usuario = jwt.verify(token, process.env.SEED_TOKEN);
      req.id_usuario = id_usuario;

      next();
    } catch (error) {
      return res.status(401).json({ error: true, message: "Token no válido" });
    }
  };
}

export default validaciones;
