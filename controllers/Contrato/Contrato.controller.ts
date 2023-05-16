import { Request, Response } from "express";
import {
  db,
  NB_BUCKET,
  URL_BACKEND,
  URL_FRONTEND,
  TOKEN_CONEKTA,
  bbc,
} from "../../config/config";
import ConceptoModel from "../../models/s_concepto";
import Correo from "../../helpers/Correos";
import sms from "../../helpers/sms";
import smsEnums from "../../enums/smsEnums";
import { SEND_NOTIFICATIONS } from "../../enums/enums";
import ErrorClass from "../../helpers/ErrorsValidate";

let conekta = require("conekta");

conekta.api_key = TOKEN_CONEKTA;

conekta.locale = "es";
conekta.api_version = "2.0.0";
import axios from "axios";
class ContratoController {
  static InsertaPosibleContrato = async (req: any, res: Response) => {
    try {
      const {
        PIN_NB_USUARIO,
        PIN_CL_EMAIL,
        PIN_NO_TELEFONO,
        PIN_FG_VENDER,
        PIN_FG_COMPRAR,
      } = req.body;

      const query = "CALL CA_INSERTA_POSIBLE_CONTRATO_ABIERTO(?,?,?,?,?)";
      let replacements = [
        PIN_NB_USUARIO,
        PIN_CL_EMAIL,
        PIN_NO_TELEFONO,
        PIN_FG_VENDER,
        PIN_FG_COMPRAR,
      ];
      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA == -1001) {
        return res.status(200).json({
          success: false,
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      return res.status(200).json({
        success: true,
        Solicitud: respuesta[0].IDD_SOLICITUD,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaDatosVendedorContrato = async (req: any, res: Response) => {
    try {
      const {
        ID_SOLICITUD,
        NB_VENDEDOR,
        APELLIDO_P_VENDEDOR,
        APELLIDO_M_VENDEDOR,
        RFC_VENDEDOR,
        CURP_VENDEDOR,
        DS_EMAIL_VENDEDOR,
        NO_TELEFONO_VENDEDOR,
        TIPO_IDENT_VENDEDOR,
        NO_IDENTIFICACION,
        AUTORIDAD_VENDEDOR,
        CALLE_VENDEDOR,
        NO_EXTERIOR_VENDEDOR,
        NO_INTERIOR_VENDEDOR,
        COLONIA_VENDEDOR,
        ESTADO_VENDEDOR,
        CP_VENDEDOR,
        MUNICIPIO_VENDEDOR,
      } = req.body;

      const query =
        "CALL CA_INSERTAR_DATOS_VENDEDOR_CONTRATO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      let replacements = [
        ID_SOLICITUD,
        NB_VENDEDOR,
        APELLIDO_P_VENDEDOR,
        APELLIDO_M_VENDEDOR,
        RFC_VENDEDOR,
        CURP_VENDEDOR,
        DS_EMAIL_VENDEDOR,
        NO_TELEFONO_VENDEDOR,
        TIPO_IDENT_VENDEDOR,
        NO_IDENTIFICACION,
        AUTORIDAD_VENDEDOR,
        COLONIA_VENDEDOR,
        MUNICIPIO_VENDEDOR,
        ESTADO_VENDEDOR,
        CALLE_VENDEDOR,
        NO_EXTERIOR_VENDEDOR,
        NO_INTERIOR_VENDEDOR,
        CP_VENDEDOR,
      ];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaDatosCompradorContrato = async (req: any, res: Response) => {
    try {
      const {
        ID_SOLICITUD,
        NB_COMPRADOR,
        APELLIDO_P_COMPRADOR,
        APELLIDO_M_COMPRADOR,
        RFC_COMPRADOR,
        CURP_COMPRADOR,
        DS_EMAIL_COMPRADOR,
        NO_TELEFONO_COMPRADOR,
        TIPO_IDENT_COMPRADOR,
        NO_IDENTIFICACION,
        AUTORIDAD_COMPRADOR,
        CALLE_COMPRADOR,
        NO_EXTERIOR_COMPRADOR,
        NO_INTERIOR_COMPRADOR,
        COLONIA_COMPRADOR,
        ESTADO_COMPRADOR,
        CP_COMPRADOR,
        MUNICIPIO_COMPRADOR,
      } = req.body;

      const query =
        "CALL CA_INSERTAR_DATOS_COMPRADOR_CONTRATO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      let replacements = [
        ID_SOLICITUD,
        NB_COMPRADOR,
        APELLIDO_P_COMPRADOR,
        APELLIDO_M_COMPRADOR,
        RFC_COMPRADOR,
        CURP_COMPRADOR,
        DS_EMAIL_COMPRADOR,
        NO_TELEFONO_COMPRADOR,
        TIPO_IDENT_COMPRADOR,
        NO_IDENTIFICACION,
        AUTORIDAD_COMPRADOR,
        COLONIA_COMPRADOR,
        MUNICIPIO_COMPRADOR,
        ESTADO_COMPRADOR,
        CALLE_COMPRADOR,
        NO_EXTERIOR_COMPRADOR,
        NO_INTERIOR_COMPRADOR,
        CP_COMPRADOR,
      ];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaDatosFormaPago = async (req: any, res: Response) => {
    try {
      req.body.MN_OPERACION = req.body.MN_OPERACION.replace(/,/g, "");
      req.body.MN_OPERACION = req.body.MN_OPERACION.replace("$", "");

      req.body.INSTITUCION_BANCARIA =
        req.body.INSTITUCION_BANCARIA == "" ? 0 : req.body.INSTITUCION_BANCARIA;

      /*    IN PIN_ID_SOLICITUD_CONTRATO INT,
         IN PIN_FE_OPERACION VARCHAR(20),
         IN PIN_MN_PRECIO_ACORDADO DECIMAL(12,4),
         IN PIN_FE_PAGO VARCHAR(20),
         IN PIN_ID_FORMA_PAGO INT,
         IN PIN_ID_BANCO INT,
         IN PIN_NO_CUENTA VARCHAR(100),
         IN PIN_CL_INTERBANCARIA VARCHAR(100),
         IN PIN_DS_ENTREGA VARCHAR(100) */
      const query =
        "CALL CA_INSERTAR_DATOS_FORMA_PAGO_CONTRATO(?,?,?,?,?,?,?,?,?)";
      let replacements = [
        req.body.ID_SOLICITUD,
        req.body.FECHA_OPERACION,
        req.body.MN_OPERACION,
        req.body.FECHA_PAGO,
        req.body.FORMA_PAGO,
        req.body.INSTITUCION_BANCARIA,
        req.body.NO_CUENTA,
        req.body.CVE_INTERBANCARIA,
        req.body.DOMICILIO_ENTREGA,
      ];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaDatosVehiculo = async (req: any, res: Response) => {
    try {
      const {
        ID_SOLICITUD,
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        VERSION,
        PLACA,
        VIN,
        CL_COLOR,
      } = req.body;

      /* 
  IN PIN_ID_SOLICITUD_CONTRATO INT,
  IN PIN_ID_MARCA INT,
  IN PIN_ID_MODELO INT,
  IN PIN_ID_ANIO INT,
  IN PIN_NB_VERSION VARCHAR(100),
  IN PIN_NO_VIN VARCHAR(100),
  IN PIN_CL_PLACAS VARCHAR(20),
  IN PIN_CL_COLOR VARCHAR(20) */

      const query = "CALL CA_INSERTAR_DATOS_VEHICULO_CONTRATO(?,?,?,?,?,?,?,?)";
      let replacements = [
        ID_SOLICITUD,
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        VERSION,
        PLACA,
        VIN,
        CL_COLOR,
      ];
      let respuesta: any = await db.query(query, { replacements });
      console.log(respuesta);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtieneDatosContrato = async (req: any, res: Response) => {
    try {
      let id_solicitud = req.params.id_solicitud;
      const query = "CALL CA_OBTIENE_DATOS_CONTRATO(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [id_solicitud],
      });

      return res.status(200).json({
        Data: Respuesta[0],
      });
    } catch (error) {
      console.log("**********ERROR*********");
      console.log(error.message || error);
      console.log(error.parent.sql || "");
      console.log("**********ERROR*********");
      return res.status(500).json({
        success: false,
        mssg: "Ocurrio un error intente mas tarde",
      });
    }
  };

  static ObtieneInformacionPago = async (req: any, res: Response) => {
    try {
      let id_solicitud = req.params.id_solicitud;
      const query = "CALL CA_CONFIRMA_INFORMACION_CONTRATO(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [id_solicitud],
      });

      if (Respuesta[0].POUT_CL_RESPUESTA == -1001) {
        return res.status(500).json({
          success: false,
          message: Respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      return res.status(200).json({
        Data: Respuesta[0],
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static GenerarContrato = async (req, res: Response) => {
    try {
      const idSolicitud = req.params.id_solicitud;
      console.log(idSolicitud);

      const data = await axios.get(
        "http://apiformatos.caralianz.com/postFormatoContrato.php",
        {
          headers: {
            token: "54a8ce618e91b0b13665e2f9",
            id_solicitud_contrato: idSolicitud,
          },
        }
      );

      console.log(data);

      return res.status(200).json(data.data);
      ///
      /*   let Respuesta:any = await  db.query(Query,{replacements:[IdCita]});

    res.status(200).json({
    FG_GARANTIA: Respuesta[0].FG_GARANTIA == 1 ? true : false
    })
*/
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static EnviarContrato = async (req: any, res: Response) => {
    try {
      const ParametroEmail = "EMAIL_CONTRATO_ENVIO";
      const CorreoUsuario = await Correo.EnviarCorreo(
        "Contrato caralianz",
        req.body.Correo,
        [ParametroEmail, req.body.IdSolicitud, req.body.UrlContrato, "", ""],
        bbc
      );
      const SmsUsuario = await sms.EnviarSMS(
        req.body.Telefono,
        "Hemos enviado al correo eléctronico el contrato solicitado. Muchas gracias por utilizar Caralianz.",
        SEND_NOTIFICATIONS
      );

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
}

export default ContratoController;
