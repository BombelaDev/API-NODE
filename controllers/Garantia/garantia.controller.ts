import { Request, Response } from "express";
import { db, NB_BUCKET, URL_BACKEND, URL_FRONTEND, TOKEN_CONEKTA, bbc } from '../../config/config';
import ConceptoModel from '../../models/s_concepto';
import Correo from '../../helpers/Correos';
import sms from '../../helpers/sms';
import smsEnums from '../../enums/smsEnums';
import { SEND_NOTIFICATIONS } from '../../enums/enums';
import ErrorClass from "../../helpers/ErrorsValidate";

let conekta = require("conekta");

conekta.api_key = TOKEN_CONEKTA;


conekta.locale = "es";
conekta.api_version = "2.0.0";


class GarantiaController {

  static GenerarReferenciaCarinspector = async (req: any, res: Response) => {

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
        NO_TELEFONO
      } = req.body;


      const query = "CALL CA_INSERTA_CITA_CAR_INSPECTOR(?,?,?,?,?,?,?,?,?,?,?,?)";
      let replacements = [ID_USUARIO, ID_CAV, DS_FECHA, HORA_AGENDAR, ID_MARCA, ID_MODELO, ID_ANIO, COLOR, KILOMETRAJE.replace(/,/g, ""), NB_USUARIO, DS_EMAIL, NO_TELEFONO];
      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA == -1001) {
        return res.status(200).json({
          success: false,
          message: respuesta[0].POUT_DS_RESPUESTA
        });
      }


      console.log(respuesta[0].POUT_CL_REFERENCIA);

      return res.status(200).json({
        success: true,
        Referencia: respuesta[0].POUT_CL_REFERENCIA

      })

    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }






  }


  static verificarCuponCarinspector = async (req: any, res: Response) => {

    try {
      const { ID_USUARIO, DS_CUPON } = req.body;
      const replacements = [DS_CUPON, ID_USUARIO];
      const query = "CALL CA_VERIFICA_CUPON(?,?)";
      const respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, NB_CUPON, MN_CUPON, ID_CUPON } = respuesta[0];

      if (POUT_CL_RESPUESTA != -1000) {
        return res.status(403).json({
          success: false,
          message: POUT_DS_RESPUESTA
        });
      }
      const concepto: any = await ConceptoModel.findOne({ where: { CL_CONCEPTO: 1 } });
      const precioFinal = concepto.MN_CONCEPTO - MN_CUPON;

      return res.status(200).json({
        success: true,
        message: POUT_DS_RESPUESTA,
        subtotal: concepto.MN_CONCEPTO,
        nombreCupon: NB_CUPON,
        descuento: MN_CUPON,
        precioFinal: precioFinal,
        idcupon: ID_CUPON
      })


    } catch (error) {
      console.log("**********ERROR*********");
      console.log(error.message || error);
      console.log(error.parent.sql || "");
      console.log("**********ERROR*********");
      return res.status(500).json({
        success: false,
        mssg: 'Ocurrio un error intente mas tarde'
      })
    }






  }

  static ObtenerPrecioCarinspector = async (req: any, res: Response) => {

    try {
      const ConceptoCarinspector: any = await ConceptoModel.findOne({ where: { CL_CONCEPTO: 1 } });

      return res.status(200).json({
        PrecioCarinspector: ConceptoCarinspector.MN_CONCEPTO
      })

    } catch (error) {
      console.log("**********ERROR*********");
      console.log(error.message || error);
      console.log(error.parent.sql || "");
      console.log("**********ERROR*********");
      return res.status(500).json({
        success: false,
        mssg: 'Ocurrio un error intente mas tarde'
      });
    }






  }



  static AplicarCupon = async (req: any, res: Response) => {

    try {
      const { ID_USUARIO, DS_CUPON, CL_REFERENCIA } = req.body;
      const replacements = [DS_CUPON, ID_USUARIO, CL_REFERENCIA];
      const query = "CALL CA_APLICA_CUPON(?,?,?)";
      const respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, NO_TELEFONO_CAV_REL, ID_CITA_CAR_INSPECTOR, DS_EMAIL_USUARIO, NO_TELEFONO_USUARIO, DS_EMAIL_CAV_REL, NO_TELEFONO_CAV_TALLER, DS_EMAIL_CAV_TALLER, } = respuesta[0];

      if (POUT_CL_RESPUESTA != -1000) {
        return res.status(403).json({
          success: false,
          message: POUT_DS_RESPUESTA
        })
      }
      const CorreoUsuario = await Correo.EnviarCorreo("Pago recibido", DS_EMAIL_USUARIO, ["EMAIL_CITA_CARINSPECTOR_CONFIRMADA", ID_CITA_CAR_INSPECTOR, "", "", ""], bbc);
      const CorreoTaller = await Correo.EnviarCorreo("Nueva cita", DS_EMAIL_CAV_TALLER, ["EMAIL_NUEVA_CITA_TALLER", ID_CITA_CAR_INSPECTOR, "", "", ""], bbc);
      const CorreoCav = await Correo.EnviarCorreo("Nueva cita REL", DS_EMAIL_CAV_REL, ["EMAIL_NUEVA_CITA_REL", ID_CITA_CAR_INSPECTOR, "", "", ""], bbc);
      const SmsUsuario = await sms.EnviarSMS(NO_TELEFONO_USUARIO, smsEnums.MENSAJE_CONFIRMACION_PAGO_CARINSPECTOR, SEND_NOTIFICATIONS);

      return res.status(200).json({
        error: false,
        message: POUT_DS_RESPUESTA,

      })


    } catch (error) {
      console.log("**********ERROR*********");
      console.log(error.message || error);
      console.log(error.parent.sql || "");
      console.log("**********ERROR*********");
      return res.status(500).json({
        success: false,
        mssg: 'Ocurrio un error intente mas tarde'
      })
    }






  }



  static PagoCarinspector = async (req: any, res: Response) => {

    try {
      console.log(req.body)

      let checkoutOrderObject = {
        currency: "MXN",
        "customer_info": {
          "name": "Jul Ceballos",
          "phone": "+5215555555555",
          "email": "jul@conekta.io"
        },
        "line_items": [{
          "name": "Box of Cohiba S1s",
          "unit_price": 35000 * 100,
          "quantity": 1
        }],

        "charges": [{
          "payment_method": {
            'monthly_installments': 18, //optional 
            "type": "card",
            "token_id": req.body.Token
          }
        }]
      };

      conekta.Order.create(checkoutOrderObject, function (err, response) {
        if (err) {
          console.log(err.http_code);
          console.log(err.details[0]?.message);
          return res.status(err.http_code).json({
            message: err.details[0]?.message || "Ocurrio un error con tu forma de pago"
          });
        }
        // console.log(response.toObject());
        const respuesta = response.toObject();
        console.log(respuesta.payment_status);
        console.log(respuesta.id);

        return res.status(200).json({
          success: true
        })
      });



    } catch (error) {
      console.log("**********ERROR*********");
      console.log(error.message || error);
      console.log(error.parent.sql || "");
      console.log("**********ERROR*********");
      return res.status(500).json({
        success: false,
        mssg: 'Ocurrio un error intente mas tarde'
      })
    }






  }



}




export default GarantiaController;
