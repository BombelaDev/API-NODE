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
const config_1 = require("./../../config/config");
const config_2 = require("../../config/config");
const s_concepto_1 = __importDefault(require("../../models/s_concepto"));
const Correos_1 = __importDefault(require("../../helpers/Correos"));
const sms_1 = __importDefault(require("../../helpers/sms"));
const smsEnums_1 = __importDefault(require("../../enums/smsEnums"));
const enums_1 = require("../../enums/enums");
const c_usuario_1 = __importDefault(require("../../models/c_usuario"));
const Genericos_1 = __importDefault(require("../../helpers/Genericos"));
const enums_2 = __importDefault(require("../../enums/enums"));
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
let conekta = require("conekta");
conekta.api_key = config_2.TOKEN_CONEKTA;
conekta.locale = "es";
conekta.api_version = "2.0.0";
class CarinspectorController {
}
_a = CarinspectorController;
CarinspectorController.InsertaLeadPortal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PIN_NB_USUARIO, PIN_NO_TELEFONO, PIN_CL_CORREO, PIN_ID_MARCA, PIN_ID_MODELO, PIN_ID_ANIO, DS_IDENTIFICADOR, PIN_ID_CAV, PIN_CL_TIPO_LEAD, PIN_NB_CALLE, PIN_NO_EXT, PIN_NO_INT, PIN_NB_COLONIA, PIN_ID_ESTADO, PIN_ID_MUNICIPIO, PIN_DS_REFERENCIAS, PIN_FE_CITA, PIN_HR_CITA, } = req.body;
        const query = "CALL CA_INSERTA_LEAD_PORTAL(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
        let respuesta = yield config_2.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, POUT_MN_COSTO, POUT_ID_LEAD, POUT_CL_REFERENCIA, } = respuesta[0];
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(200).json({
                success: false,
                message: respuesta[0].POUT_DS_RESPUESTA
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
            PIN_NB_USUARIO
        };
        return res.status(200).json(data);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.LiberarCitaCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const query = "CALL CA_LIBERA_CITA_ABANDONO_PAGINA(?)";
        let replacements = [req.body.Referencia];
        let respuesta = yield config_2.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.InsertaPosibleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PIN_ID_MARCA, PIN_ID_MODELO, PIN_ID_ANIO, PIN_NB_USUARIO, PIN_CL_EMAIL, PIN_NO_TELEFONO } = req.body;
        const query = "CALL CA_INSERTA_POSIBLE_VENTA_ABIERTO(?,?,?,?,?,?)";
        let replacements = [PIN_ID_MARCA, PIN_ID_MODELO, PIN_ID_ANIO, PIN_NB_USUARIO, PIN_CL_EMAIL, PIN_NO_TELEFONO];
        let respuesta = yield config_2.db.query(query, { replacements });
        const { CL_FOLIO, ID_SOLICITUD, ID_USUARIO, ES_NUEVO //1 USUARIO NUEVO, 0 USUARIO EXISTENTE
         } = respuesta[0];
        //EMAIL_POSIBLE_VENTA_ABIERTO_INVITADO_VENDEDOR
        let urlactivar = "";
        if (ES_NUEVO == 1) {
            const token = yield Genericos_1.default.generarJWT(ID_USUARIO);
            urlactivar = config_2.URL_FRONTEND + "activar-usuario/" + token;
        }
        const ParametroEmailCarinspector = ES_NUEVO == 1 ? enums_2.default.EMAIL_POSIBLE_VENTA_ABIERTO_INVITADO_VENDEDOR : enums_2.default.EMAIL_POSIBLE_VENTA_ABIERTO_VENDEDOR;
        const CorreoUsuario = yield Correos_1.default.EnviarCorreo("Vende tu auto", PIN_CL_EMAIL, [ParametroEmailCarinspector, ID_SOLICITUD, urlactivar, "", ""], config_2.bbc);
        const CorreoAdmin = yield Correos_1.default.EnviarCorreo("Alguien quiere vender su auto", config_1.admin, [enums_2.default.EMAIL_POSIBLE_VENTA_ABIERTO_CARALIANZ, ID_SOLICITUD, "", "", ""], config_2.bbc);
        const SmsUsuario = yield sms_1.default.EnviarSMS("+5565637978", smsEnums_1.default.MENSAJE_POSIBLE_VENTA_CARALIANZ.replace("[FOLIO]", CL_FOLIO), enums_1.SEND_NOTIFICATIONS);
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.InsertaPosibleGarantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PIN_ID_MARCA, PIN_ID_MODELO, PIN_ID_ANIO, PIN_NB_USUARIO, PIN_CL_EMAIL, PIN_NO_TELEFONO, CL_TIPO_GARANTIA, NO_KM } = req.body;
        const query = "CALL CA_INSERTA_POSIBLE_GARANTIA_ABIERTO(?,?,?,?,?,?,?,?)";
        let replacements = [PIN_ID_MARCA, PIN_ID_MODELO, PIN_ID_ANIO, PIN_NB_USUARIO, PIN_CL_EMAIL, PIN_NO_TELEFONO, CL_TIPO_GARANTIA, NO_KM.replace(/,/g, "")];
        let respuesta = yield config_2.db.query(query, { replacements });
        const { CL_FOLIO, ID_SOLICITUD, ID_USUARIO, ES_NUEVO //1 USUARIO NUEVO, 0 USUARIO EXISTENTE
         } = respuesta;
        //EMAIL_POSIBLE_VENTA_ABIERTO_INVITADO_VENDEDOR
        let urlactivar = "";
        if (ES_NUEVO == 1) {
            const token = yield Genericos_1.default.generarJWT(ID_USUARIO);
            urlactivar = config_2.URL_FRONTEND + "activar-usuario/" + token;
        }
        const ParametroEmailCarinspector = ES_NUEVO == 1 ? enums_2.default.EMAIL_POSIBLE_GARANTIA_ABIERTO_INVITADO_VENDEDOR : enums_2.default.EMAIL_POSIBLE_GARANTIA_ABIERTO_VENDEDOR;
        const CorreoUsuario = yield Correos_1.default.EnviarCorreo("Vende tu auto", PIN_CL_EMAIL, [ParametroEmailCarinspector, ID_SOLICITUD, urlactivar, "", ""], config_2.bbc);
        //const CorreoAdmin = await  Correo.EnviarCorreo("Alguien quiere vender su auto",admin,[TemplateCorreo.EMAIL_POSIBLE_GARANTIA_ABIERTO_CARALIANZ,ID_SOLICITUD,"","",""], bbc);
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.GenerarRerefenciaGarantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_FECHA, ID_CAV, ID_USUARIO, HORA_AGENDAR, ID_MARCA, ID_MODELO, ID_ANIO, COLOR, KILOMETRAJE, REGIMEN, NB_USUARIO, DS_EMAIL, NO_TELEFONO, CL_TIPO_GARANTIA } = req.body;
        const query = "CALL CA_INSERTA_CITA_CAR_INSPECTOR_GARANTIA(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        let replacements = [ID_USUARIO, ID_CAV, DS_FECHA, HORA_AGENDAR, ID_MARCA, ID_MODELO, ID_ANIO, COLOR, KILOMETRAJE.replace(/,/g, ""), NB_USUARIO, DS_EMAIL, NO_TELEFONO, CL_TIPO_GARANTIA];
        let respuesta = yield config_2.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA == -1001) {
            return res.status(200).json({
                success: false,
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        return res.status(200).json({
            success: true,
            Referencia: respuesta[0].POUT_CL_REFERENCIA,
            Folio: respuesta[0].POUT_CL_FOLIO,
            Servicio: respuesta[0].POUT_CL_SERVICIO
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.verificarCuponCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_USUARIO, DS_CUPON } = req.body;
        const replacements = [DS_CUPON, ID_USUARIO];
        const query = "CALL CA_VERIFICA_CUPON(?,?)";
        const respuesta = yield config_2.db.query(query, { replacements });
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
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.ObtenerPrecioCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ConceptoCarinspector = yield s_concepto_1.default.findOne({ where: { CL_CONCEPTO: 1 } });
        return res.status(200).json({
            PrecioCarinspector: ConceptoCarinspector.MN_CONCEPTO
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.ObtenerPrecioGarantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const respuesta = yield config_2.db.query(query, { replacements: [cl_concepto] });
        const { MN_CONCEPTO, NB_TITULO, NB_CUPON, CL_CONCEPTO } = respuesta[0];
        return res.status(200).json({
            PrecioGarantia: MN_CONCEPTO
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.ObtenerInformacionCertificadoCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_vehiculo_datos = req.params.id_vehiculo_datos;
        const query = "CALL CA_VERIFICA_VIGENCIA_CERTIFICADO(?)";
        const respuesta = yield config_2.db.query(query, { replacements: [id_vehiculo_datos] });
        return res.status(200).json({
            Certificado: respuesta[0]
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.AplicarCupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_USUARIO, DS_CUPON, CL_REFERENCIA } = req.body;
        const replacements = [DS_CUPON, ID_USUARIO, CL_REFERENCIA];
        const query = "CALL CA_APLICA_CUPON(?,?,?)";
        const respuesta = yield config_2.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, NO_TELEFONO_CAV_REL, ID_CITA_CAR_INSPECTOR, DS_EMAIL_USUARIO, NO_TELEFONO_USUARIO, DS_EMAIL_CAV_REL, NO_TELEFONO_CAV_TALLER, DS_EMAIL_CAV_TALLER, } = respuesta[0];
        if (POUT_CL_RESPUESTA != -1000) {
            return res.status(403).json({
                success: false,
                message: POUT_DS_RESPUESTA
            });
        }
        const ConceptoCarinspector = yield c_usuario_1.default.findOne({ where: { DS_EMAIL: DS_EMAIL_USUARIO }, attributes: ['CL_ESTADO', 'ID_USUARIO'] });
        const { CL_ESTADO } = ConceptoCarinspector;
        let urlactivar = "";
        if (CL_ESTADO == 0) {
            const token = yield Genericos_1.default.generarJWT(ID_USUARIO);
            urlactivar = config_2.URL_FRONTEND + "activar-usuario/" + token;
        }
        const ParametroEmailCarinspector = CL_ESTADO == 1 ? enums_2.default.EMAIL_CITA_CARINSPECTOR_CONFIRMADA_CUPON : enums_2.default.EMAIL_CITA_CARINSPECTOR_CONFIRMADA_INVITADO_CUPON;
        const CorreoUsuario = yield Correos_1.default.EnviarCorreo("Tu cita carinspector está lista", DS_EMAIL_USUARIO, [ParametroEmailCarinspector, ID_CITA_CAR_INSPECTOR, urlactivar, "", ""], config_2.bbc);
        const CorreoTaller = yield Correos_1.default.EnviarCorreo("Nueva cita", DS_EMAIL_CAV_TALLER, ["EMAIL_NUEVA_CITA_TALLER", ID_CITA_CAR_INSPECTOR, "", "", ""], config_2.bbc);
        const CorreoCav = yield Correos_1.default.EnviarCorreo("Nueva cita REL", DS_EMAIL_CAV_REL, ["EMAIL_NUEVA_CITA_REL", ID_CITA_CAR_INSPECTOR, "", "", ""], config_2.bbc);
        const SmsUsuario = yield sms_1.default.EnviarSMS(NO_TELEFONO_USUARIO, smsEnums_1.default.MENSAJE_CONFIRMACION_PAGO_CARINSPECTOR_CUPON, enums_1.SEND_NOTIFICATIONS);
        return res.status(200).json({
            error: false,
            message: POUT_DS_RESPUESTA,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.PagoCarinspector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CarinspectorController.GuardarProcesoPortal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_MARCA, ID_MODELO, ID_ANIO, CB_NOMBRE, CL_EMAIL, NO_TELEFONO, TipoProceso } = req.body;
        const query = "CALL CA_INSERTA_PROCESO_PORTAL(?,?,?,?,?,?,?)";
        let replacements = [ID_MARCA, ID_MODELO, ID_ANIO, CB_NOMBRE, CL_EMAIL, NO_TELEFONO, TipoProceso];
        let respuesta = yield config_2.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, ID_SOLICITUD } = respuesta[0];
        return res.status(200).json({
            success: true,
            ID_SOLICITUD
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = CarinspectorController;
//# sourceMappingURL=carinspector.controller.js.map