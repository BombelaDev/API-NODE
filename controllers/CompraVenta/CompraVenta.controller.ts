import { Request, Response } from "express";
import {
  db,
  NB_BUCKET,
  URL_BACKEND,
  URL_FRONTEND,
  TOKEN_CONEKTA,
  admin,
  bbc,
} from "../../config/config";
import Correo from "../../helpers/Correos";
import { SEND_NOTIFICATIONS } from "../../enums/enums";
import sms from "../../helpers/sms";
import smsEnums from "../../enums/smsEnums";
import TemplateCorreo from "../../enums/enums";
import { SmsCitaComercial } from "../../enums/smsEnums";
import CitasCarSalesModel from "../../models/c_cita_car_sales";
import Consultas from "../../helpers/consultas";
import Genericos from "../../helpers/Genericos";
import ErrorClass from "../../helpers/ErrorsValidate";
import UsuarioModel from "../../models/c_usuario";

class CompraVentaController {
  static GeneraCitaComercial = async (req: any, res: Response) => {
    try {
      const {
        DS_FECHA,
        ID_CAV,
        ID_COMPRADOR,
        HORA_AGENDAR,
        ID_AUTO,
        DS_EMAIL,
        NO_TELEFONO,
      } = req.body;
      if (
        !DS_FECHA ||
        !DS_FECHA ||
        !ID_CAV ||
        !ID_COMPRADOR ||
        !HORA_AGENDAR ||
        !ID_AUTO
      ) {
        res.status(500).json({ message: "Datos incompletos" });
        return;
      }

      const query = "CALL CA_INSERTA_CITA_CAR_SALES(?,?,?,?,?)";
      let replacements = [
        ID_COMPRADOR,
        ID_CAV,
        ID_AUTO,
        DS_FECHA,
        HORA_AGENDAR,
      ];

      console.log(replacements);

      let respuesta: any = await db.query(query, { replacements });
      const {
        POUT_CL_RESPUESTA,
        V_DS_CORREO,
        DS_CORREO_CAV,
        POUT_ID_CITA,
        V_NO_TELEFONO_MOVIL,
        V_NB_VEHICULO,
      } = respuesta[0];
      if (POUT_CL_RESPUESTA != -1000) {
        return res.status(500).json({
          mssg: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      const UsuarioCompradorData: any = await UsuarioModel.findOne({
        where: { DS_EMAIL: DS_EMAIL },
        attributes: ["CL_ESTADO", "ID_USUARIO"],
      });
      const { CL_ESTADO } = UsuarioCompradorData;
      let urlactivar = "";

      if (CL_ESTADO == 0) {
        const token = await Genericos.generarJWT(ID_COMPRADOR);
        urlactivar = URL_FRONTEND + "activar-usuario/" + token;
      }

      const ParametroEmailCarinspector =
        CL_ESTADO == 1
          ? TemplateCorreo.EMAIL_CONFIRMACION_COMPRA_COMPRADOR
          : TemplateCorreo.EMAIL_CONFIRMACION_COMPRA_COMPRADOR_INVITADO;

      const CorreoAdminCav = await Correo.EnviarCorreo(
        "Alguien esta interesado en comprar un auto",
        DS_CORREO_CAV,
        [
          TemplateCorreo.EMAIL_INTERES_COMPRA_CARALIANZ,
          POUT_ID_CITA,
          "",
          "",
          "",
        ],
        [bbc]
      );
      //
      const correoUsuarioVendedor = await Correo.EnviarCorreo(
        "Alguien esta interesado en tu auto",
        V_DS_CORREO,
        [
          TemplateCorreo.EMAIL_CONFIRMACION_COMPRA_VENDEDOR,
          POUT_ID_CITA,
          "",
          "",
          "",
        ],
        []
      );
      const smsUsuarioVendedor = await sms.EnviarSMS(
        V_NO_TELEFONO_MOVIL,
        SmsCitaComercial.SMS_VT_01.replace("[NB_VEHICULO]", V_NB_VEHICULO),
        SEND_NOTIFICATIONS
      );

      const correoUsuarioComprador = await Correo.EnviarCorreo(
        "Esperando confirmación",
        DS_EMAIL,
        [ParametroEmailCarinspector, POUT_ID_CITA, urlactivar, "", ""],
        []
      );
      const smsUsuarioComprador = await sms.EnviarSMS(
        NO_TELEFONO,
        SmsCitaComercial.SMS_ESPERA_CONFIRMACION.replace(
          "[NB_VEHICULO]",
          V_NB_VEHICULO
        ),
        SEND_NOTIFICATIONS
      );

      return res.status(200).json({
        success: true,
        message: POUT_CL_RESPUESTA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static VendedorConfirmaCitaCorreo = async (req: any, res: Response) => {
    try {
      const ID_CITA = req.params.ID_CITA;

      const query = "CALL CA_CONFIRMACION_DE_CITA(?,?)";
      let replacements = [ID_CITA, "VENDEDOR_CONFIRMA"];
      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.redirect(URL_FRONTEND + "cita-procesada");
      }

      let data = ["EMAIL_CONFIRMACION_VENDEDOR", ID_CITA, "", URL_FRONTEND, ""];
      let DS_CORREO = respuesta[0].POUT_DS_EMAIL_COMPRADOR;

      const cita: any = await CitasCarSalesModel.findOne({
        where: { ID_CITA_CAR_SALES: ID_CITA },
      });
      const { ID_VEHICULO, ID_COMPRADOR, ID_VENDEDOR } = cita;

      const datosComprador: any = await Consultas.ObtenerDatosUsuario(
        ID_COMPRADOR
      );
      const datosVendedor: any = await Consultas.ObtenerDatosUsuario(
        ID_VENDEDOR
      );
      const NB_VEHICULO = await Consultas.ObtenerNombreVehiculo(ID_VEHICULO);

      const TOKEN: any = await Genericos.generarJWTGenerico(ID_CITA, "48hr");

      let smsMessage = SmsCitaComercial.SMS_VT_02.replace(
        "[NB_VEHICULO]",
        NB_VEHICULO
      );
      smsMessage = smsMessage.replace(
        "[NB_COMPRADOR]",
        datosComprador.NB_USUARIO +
          " " +
          datosComprador.NB_APELLIDO_PATERNO +
          " " +
          datosComprador.NB_APELLIDO_MATERNO
      );
      smsMessage = smsMessage.replace(
        "[NB_VENDEDOR]",
        datosVendedor.NB_USUARIO +
          " " +
          datosVendedor.NB_APELLIDO_PATERNO +
          " " +
          datosVendedor.NB_APELLIDO_MATERNO
      );

      await Correo.EnviarCorreo(
        "¡Cita confirmada!",
        DS_CORREO,
        [
          TemplateCorreo.EMAIL_CONFIRMACION_VENDEDOR,
          ID_CITA,
          "",
          URL_FRONTEND,
          "",
        ],
        []
      );
      await sms.EnviarSMS(
        datosComprador.NO_TELEFONO_MOVIL,
        smsMessage,
        SEND_NOTIFICATIONS
      );

      res.status(200);
      return res.redirect(`${URL_FRONTEND}compra/cita-confirmada/${TOKEN}`);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerDatosCitaCarSalesPorToken = async (req: any, res: Response) => {
    try {
      const CITA: any = await Genericos.comprobarJWTGenerico(
        req.params.ID_CITA
      );

      if (!CITA) {
        return res.status(404).json({
          error: true,
          message: "La cita no fue encontrada",
        });
      }

      const DatosCita: any = await CitasCarSalesModel.findOne({
        where: { ID_CITA_CAR_SALES: CITA.id },
      });

      if (!DatosCita) {
        return res.status(403).json({
          error: true,
          message: "La cita ya fue procesada",
        });
      }

      const { ID_VEHICULO } = DatosCita;
      const NB_VEHICULO = await Consultas.ObtenerNombreVehiculo(ID_VEHICULO);
      const NB_CAV = await Consultas.ObtenerNombreCav(DatosCita.ID_CAV);

      return res.status(200).json({
        error: false,
        CVE_CITA: DatosCita.CL_CITA_CAR_SALES,
        DS_FECHA_CITA: DatosCita.FE_CITA,
        HR_CITA: DatosCita.HR_CITA,
        CL_ESTADO: DatosCita.CL_ESTADO,
        NB_VEHICULO,
        NB_CAV,
        ID_CITA: CITA.id,
        ID_CAV: DatosCita.ID_CAV,
        ID_VEHICULO: DatosCita.ID_VEHICULO,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static VendedorRechazaCitaCorreo = async (req: any, res: Response) => {
    try {
      const ID_CITA = req.params.ID_CITA;
      const query = "CALL CA_CONFIRMACION_DE_CITA(?,?)";

      let replacements = [ID_CITA, "VENDEDOR_RECHAZA"];
      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        console.log(respuesta[0].POUT_DS_RESPUESTA);
        res.status(200);
        return res.redirect(URL_FRONTEND);
      }

      let DS_CORREO = respuesta[0].POUT_DS_EMAIL_COMPRADOR;
      let data = ["EMAIL_RECHAZA_VENDEDOR", ID_CITA, "", URL_FRONTEND, ""];
      let ID_CAV = respuesta[0].POUT_ID_CAV;

      const TOKEN: any = await Genericos.generarJWTGenerico(ID_CITA, "48hr");
      const cita: any = await CitasCarSalesModel.findOne({
        where: { ID_CITA_CAR_SALES: ID_CITA },
      });
      const { ID_VEHICULO, ID_COMPRADOR, ID_VENDEDOR } = cita;
      const datosComprador: any = await Consultas.ObtenerDatosUsuario(
        ID_COMPRADOR
      );
      const datosVendedor: any = await Consultas.ObtenerDatosUsuario(
        ID_VENDEDOR
      );
      const NB_VEHICULO = await Consultas.ObtenerNombreVehiculo(ID_VEHICULO);

      let smsMessage = SmsCitaComercial.SMS_VT_03.replace(
        "[NB_VEHICULO]",
        NB_VEHICULO
      );
      smsMessage = smsMessage.replace(
        "[NB_COMPRADOR]",
        datosComprador.NB_USUARIO +
          " " +
          datosComprador.NB_APELLIDO_PATERNO +
          " " +
          datosComprador.NB_APELLIDO_MATERNO
      );
      smsMessage = smsMessage.replace(
        "[NB_VENDEDOR]",
        datosVendedor.NB_USUARIO +
          " " +
          datosVendedor.NB_APELLIDO_PATERNO +
          " " +
          datosVendedor.NB_APELLIDO_MATERNO
      );

      await sms.EnviarSMS(
        datosComprador.NO_TELEFONO_MOVIL,
        smsMessage,
        SEND_NOTIFICATIONS
      );
      await Correo.EnviarCorreo(
        "Cita rechazada",
        DS_CORREO,
        [TemplateCorreo.EMAIL_RECHAZA_VENDEDOR, ID_CITA, "", URL_FRONTEND, ""],
        []
      );

      return res.redirect(`${URL_FRONTEND}compra/reagenda/${TOKEN}`);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ProponerTresFechas = async (req: any, res: Response) => {
    try {
      let body = req.body;

      let fecha1 = body.HORARIO[0].FECHA_COMPLETA;
      let hora1 = body.HORARIO[0].HORA_AGENDAR;

      let fecha2 =
        body.HORARIO.length == 2 ? body.HORARIO[1].FECHA_COMPLETA : "";
      let hora2 = body.HORARIO.length == 2 ? body.HORARIO[1].HORA_AGENDAR : "";

      let fecha3 =
        body.HORARIO.length == 3 ? body.HORARIO[2].FECHA_COMPLETA : "";
      let hora3 = body.HORARIO.length == 3 ? body.HORARIO[2].HORA_AGENDAR : "";

      fecha1 = fecha1 != "" ? fecha1.split("/").reverse().join("-") : fecha1;
      fecha2 = fecha2 != "" ? fecha2.split("/").reverse().join("-") : fecha2;
      fecha3 = fecha3 != "" ? fecha3.split("/").reverse().join("-") : fecha3;

      let replacements = [
        body.ID_CITA,
        body.ID_CAV,
        fecha1,
        hora1,
        fecha2,
        hora2,
        fecha3,
        hora3,
      ];

      const query = "CALL CA_INSERTA_PROPUESTA_HORARIOS(?,?,?,?,?,?,?,?)";

      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA == -1001) {
        return res.status(401).json({
          success: false,
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      const cita: any = await CitasCarSalesModel.findOne({
        where: { ID_CITA_CAR_SALES: body.ID_CITA },
      });
      const { ID_VEHICULO, ID_COMPRADOR, ID_VENDEDOR } = cita;
      const datosComprador: any = await Consultas.ObtenerDatosUsuario(
        ID_COMPRADOR
      );
      const datosVendedor: any = await Consultas.ObtenerDatosUsuario(
        ID_VENDEDOR
      );
      const NB_VEHICULO = await Consultas.ObtenerNombreVehiculo(ID_VEHICULO);

      let smsMessageVendedor = SmsCitaComercial.SMS_VT_06.replace(
        "[NB_VEHICULO]",
        NB_VEHICULO
      );
      smsMessageVendedor = smsMessageVendedor.replace(
        "[NB_COMPRADOR]",
        datosComprador.NB_USUARIO +
          " " +
          datosComprador.NB_APELLIDO_PATERNO +
          " " +
          datosComprador.NB_APELLIDO_MATERNO
      );
      smsMessageVendedor = smsMessageVendedor.replace(
        "[NB_VENDEDOR]",
        datosVendedor.NB_USUARIO +
          " " +
          datosVendedor.NB_APELLIDO_PATERNO +
          " " +
          datosVendedor.NB_APELLIDO_MATERNO
      );

      let smsMessageComprador = SmsCitaComercial.SMS_VT_07.replace(
        "[NB_VEHICULO]",
        NB_VEHICULO
      );
      smsMessageComprador.replace(
        "[NB_COMPRADOR]",
        datosComprador.NB_USUARIO +
          " " +
          datosComprador.NB_APELLIDO_PATERNO +
          " " +
          datosComprador.NB_APELLIDO_MATERNO
      );

      //MANDAR MESSAGE A VENDEDOR
      await sms.EnviarSMS(
        datosVendedor.NO_TELEFONO_MOVIL,
        smsMessageVendedor,
        SEND_NOTIFICATIONS
      );

      //MANDAR MESSAGE A COMPRADOR
      await sms.EnviarSMS(
        datosComprador.NO_TELEFONO_MOVIL,
        smsMessageComprador,
        SEND_NOTIFICATIONS
      );

      //MANDAR CORREO A COMPRADOR
      const enviado = await Correo.EnviarCorreo(
        "Propuesta de cita",
        respuesta[0].POUT_DS_EMAIL,
        [
          TemplateCorreo.EMAIL_CITA_HORARIOS_PROPUESTOS,
          body.ID_CITA,
          respuesta[0].POUT_ID_AGRUPADOR,
          URL_BACKEND,
          "",
        ],
        []
      );

      return res.status(200).json({
        message: "Propuesta enviada correctamente.",
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ConfirmarPropuestaCorreo = async (req: any, res: Response) => {
    try {
      const TOKEN: any = await Genericos.generarJWTGenerico(
        req.params.ID_CITA,
        "2hr"
      );

      const query = "CALL CA_CONFIRMA_HORA_PROPUESTA(?,?)";
      let replacements = [req.params.ID_CITA, req.params.ID_AGRUPADOR];

      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.redirect(URL_FRONTEND);
      }

      await Correo.EnviarCorreo(
        "¡Cita confirmada!",
        respuesta[0].POUT_DS_EMAIL,
        [
          TemplateCorreo.EMAIL_CONFIRMACION_VENDEDOR,
          req.params.ID_CITA,
          "",
          "",
          "",
        ],
        []
      );

      res.status(200);
      return res.redirect(`${URL_FRONTEND}compra/cita-confirmada/${TOKEN}`);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static RechazarPropuestas = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_CONFIRMA_HORA_PROPUESTA(?,?)";
      let replacements = ["-1", req.params.ID_AGRUPADOR];

      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.redirect(URL_FRONTEND);
      }

      await Correo.EnviarCorreo(
        "Propuestas rechazadas",
        respuesta[0].POUT_DS_EMAIL,
        [TemplateCorreo.EMAIL_RECHAZA_COMPRADOR_PROPUESTA, 0, "", "", ""],
        []
      );

      res.status(200);
      return res.redirect(`${URL_FRONTEND}compra/cita-rechazada`);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static NoSigueEnVentaAutoVendedorCorreo = async (req: any, res: Response) => {
    try {
      const query0 = "CALL CA_CONFIRMACION_DE_CITA(?,?)";
      const query1 = "CALL CA_OBTIENE_CITA_CAR_SALES_X_ID(?)";
      const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";

      let replacements = [req.params.ID_CITA, "VENDEDOR_CANCELA"];
      let respuesta: any = await db.query(query0, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        res.status(500);
        return res.redirect(URL_FRONTEND);
      }

      //CONSULTAR IDS DE VENDEDOR Y COMPRADOR ASI COMO ID VEHICULO

      let DATOS_CITA: any = await db.query(query1, {
        replacements: [req.params.ID_CITA],
      });

      let ID_USUARIO_COMPRADOR = DATOS_CITA[0].ID_COMPRADOR;

      let USUARIO_COMPRADOR: any = await db.query(query, {
        replacements: [ID_USUARIO_COMPRADOR],
      });
      let USUARIO_VENDEDOR: any = await db.query(query, {
        replacements: [DATOS_CITA[0].ID_VENDEDOR],
      });

      let DS_EMAIL_COMPRADOR = USUARIO_COMPRADOR[0].DS_EMAIL;
      let NB_USUARIO_COMPRADOR = USUARIO_COMPRADOR[0].NB_USUARIO;
      let NO_TELEFONO_MOVIL_COMPRADOR = USUARIO_COMPRADOR[0].NO_TELEFONO_MOVIL;

      let DS_EMAIL_VENDEDOR = USUARIO_VENDEDOR[0].DS_EMAIL;
      let NB_USUARIO_VENDEDOR = USUARIO_VENDEDOR[0].NB_USUARIO;

      const TOKEN: any = await Genericos.generarJWTGenerico(
        req.params.ID_CITA,
        "48hr"
      );
      const cita: any = await CitasCarSalesModel.findOne({
        where: { ID_CITA_CAR_SALES: req.params.ID_CITA },
      });
      const { ID_VEHICULO } = cita;

      const NB_VEHICULO = await Consultas.ObtenerNombreVehiculo(ID_VEHICULO);

      let smsMessage = SmsCitaComercial.SMS_VT_04.replace(
        "[NB_VEHICULO]",
        NB_VEHICULO
      );
      smsMessage = smsMessage.replace("[NB_COMPRADOR]", NB_USUARIO_COMPRADOR);
      smsMessage = smsMessage.replace("[NB_VENDEDOR]", NB_USUARIO_VENDEDOR);

      /**NOTIFICACIONES A COMPRADOR */

      await sms.EnviarSMS(
        NO_TELEFONO_MOVIL_COMPRADOR,
        smsMessage,
        SEND_NOTIFICATIONS
      );
      await Correo.EnviarCorreo(
        "Auto no disponible",
        DS_EMAIL_COMPRADOR,
        [
          TemplateCorreo.EMAIL_AUTO_NO_DISPONIBLE_COMPRADOR,
          0,
          NB_USUARIO_COMPRADOR,
          URL_FRONTEND,
          "",
        ],
        []
      );

      res.status(200);

      return res.redirect(`${URL_FRONTEND}compra/autonodisponible/` + TOKEN);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static EnviarCorreoVerAuto = async (req: any, res: Response) => {
    try {
      if (isNaN(req.body.id_vehiculo)) {
        res.status(500).json({
          message: "Ocurrio un error",
        });
        return;
      }

      const query = "CALL CA_INSERTA_POSIBLE_COMPRA_ABIERTO(?,?,?,?,?,?)";
      let replacements = [
        req.body.id_vehiculo,
        req.body.CB_NOMBRE,
        req.body.CL_EMAIL,
        req.body.NO_TELEFONO,
        req.body.DIA_SEMANA,
        req.body.HORA_SEMANA,
      ];

      let respuesta: any = await db.query(query, { replacements });

      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, ID_SOLICITUD } =
        respuesta[0];

      const dataCaralianz = [
        TemplateCorreo.EMAIL_POSIBLE_COMPRA_ABIERTO_CARALIANZ,
        ID_SOLICITUD,
        "",
        "",
        "",
      ];
      const dataUsuario = [
        TemplateCorreo.EMAIL_POSIBLE_COMPRA_ABIERTO_USUARIO,
        ID_SOLICITUD,
        "",
        "",
        "",
      ];
      const correoCaralianzEnviado = await Correo.EnviarCorreo(
        "Solicitud para ver auto.",
        admin,
        dataCaralianz,
        bbc
      );
      const correoUsuarioEnviado = await Correo.EnviarCorreo(
        "Solicitud para ver auto.",
        req.body.CL_EMAIL,
        dataUsuario,
        bbc
      );

      return res.status(200).json({
        success: true,
        message: "Solicitud enviada correctamente.",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static RegistraVistaQr = async (req: any, res: Response) => {
    try {
      const id_vehiculo_completo = req.params.ID_COMPLETO;
      const Query = "CALL CA_REGISTRA_ESTADISTICA_PORTAL(?,?)";

      let replacements = [req.params.ID_VEHICULO, "QR"];
      let respuesta: any = await db.query(Query, { replacements });

      console.log(
        "****************************VINE*******************************"
      );

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        res.status(500);
        return res.redirect(URL_FRONTEND);
      }

      console.log(
        "****************************VINE*******************************"
      );
      console.log(`${URL_FRONTEND}compra/auto/` + id_vehiculo_completo);
      console.log(
        "****************************VINE*******************************"
      );

      res.status(200);

      return res.redirect(`${URL_FRONTEND}compra/auto/` + id_vehiculo_completo);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static VendiAuto = async (req: any, res: Response) => {
    try {
      const ID_CITA = req.body.id_cita;

      const query1 = "CALL CA_OBTIENE_CITA_CAR_SALES_X_ID(?)";
      let DATOS_CITA: any = await db.query(query1, { replacements: [ID_CITA] });

      const { ID_VENDEDOR, ID_VEHICULO, ID_COMPRADOR, CL_ESTADO } =
        DATOS_CITA[0];
      if (CL_ESTADO != "CANCELADA") {
        return res.status(403).json({
          error: true,
          message:
            "Este auto no se puede dar de baja porque tiene una cita activa.",
        });
      }

      //DAR DE BAJA VEHICULO
      let query2 = "CALL CA_ACTUALIZA_PORTAL(?,?,?,?)";
      await db.query(query2, {
        replacements: [ID_VEHICULO, "BAJA", 1, ID_VENDEDOR],
      });

      const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
      let USUARIO_VENDEDOR: any = await db.query(query, {
        replacements: [ID_VENDEDOR],
      });

      let DS_EMAIL_VENDEDOR = USUARIO_VENDEDOR[0].DS_EMAIL;
      let NB_USUARIO_VENDEDOR = USUARIO_VENDEDOR[0].NB_USUARIO;

      const NB_VEHICULO = await Consultas.ObtenerNombreVehiculo(ID_VEHICULO);

      //ENVIAR NOTIFICACION AL VENDEDOR
      let smsMessage = SmsCitaComercial.SMS_VT_05.replace(
        "[NB_VEHICULO]",
        NB_VEHICULO
      );
      smsMessage = smsMessage.replace("[NB_VENDEDOR]", NB_USUARIO_VENDEDOR);

      await sms.EnviarSMS(
        USUARIO_VENDEDOR[0].NO_TELEFONO_MOVIL,
        smsMessage,
        SEND_NOTIFICATIONS
      );
      await Correo.EnviarCorreo(
        "Auto no disponible",
        DS_EMAIL_VENDEDOR,
        [
          TemplateCorreo.EMAIL_VENDI_AUTO_VENDEDOR,
          0,
          NB_USUARIO_VENDEDOR,
          URL_FRONTEND,
          "",
        ],
        []
      );

      return res.status(200).json({
        error: false,
        message: "El auto fue dado de baja correctamente.",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static MeQuedeAuto = async (req: any, res: Response) => {
    try {
      const ID_CITA = req.body.id_cita;

      const query1 = "CALL SP_OBTIENE_CITA_CAR_SALES_X_ID(?)";
      let DATOS_CITA: any = await db.query(query1, { replacements: [ID_CITA] });

      const { ID_VENDEDOR, ID_VEHICULO, CL_ESTADO } = DATOS_CITA[0];

      if (CL_ESTADO != "CANCELADA") {
        return res.status(403).json({
          error: true,
          message:
            "Este auto no se puede dar de baja porque tiene una cita activa.",
        });
      }

      //DAR DE BAJA VEHICULO
      let query2 = "CALL CA_ACTUALIZA_PORTAL(?,?,?,?)";
      await db.query(query2, {
        replacements: [ID_VEHICULO, "BAJA", 0, ID_VENDEDOR],
      });

      const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";

      let USUARIO_VENDEDOR: any = await db.query(query, {
        replacements: [ID_VENDEDOR],
      });

      let DS_EMAIL_VENDEDOR = USUARIO_VENDEDOR[0].DS_EMAIL;
      let NB_USUARIO_VENDEDOR = USUARIO_VENDEDOR[0].NB_USUARIO;

      //ENVIAR NOTIFICACION AL VENDEDOR
      let smsMessage = SmsCitaComercial.SMS_VT_05A.replace(
        "[NB_VENDEDOR]",
        NB_USUARIO_VENDEDOR
      );

      await sms.EnviarSMS(
        USUARIO_VENDEDOR[0].NO_TELEFONO_MOVIL,
        smsMessage,
        SEND_NOTIFICATIONS
      );
      await Correo.EnviarCorreo(
        "Auto no disponible",
        DS_EMAIL_VENDEDOR,
        [
          TemplateCorreo.EMAIL_ME_QUEDE_CON_AUTO_VENDEDOR,
          0,
          NB_USUARIO_VENDEDOR,
          URL_FRONTEND,
          "",
        ],
        []
      );

      return res.status(200).json({
        error: false,
        message: "El auto fue dado de baja correctamente.",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
}

export default CompraVentaController;
