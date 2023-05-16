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

class SolicitudUsuarioController {
  //66
  static guardarSolicitudSeguro = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      console.log(
        "***************************************************************"
      );

      const query = "CALL CA_INSERTA_POSIBLE_SEGURO_COBRO_SEGURO(?,?,?,?,?,?)";
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
        TemplateCorreo.EMAIL_COBRO_SEGURO_CARALIANZ,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const dataUsuario = [
        TemplateCorreo.EMAIL_COBRO_SEGURO_USUARIO,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const correoCaralianzEnviado = await Correo.EnviarCorreo(
        "Solicitud de cobro seguro",
        admin,
        dataCaralianz,
        bbc
      );
      const correoUsuarioEnviado = await Correo.EnviarCorreo(
        "Solicitud de cobro seguro",
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

  static guardarSolicitudFacturacion = async (req: Request, res: Response) => {
    try {
      const query = "CALL CA_INSERTA_POSIBLE_FACTURACION_SEGURO(?,?,?,?,?,?)";
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
        TemplateCorreo.EMAIL_FACTURACION_CARALIANZ,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const dataUsuario = [
        TemplateCorreo.EMAIL_FACTURACION_USUARIO,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];

      const correoCaralianzEnviado = await Correo.EnviarCorreo(
        "Solicitud de Facturación",
        admin,
        dataCaralianz,
        bbc
      );

      const correoUsuarioEnviado = await Correo.EnviarCorreo(
        "Solicitud de Facturación",
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

  static guardarSolicitudRevisionLegal = async (
    req: Request,
    res: Response
  ) => {
    try {
      const query = "CALL CA_INSERTA_POSIBLE_REVISION_LEGAL(?,?,?,?,?,?)";
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

      const dataUsuario = [
        TemplateCorreo.EMAIL_REVISION_LEGAL_USUARIO,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const dataCaralianz = [
        TemplateCorreo.EMAIL_REVISION_LEGAL_CARALIANZ,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];

      const correoCaralianzEnviado = await Correo.EnviarCorreo(
        "Solicitud de Revisión Legal",
        admin,
        dataCaralianz,
        bbc
      );
      const correoUsuarioEnviado = await Correo.EnviarCorreo(
        "Solicitud de Revisión Legal",
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
}

export default SolicitudUsuarioController;
