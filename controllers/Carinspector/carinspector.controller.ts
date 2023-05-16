import { admin } from "./../../config/config";
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
import UsuarioModel from "../../models/c_usuario";
import Genericos from "../../helpers/Genericos";
import TemplateCorreo from "../../enums/enums";
import ErrorClass from "../../helpers/ErrorsValidate";

let conekta = require("conekta");

conekta.api_key = TOKEN_CONEKTA;

conekta.locale = "es";
conekta.api_version = "2.0.0";

class CarinspectorController {
  static InsertaLeadPortal = async (req: any, res: Response) => {
    try {
      const {
        PIN_NB_USUARIO,
        PIN_NO_TELEFONO,
        PIN_CL_CORREO,
        PIN_ID_MARCA,
        PIN_ID_MODELO,
        PIN_ID_ANIO,
        DS_IDENTIFICADOR,
        PIN_ID_CAV,
        PIN_CL_TIPO_LEAD,
        PIN_NB_CALLE,
        PIN_NO_EXT,
        PIN_NO_INT,
        PIN_NB_COLONIA,
        PIN_ID_ESTADO,
        PIN_ID_MUNICIPIO,
        PIN_DS_REFERENCIAS,
        PIN_FE_CITA,
        PIN_HR_CITA,
      } = req.body;

      const query =
        "CALL CA_INSERTA_LEAD_PORTAL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
      let replacements = [
        PIN_NB_USUARIO,
        PIN_NO_TELEFONO,
        PIN_CL_CORREO,
        PIN_ID_MARCA,
        PIN_ID_MODELO,
        PIN_ID_ANIO,
        DS_IDENTIFICADOR,
        PIN_ID_CAV,
        PIN_CL_TIPO_LEAD,
        PIN_NB_CALLE,
        PIN_NO_EXT,
        PIN_NO_INT,
        PIN_NB_COLONIA,
        PIN_ID_ESTADO,
        PIN_ID_MUNICIPIO,
        PIN_DS_REFERENCIAS,
        PIN_FE_CITA,
        PIN_HR_CITA,
      ];

      let respuesta: any = await db.query(query, { replacements });

      const {
        POUT_CL_RESPUESTA,
        POUT_DS_RESPUESTA,
        POUT_MN_COSTO,
        POUT_ID_LEAD,
        POUT_CL_REFERENCIA,
      } = respuesta[0];

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(200).json({
          success: false,
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      const data = {
        success: true,
        POUT_CL_RESPUESTA,
        POUT_DS_RESPUESTA,
        POUT_MN_COSTO,
        POUT_ID_LEAD,
        POUT_CL_REFERENCIA,
        PIN_NO_TELEFONO,
        PIN_CL_CORREO,
        PIN_NB_USUARIO,
      };

      return res.status(200).json(data);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static LiberarCitaCarinspector = async (req: any, res: Response) => {
    try {
      console.log(req.body);

      const query = "CALL CA_LIBERA_CITA_ABANDONO_PAGINA(?)";
      let replacements = [req.body.Referencia];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaPosibleVenta = async (req: any, res: Response) => {
    try {
      const {
        PIN_ID_MARCA,
        PIN_ID_MODELO,
        PIN_ID_ANIO,
        PIN_NB_USUARIO,
        PIN_CL_EMAIL,
        PIN_NO_TELEFONO,
      } = req.body;
      const query = "CALL CA_INSERTA_POSIBLE_VENTA_ABIERTO(?,?,?,?,?,?)";
      let replacements = [
        PIN_ID_MARCA,
        PIN_ID_MODELO,
        PIN_ID_ANIO,
        PIN_NB_USUARIO,
        PIN_CL_EMAIL,
        PIN_NO_TELEFONO,
      ];
      let respuesta: any = await db.query(query, { replacements });

      const {
        CL_FOLIO,
        ID_SOLICITUD,
        ID_USUARIO,
        ES_NUEVO, //1 USUARIO NUEVO, 0 USUARIO EXISTENTE
      } = respuesta[0];

      //EMAIL_POSIBLE_VENTA_ABIERTO_INVITADO_VENDEDOR
      let urlactivar = "";
      if (ES_NUEVO == 1) {
        const token = await Genericos.generarJWT(ID_USUARIO);
        urlactivar = URL_FRONTEND + "activar-usuario/" + token;
      }

      const ParametroEmailCarinspector =
        ES_NUEVO == 1
          ? TemplateCorreo.EMAIL_POSIBLE_VENTA_ABIERTO_INVITADO_VENDEDOR
          : TemplateCorreo.EMAIL_POSIBLE_VENTA_ABIERTO_VENDEDOR;

      const CorreoUsuario = await Correo.EnviarCorreo(
        "Vende tu auto",
        PIN_CL_EMAIL,
        [ParametroEmailCarinspector, ID_SOLICITUD, urlactivar, "", ""],
        bbc
      );
      const CorreoAdmin = await Correo.EnviarCorreo(
        "Alguien quiere vender su auto",
        admin,
        [
          TemplateCorreo.EMAIL_POSIBLE_VENTA_ABIERTO_CARALIANZ,
          ID_SOLICITUD,
          "",
          "",
          "",
        ],
        bbc
      );
      const SmsUsuario = await sms.EnviarSMS(
        "+5565637978",
        smsEnums.MENSAJE_POSIBLE_VENTA_CARALIANZ.replace("[FOLIO]", CL_FOLIO),
        SEND_NOTIFICATIONS
      );

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaPosibleGarantia = async (req: any, res: Response) => {
    try {
      const {
        PIN_ID_MARCA,
        PIN_ID_MODELO,
        PIN_ID_ANIO,
        PIN_NB_USUARIO,
        PIN_CL_EMAIL,
        PIN_NO_TELEFONO,
        CL_TIPO_GARANTIA,
        NO_KM,
      } = req.body;

      const query = "CALL CA_INSERTA_POSIBLE_GARANTIA_ABIERTO(?,?,?,?,?,?,?,?)";
      let replacements = [
        PIN_ID_MARCA,
        PIN_ID_MODELO,
        PIN_ID_ANIO,
        PIN_NB_USUARIO,
        PIN_CL_EMAIL,
        PIN_NO_TELEFONO,
        CL_TIPO_GARANTIA,
        NO_KM.replace(/,/g, ""),
      ];
      let respuesta: any = await db.query(query, { replacements });

      const {
        CL_FOLIO,
        ID_SOLICITUD,
        ID_USUARIO,
        ES_NUEVO, //1 USUARIO NUEVO, 0 USUARIO EXISTENTE
      } = respuesta;

      //EMAIL_POSIBLE_VENTA_ABIERTO_INVITADO_VENDEDOR
      let urlactivar = "";
      if (ES_NUEVO == 1) {
        const token = await Genericos.generarJWT(ID_USUARIO);
        urlactivar = URL_FRONTEND + "activar-usuario/" + token;
      }

      const ParametroEmailCarinspector =
        ES_NUEVO == 1
          ? TemplateCorreo.EMAIL_POSIBLE_GARANTIA_ABIERTO_INVITADO_VENDEDOR
          : TemplateCorreo.EMAIL_POSIBLE_GARANTIA_ABIERTO_VENDEDOR;

      const CorreoUsuario = await Correo.EnviarCorreo(
        "Vende tu auto",
        PIN_CL_EMAIL,
        [ParametroEmailCarinspector, ID_SOLICITUD, urlactivar, "", ""],
        bbc
      );

      //const CorreoAdmin = await  Correo.EnviarCorreo("Alguien quiere vender su auto",admin,[TemplateCorreo.EMAIL_POSIBLE_GARANTIA_ABIERTO_CARALIANZ,ID_SOLICITUD,"","",""], bbc);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static GenerarRerefenciaGarantia = async (req: any, res: Response) => {
    try {
      const {
        DS_FECHA,
        ID_CAV,
        ID_USUARIO,
        HORA_AGENDAR,
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        COLOR,
        KILOMETRAJE,
        REGIMEN,
        NB_USUARIO,
        DS_EMAIL,
        NO_TELEFONO,
        CL_TIPO_GARANTIA,
      } = req.body;

      const query =
        "CALL CA_INSERTA_CITA_CAR_INSPECTOR_GARANTIA(?,?,?,?,?,?,?,?,?,?,?,?,?)";
      let replacements = [
        ID_USUARIO,
        ID_CAV,
        DS_FECHA,
        HORA_AGENDAR,
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        COLOR,
        KILOMETRAJE.replace(/,/g, ""),
        NB_USUARIO,
        DS_EMAIL,
        NO_TELEFONO,
        CL_TIPO_GARANTIA,
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
        Referencia: respuesta[0].POUT_CL_REFERENCIA,
        Folio: respuesta[0].POUT_CL_FOLIO,
        Servicio: respuesta[0].POUT_CL_SERVICIO,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static verificarCuponCarinspector = async (req: any, res: Response) => {
    try {
      const { ID_USUARIO, DS_CUPON } = req.body;

      const replacements = [DS_CUPON, ID_USUARIO];
      const query = "CALL CA_VERIFICA_CUPON(?,?)";
      const respuesta: any = await db.query(query, { replacements });
      const {
        POUT_CL_RESPUESTA,
        POUT_DS_RESPUESTA,
        NB_CUPON,
        MN_CUPON,
        ID_CUPON,
      } = respuesta[0];

      if (POUT_CL_RESPUESTA != -1000) {
        return res.status(403).json({
          success: false,
          message: POUT_DS_RESPUESTA,
        });
      }
      const concepto: any = await ConceptoModel.findOne({
        where: { CL_CONCEPTO: 1 },
      });
      const precioFinal = concepto.MN_CONCEPTO - MN_CUPON;

      return res.status(200).json({
        success: true,
        message: POUT_DS_RESPUESTA,
        subtotal: concepto.MN_CONCEPTO,
        nombreCupon: NB_CUPON,
        descuento: MN_CUPON,
        precioFinal: precioFinal,
        idcupon: ID_CUPON,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerPrecioCarinspector = async (req: any, res: Response) => {
    try {
      const ConceptoCarinspector: any = await ConceptoModel.findOne({
        where: { CL_CONCEPTO: 1 },
      });

      return res.status(200).json({
        PrecioCarinspector: ConceptoCarinspector.MN_CONCEPTO,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerPrecioGarantia = async (req: any, res: Response) => {
    try {
      const cl_concepto = req.params.cl_concepto;
      console.log(cl_concepto);

      /*  console.log(cl_concepto)
 if(!cl_concepto){
   return res.status(500).json({
     message:"Ocurrio un error intente mas tarde."
   })
 } */
      const query = "CALL CA_OBTIENE_CONCEPTO(?)";
      const respuesta: any = await db.query(query, {
        replacements: [cl_concepto],
      });

      const { MN_CONCEPTO, NB_TITULO, NB_CUPON, CL_CONCEPTO } = respuesta[0];

      return res.status(200).json({
        PrecioGarantia: MN_CONCEPTO,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerInformacionCertificadoCarinspector = async (
    req: any,
    res: Response
  ) => {
    try {
      const id_vehiculo_datos = req.params.id_vehiculo_datos;
      const query = "CALL CA_VERIFICA_VIGENCIA_CERTIFICADO(?)";
      const respuesta: any = await db.query(query, {
        replacements: [id_vehiculo_datos],
      });

      return res.status(200).json({
        Certificado: respuesta[0],
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static AplicarCupon = async (req: any, res: Response) => {
    try {
      const { ID_USUARIO, DS_CUPON, CL_REFERENCIA } = req.body;
      const replacements = [DS_CUPON, ID_USUARIO, CL_REFERENCIA];
      const query = "CALL CA_APLICA_CUPON(?,?,?)";
      const respuesta: any = await db.query(query, { replacements });
      const {
        POUT_CL_RESPUESTA,
        POUT_DS_RESPUESTA,
        NO_TELEFONO_CAV_REL,
        ID_CITA_CAR_INSPECTOR,
        DS_EMAIL_USUARIO,
        NO_TELEFONO_USUARIO,
        DS_EMAIL_CAV_REL,
        NO_TELEFONO_CAV_TALLER,
        DS_EMAIL_CAV_TALLER,
      } = respuesta[0];

      if (POUT_CL_RESPUESTA != -1000) {
        return res.status(403).json({
          success: false,
          message: POUT_DS_RESPUESTA,
        });
      }

      const ConceptoCarinspector: any = await UsuarioModel.findOne({
        where: { DS_EMAIL: DS_EMAIL_USUARIO },
        attributes: ["CL_ESTADO", "ID_USUARIO"],
      });
      const { CL_ESTADO } = ConceptoCarinspector;
      let urlactivar = "";

      if (CL_ESTADO == 0) {
        const token = await Genericos.generarJWT(ID_USUARIO);
        urlactivar = URL_FRONTEND + "activar-usuario/" + token;
      }

      const ParametroEmailCarinspector =
        CL_ESTADO == 1
          ? TemplateCorreo.EMAIL_CITA_CARINSPECTOR_CONFIRMADA_CUPON
          : TemplateCorreo.EMAIL_CITA_CARINSPECTOR_CONFIRMADA_INVITADO_CUPON;

      const CorreoUsuario = await Correo.EnviarCorreo(
        "Tu cita carinspector está lista",
        DS_EMAIL_USUARIO,
        [ParametroEmailCarinspector, ID_CITA_CAR_INSPECTOR, urlactivar, "", ""],
        bbc
      );
      const CorreoTaller = await Correo.EnviarCorreo(
        "Nueva cita",
        DS_EMAIL_CAV_TALLER,
        ["EMAIL_NUEVA_CITA_TALLER", ID_CITA_CAR_INSPECTOR, "", "", ""],
        bbc
      );
      const CorreoCav = await Correo.EnviarCorreo(
        "Nueva cita REL",
        DS_EMAIL_CAV_REL,
        ["EMAIL_NUEVA_CITA_REL", ID_CITA_CAR_INSPECTOR, "", "", ""],
        bbc
      );
      const SmsUsuario = await sms.EnviarSMS(
        NO_TELEFONO_USUARIO,
        smsEnums.MENSAJE_CONFIRMACION_PAGO_CARINSPECTOR_CUPON,
        SEND_NOTIFICATIONS
      );

      return res.status(200).json({
        error: false,
        message: POUT_DS_RESPUESTA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static PagoCarinspector = async (req: any, res: Response) => {
    try {
      console.log(req.body);

      let checkoutOrderObject = {
        currency: "MXN",
        customer_info: {
          name: "Jul Ceballos",
          phone: "+5215555555555",
          email: "jul@conekta.io",
        },
        line_items: [
          {
            name: "Box of Cohiba S1s",
            unit_price: 35000 * 100,
            quantity: 1,
          },
        ],

        charges: [
          {
            payment_method: {
              monthly_installments: 18, //optional
              type: "card",
              token_id: req.body.Token,
            },
          },
        ],
      };

      conekta.Order.create(checkoutOrderObject, function (err, response) {
        if (err) {
          console.log(err.http_code);
          console.log(err.details[0]?.message);
          return res.status(err.http_code).json({
            message:
              err.details[0]?.message ||
              "Ocurrio un error con tu forma de pago",
          });
        }
        // console.log(response.toObject());
        const respuesta = response.toObject();
        console.log(respuesta.payment_status);
        console.log(respuesta.id);

        return res.status(200).json({
          success: true,
        });
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static GuardarProcesoPortal = async (req: any, res: Response) => {
    try {
      const {
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        CB_NOMBRE,
        CL_EMAIL,
        NO_TELEFONO,
        TipoProceso,
      } = req.body;

      const query = "CALL CA_INSERTA_PROCESO_PORTAL(?,?,?,?,?,?,?)";

      let replacements = [
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        CB_NOMBRE,
        CL_EMAIL,
        NO_TELEFONO,
        TipoProceso,
      ];
      let respuesta: any = await db.query(query, { replacements });

      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, ID_SOLICITUD } =
        respuesta[0];

      return res.status(200).json({
        success: true,
        ID_SOLICITUD,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
}

export default CarinspectorController;
