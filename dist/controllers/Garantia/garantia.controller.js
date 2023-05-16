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
const s_concepto_1 = __importDefault(require("../../models/s_concepto"));
const Correos_1 = __importDefault(require("../../helpers/Correos"));
const sms_1 = __importDefault(require("../../helpers/sms"));
const smsEnums_1 = __importDefault(require("../../enums/smsEnums"));
const enums_1 = require("../../enums/enums");
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
let conekta = require("conekta");
conekta.api_key = config_1.TOKEN_CONEKTA;
conekta.locale = "es";
conekta.api_version = "2.0.0";
class GarantiaController {
}
_a = GarantiaController;
GarantiaController.GenerarReferenciaCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_FECHA, ID_CAV, ID_USUARIO, HORA_AGENDAR, ID_MARCA, ID_MODELO, ID_ANIO, COLOR, KILOMETRAJE, REGIMEN, NB_USUARIO, DS_EMAIL, NO_TELEFONO } = req.body;
        const query = "CALL CA_INSERTA_CITA_CAR_INSPECTOR(?,?,?,?,?,?,?,?,?,?,?,?)";
        let replacements = [ID_USUARIO, ID_CAV, DS_FECHA, HORA_AGENDAR, ID_MARCA, ID_MODELO, ID_ANIO, COLOR, KILOMETRAJE.replace(/,/g, ""), NB_USUARIO, DS_EMAIL, NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
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
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
GarantiaController.verificarCuponCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_USUARIO, DS_CUPON } = req.body;
        const replacements = [DS_CUPON, ID_USUARIO];
        const query = "CALL CA_VERIFICA_CUPON(?,?)";
        const respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, NB_CUPON, MN_CUPON, ID_CUPON } = respuesta[0];
        if (POUT_CL_RESPUESTA != -1000) {
            return res.status(403).json({
                success: false,
                message: POUT_DS_RESPUESTA
            });
        }
        const concepto = yield s_concepto_1.default.findOne({ where: { CL_CONCEPTO: 1 } });
        const precioFinal = concepto.MN_CONCEPTO - MN_CUPON;
        return res.status(200).json({
            success: true,
            message: POUT_DS_RESPUESTA,
            subtotal: concepto.MN_CONCEPTO,
            nombreCupon: NB_CUPON,
            descuento: MN_CUPON,
            precioFinal: precioFinal,
            idcupon: ID_CUPON
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
GarantiaController.ObtenerPrecioCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ConceptoCarinspector = yield s_concepto_1.default.findOne({ where: { CL_CONCEPTO: 1 } });
        return res.status(200).json({
            PrecioCarinspector: ConceptoCarinspector.MN_CONCEPTO
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
GarantiaController.AplicarCupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_USUARIO, DS_CUPON, CL_REFERENCIA } = req.body;
        const replacements = [DS_CUPON, ID_USUARIO, CL_REFERENCIA];
        const query = "CALL CA_APLICA_CUPON(?,?,?)";
        const respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, NO_TELEFONO_CAV_REL, ID_CITA_CAR_INSPECTOR, DS_EMAIL_USUARIO, NO_TELEFONO_USUARIO, DS_EMAIL_CAV_REL, NO_TELEFONO_CAV_TALLER, DS_EMAIL_CAV_TALLER, } = respuesta[0];
        if (POUT_CL_RESPUESTA != -1000) {
            return res.status(403).json({
                success: false,
                message: POUT_DS_RESPUESTA
            });
        }
        const CorreoUsuario = yield Correos_1.default.EnviarCorreo("Pago recibido", DS_EMAIL_USUARIO, ["EMAIL_CITA_CARINSPECTOR_CONFIRMADA", ID_CITA_CAR_INSPECTOR, "", "", ""], config_1.bbc);
        const CorreoTaller = yield Correos_1.default.EnviarCorreo("Nueva cita", DS_EMAIL_CAV_TALLER, ["EMAIL_NUEVA_CITA_TALLER", ID_CITA_CAR_INSPECTOR, "", "", ""], config_1.bbc);
        const CorreoCav = yield Correos_1.default.EnviarCorreo("Nueva cita REL", DS_EMAIL_CAV_REL, ["EMAIL_NUEVA_CITA_REL", ID_CITA_CAR_INSPECTOR, "", "", ""], config_1.bbc);
        const SmsUsuario = yield sms_1.default.EnviarSMS(NO_TELEFONO_USUARIO, smsEnums_1.default.MENSAJE_CONFIRMACION_PAGO_CARINSPECTOR, enums_1.SEND_NOTIFICATIONS);
        return res.status(200).json({
            error: false,
            message: POUT_DS_RESPUESTA,
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
GarantiaController.PagoCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
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
                        'monthly_installments': 18,
                        "type": "card",
                        "token_id": req.body.Token
                    }
                }]
        };
        conekta.Order.create(checkoutOrderObject, function (err, response) {
            var _b, _c;
            if (err) {
                console.log(err.http_code);
                console.log((_b = err.details[0]) === null || _b === void 0 ? void 0 : _b.message);
                return res.status(err.http_code).json({
                    message: ((_c = err.details[0]) === null || _c === void 0 ? void 0 : _c.message) || "Ocurrio un error con tu forma de pago"
                });
            }
            // console.log(response.toObject());
            const respuesta = response.toObject();
            console.log(respuesta.payment_status);
            console.log(respuesta.id);
            return res.status(200).json({
                success: true
            });
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
exports.default = GarantiaController;
//# sourceMappingURL=garantia.controller.js.map