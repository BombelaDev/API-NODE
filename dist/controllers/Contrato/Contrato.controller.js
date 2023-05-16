"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/config");
const Correos_1 = __importDefault(require("../../helpers/Correos"));
const sms_1 = __importDefault(require("../../helpers/sms"));
const enums_1 = require("../../enums/enums");
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
let conekta = require("conekta");
conekta.api_key = config_1.TOKEN_CONEKTA;
conekta.locale = "es";
conekta.api_version = "2.0.0";
const axios_1 = __importDefault(require("axios"));
class ContratoController {
}
_a = ContratoController;
ContratoController.InsertaPosibleContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PIN_NB_USUARIO, PIN_CL_EMAIL, PIN_NO_TELEFONO, PIN_FG_VENDER, PIN_FG_COMPRAR, } = req.body;
        const query = "CALL CA_INSERTA_POSIBLE_CONTRATO_ABIERTO(?,?,?,?,?)";
        let replacements = [
            PIN_NB_USUARIO,
            PIN_CL_EMAIL,
            PIN_NO_TELEFONO,
            PIN_FG_VENDER,
            PIN_FG_COMPRAR,
        ];
        let respuesta = yield config_1.db.query(query, { replacements });
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
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
ContratoController.InsertaDatosVendedorContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_SOLICITUD, NB_VENDEDOR, APELLIDO_P_VENDEDOR, APELLIDO_M_VENDEDOR, RFC_VENDEDOR, CURP_VENDEDOR, DS_EMAIL_VENDEDOR, NO_TELEFONO_VENDEDOR, TIPO_IDENT_VENDEDOR, NO_IDENTIFICACION, AUTORIDAD_VENDEDOR, CALLE_VENDEDOR, NO_EXTERIOR_VENDEDOR, NO_INTERIOR_VENDEDOR, COLONIA_VENDEDOR, ESTADO_VENDEDOR, CP_VENDEDOR, MUNICIPIO_VENDEDOR, } = req.body;
        const query = "CALL CA_INSERTAR_DATOS_VENDEDOR_CONTRATO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
ContratoController.InsertaDatosCompradorContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_SOLICITUD, NB_COMPRADOR, APELLIDO_P_COMPRADOR, APELLIDO_M_COMPRADOR, RFC_COMPRADOR, CURP_COMPRADOR, DS_EMAIL_COMPRADOR, NO_TELEFONO_COMPRADOR, TIPO_IDENT_COMPRADOR, NO_IDENTIFICACION, AUTORIDAD_COMPRADOR, CALLE_COMPRADOR, NO_EXTERIOR_COMPRADOR, NO_INTERIOR_COMPRADOR, COLONIA_COMPRADOR, ESTADO_COMPRADOR, CP_COMPRADOR, MUNICIPIO_COMPRADOR, } = req.body;
        const query = "CALL CA_INSERTAR_DATOS_COMPRADOR_CONTRATO(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
ContratoController.InsertaDatosFormaPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const query = "CALL CA_INSERTAR_DATOS_FORMA_PAGO_CONTRATO(?,?,?,?,?,?,?,?,?)";
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
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
ContratoController.InsertaDatosVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_SOLICITUD, ID_MARCA, ID_MODELO, ID_ANIO, VERSION, PLACA, VIN, CL_COLOR } = req.body;
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
            CL_COLOR
        ];
        let respuesta = yield config_1.db.query(query, { replacements });
        console.log(respuesta);
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
ContratoController.ObtieneDatosContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id_solicitud = req.params.id_solicitud;
        const query = "CALL CA_OBTIENE_DATOS_CONTRATO(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [id_solicitud] });
        return res.status(200).json({
            Data: Respuesta[0]
        });
    }
    catch (error) {
        console.log("**********ERROR*********");
        console.log(error.message || error);
        console.log(error.parent.sql || "");
        console.log("**********ERROR*********");
        return res.status(500).json({
            success: false,
            mssg: 'Ocurrio un error intente mas tarde'
        });
    }
});
ContratoController.ObtieneInformacionPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id_solicitud = req.params.id_solicitud;
        const query = "CALL CA_CONFIRMA_INFORMACION_CONTRATO(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [id_solicitud] });
        if (Respuesta[0].POUT_CL_RESPUESTA == -1001) {
            return res.status(500).json({
                success: false,
                message: Respuesta[0].POUT_DS_RESPUESTA,
            });
        }
        return res.status(200).json({
            Data: Respuesta[0]
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
ContratoController.GenerarContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSolicitud = req.params.id_solicitud;
        console.log(idSolicitud);
        const data = yield axios_1.default.get('http://apiformatos.caralianz.com/postFormatoContrato.php', {
            headers: {
                "token": "54a8ce618e91b0b13665e2f9", "id_solicitud_contrato": idSolicitud
            }
        });
        console.log(data);
        return res.status(200).json(data.data);
        ///
        /*   let Respuesta:any = await  db.query(Query,{replacements:[IdCita]});
      
          res.status(200).json({
          FG_GARANTIA: Respuesta[0].FG_GARANTIA == 1 ? true : false
          })
      */
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
ContratoController.EnviarContrato = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ParametroEmail = "EMAIL_CONTRATO_ENVIO";
        const CorreoUsuario = yield Correos_1.default.EnviarCorreo("Contrato caralianz", req.body.Correo, [ParametroEmail, req.body.IdSolicitud, req.body.UrlContrato, "", ""], config_1.bbc);
        const SmsUsuario = yield sms_1.default.EnviarSMS(req.body.Telefono, "Hemos enviado al correo eléctronico el contrato solicitado. Muchas gracias por utilizar Caralianz.", enums_1.SEND_NOTIFICATIONS);
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = ContratoController;
//# sourceMappingURL=Contrato.controller.js.map