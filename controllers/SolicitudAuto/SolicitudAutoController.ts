import { Request, Response } from "express";
import {
  db,
  NB_BUCKET,
  bbc,
  URL_BACKEND,
  URL_FRONTEND,
  admin,
} from "../../config/config";
import * as bcrypt from "bcrypt";
import Genericos from "../../helpers/Genericos";
import jwt from "jsonwebtoken";
import { SEND_NOTIFICATIONS } from "../../enums/enums";
import UsuarioModel from "../../models/c_usuario";
import Correo from "../../helpers/Correos";
import TemplateCorreo from "../../enums/enums";
import ConceptoModel from "../../models/s_concepto";
import GoogleVerify from "../../helpers/google-verify";
import { EditarPerfilEnum } from "../../enums/EditarPerfilEnum";
import kUsuarioDireccionModel from "../../models/k_usuario_direccion";
import ErrorClass from "../../helpers/ErrorsValidate";

class SolicitudAutoController {
  static guardarAutoSolicitado = async (req: Request, res: Response) => {
    try {
      const query = "CALL  CA_INSERTA_AUTO_SOLICITADO(?,?,?,?,?,?)";
      let replacements = [
        req.body.ID_MARCA,
        req.body.ID_MODELO,
        req.body.ID_ANIO,
        req.body.CB_NOMBRE,
        req.body.CL_EMAIL,
        req.body.NO_TELEFONO,
      ];
      let respuesta: any = await db.query(query, { replacements });

      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } =
        respuesta[0];
      const dataCaralianz = [
        TemplateCorreo.EMAIL_NECESIDAD_VEHICULO_CARALIANZ,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const dataUsuario = [
        TemplateCorreo.EMAIL_NECESIDAD_VEHICULO_USUARIO,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const correoCaralianzEnviado = await Correo.EnviarCorreo(
        "Solicitud para buscar un vehiculo",
        admin,
        dataCaralianz,
        bbc
      );
      const correoUsuarioEnviado = await Correo.EnviarCorreo(
        "Solicitud para buscar un vehiculo",
        req.body.CL_EMAIL,
        dataUsuario,
        bbc
      );

      return res.status(200).json({
        message: "ok",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static guardarAutoEncontrado = async (req: Request, res: Response) => {
    try {
      const query = "CALL  CA_INSERTA_AUTO_ENCONTRADO(?,?,?,?,?,?)";
      let replacements = [
        req.body.ID_MARCA,
        req.body.ID_MODELO,
        req.body.ID_ANIO,
        req.body.NB_NOMBRE,
        req.body.DS_EMAIL,
        req.body.NO_TELEFONO,
      ];
      let respuesta: any = await db.query(query, { replacements });

      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } =
        respuesta[0];
      const { marca, modelo, anio, nombre, correo, telefono } = respuesta[0];
      const dataCaralianz = [
        TemplateCorreo.EMAIL_VEHICULO_ENCONTRADO_CARALIANZ,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const dataUsuario = [
        TemplateCorreo.EMAIL_VEHICULO_ENCONTRADO_USUARIO,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const correoCaralianzEnviado = await Correo.EnviarCorreo(
        "Solicitud de vehículo encontrado",
        admin,
        dataCaralianz,
        bbc
      );
      const correoUsuarioEnviado = await Correo.EnviarCorreo(
        "Solicitud de vehículo encontrado",
        req.body.DS_EMAIL,
        dataUsuario,
        bbc
      );
      return res.status(200).json({
        message: "ok",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static obtenerAutosSolicitados = async (req: Request, res: Response) => {
    try {
      const query = "CALL  CA_OBTIENE_NECESIDAD_VEHICULO()";
      let respuesta: any = await db.query(query, {});
      return res.status(200).json({
        message: "ok",
        autos: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
}

export default SolicitudAutoController;
