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
const enums_1 = require("../../enums/enums");
const sms_1 = __importDefault(require("../../helpers/sms"));
const enums_2 = __importDefault(require("../../enums/enums"));
const smsEnums_1 = require("../../enums/smsEnums");
const c_cita_car_sales_1 = __importDefault(require("../../models/c_cita_car_sales"));
const consultas_1 = __importDefault(require("../../helpers/consultas"));
const Genericos_1 = __importDefault(require("../../helpers/Genericos"));
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
const c_usuario_1 = __importDefault(require("../../models/c_usuario"));
class CompraVentaController {
}
_a = CompraVentaController;
CompraVentaController.GeneraCitaComercial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_FECHA, ID_CAV, ID_COMPRADOR, HORA_AGENDAR, ID_AUTO, DS_EMAIL, NO_TELEFONO } = req.body;
        if (!DS_FECHA || !DS_FECHA || !ID_CAV || !ID_COMPRADOR || !HORA_AGENDAR || !ID_AUTO) {
            res.status(500).json({ message: "Datos incompletos" });
            return;
        }
        const query = "CALL CA_INSERTA_CITA_CAR_SALES(?,?,?,?,?)";
        let replacements = [ID_COMPRADOR, ID_CAV, ID_AUTO, DS_FECHA, HORA_AGENDAR];
        console.log(replacements);
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, V_DS_CORREO, DS_CORREO_CAV, POUT_ID_CITA, V_NO_TELEFONO_MOVIL, V_NB_VEHICULO } = respuesta[0];
        if (POUT_CL_RESPUESTA != -1000) {
            return res.status(500).json({
                mssg: respuesta[0].POUT_DS_RESPUESTA,
            });
        }
        const UsuarioCompradorData = yield c_usuario_1.default.findOne({ where: { DS_EMAIL: DS_EMAIL }, attributes: ['CL_ESTADO', 'ID_USUARIO'] });
        const { CL_ESTADO } = UsuarioCompradorData;
        let urlactivar = "";
        if (CL_ESTADO == 0) {
            const token = yield Genericos_1.default.generarJWT(ID_COMPRADOR);
            urlactivar = config_1.URL_FRONTEND + "activar-usuario/" + token;
        }
        const ParametroEmailCarinspector = CL_ESTADO == 1 ? enums_2.default.EMAIL_CONFIRMACION_COMPRA_COMPRADOR : enums_2.default.EMAIL_CONFIRMACION_COMPRA_COMPRADOR_INVITADO;
        const CorreoAdminCav = yield Correos_1.default.EnviarCorreo('Alguien esta interesado en comprar un auto', DS_CORREO_CAV, [enums_2.default.EMAIL_INTERES_COMPRA_CARALIANZ, POUT_ID_CITA, "", "", ""], [config_1.bbc]);
        //   
        const correoUsuarioVendedor = yield Correos_1.default.EnviarCorreo('Alguien esta interesado en tu auto', V_DS_CORREO, [enums_2.default.EMAIL_CONFIRMACION_COMPRA_VENDEDOR, POUT_ID_CITA, "", "", ""], []);
        const smsUsuarioVendedor = yield sms_1.default.EnviarSMS(V_NO_TELEFONO_MOVIL, smsEnums_1.SmsCitaComercial.SMS_VT_01.replace('[NB_VEHICULO]', V_NB_VEHICULO), enums_1.SEND_NOTIFICATIONS);
        const correoUsuarioComprador = yield Correos_1.default.EnviarCorreo('Esperando confirmación', DS_EMAIL, [ParametroEmailCarinspector, POUT_ID_CITA, urlactivar, "", ""], []);
        const smsUsuarioComprador = yield sms_1.default.EnviarSMS(NO_TELEFONO, smsEnums_1.SmsCitaComercial.SMS_ESPERA_CONFIRMACION.replace('[NB_VEHICULO]', V_NB_VEHICULO), enums_1.SEND_NOTIFICATIONS);
        return res.status(200).json({
            success: true,
            message: POUT_CL_RESPUESTA
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.VendedorConfirmaCitaCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_CITA = req.params.ID_CITA;
        const query = "CALL CA_CONFIRMACION_DE_CITA(?,?)";
        let replacements = [ID_CITA, 'VENDEDOR_CONFIRMA'];
        let respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.redirect(config_1.URL_FRONTEND + 'cita-procesada');
        }
        let data = ['EMAIL_CONFIRMACION_VENDEDOR', ID_CITA, '', config_1.URL_FRONTEND, ''];
        let DS_CORREO = respuesta[0].POUT_DS_EMAIL_COMPRADOR;
        const cita = yield c_cita_car_sales_1.default.findOne({ where: { ID_CITA_CAR_SALES: ID_CITA } });
        const { ID_VEHICULO, ID_COMPRADOR, ID_VENDEDOR } = cita;
        const datosComprador = yield consultas_1.default.ObtenerDatosUsuario(ID_COMPRADOR);
        const datosVendedor = yield consultas_1.default.ObtenerDatosUsuario(ID_VENDEDOR);
        const NB_VEHICULO = yield consultas_1.default.ObtenerNombreVehiculo(ID_VEHICULO);
        const TOKEN = yield Genericos_1.default.generarJWTGenerico(ID_CITA, '48hr');
        let smsMessage = smsEnums_1.SmsCitaComercial.SMS_VT_02.replace('[NB_VEHICULO]', NB_VEHICULO);
        smsMessage = smsMessage.replace('[NB_COMPRADOR]', datosComprador.NB_USUARIO + ' ' + datosComprador.NB_APELLIDO_PATERNO + ' ' + datosComprador.NB_APELLIDO_MATERNO);
        smsMessage = smsMessage.replace('[NB_VENDEDOR]', datosVendedor.NB_USUARIO + ' ' + datosVendedor.NB_APELLIDO_PATERNO + ' ' + datosVendedor.NB_APELLIDO_MATERNO);
        yield Correos_1.default.EnviarCorreo('¡Cita confirmada!', DS_CORREO, [enums_2.default.EMAIL_CONFIRMACION_VENDEDOR, ID_CITA, "", config_1.URL_FRONTEND, ""], []);
        yield sms_1.default.EnviarSMS(datosComprador.NO_TELEFONO_MOVIL, smsMessage, enums_1.SEND_NOTIFICATIONS);
        res.status(200);
        return res.redirect(`${config_1.URL_FRONTEND}compra/cita-confirmada/${TOKEN}`);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.ObtenerDatosCitaCarSalesPorToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CITA = yield Genericos_1.default.comprobarJWTGenerico(req.params.ID_CITA);
        if (!CITA) {
            return res.status(404).json({
                error: true,
                message: 'La cita no fue encontrada'
            });
        }
        const DatosCita = yield c_cita_car_sales_1.default.findOne({ where: { ID_CITA_CAR_SALES: CITA.id } });
        if (!DatosCita) {
            return res.status(403).json({
                error: true,
                message: 'La cita ya fue procesada'
            });
        }
        const { ID_VEHICULO } = DatosCita;
        const NB_VEHICULO = yield consultas_1.default.ObtenerNombreVehiculo(ID_VEHICULO);
        const NB_CAV = yield consultas_1.default.ObtenerNombreCav(DatosCita.ID_CAV);
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
            ID_VEHICULO: DatosCita.ID_VEHICULO
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.VendedorRechazaCitaCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_CITA = req.params.ID_CITA;
        const query = "CALL CA_CONFIRMACION_DE_CITA(?,?)";
        let replacements = [ID_CITA, 'VENDEDOR_RECHAZA'];
        let respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            console.log(respuesta[0].POUT_DS_RESPUESTA);
            res.status(200);
            return res.redirect(config_1.URL_FRONTEND);
        }
        let DS_CORREO = respuesta[0].POUT_DS_EMAIL_COMPRADOR;
        let data = ['EMAIL_RECHAZA_VENDEDOR', ID_CITA, '', config_1.URL_FRONTEND, ''];
        let ID_CAV = respuesta[0].POUT_ID_CAV;
        const TOKEN = yield Genericos_1.default.generarJWTGenerico(ID_CITA, '48hr');
        const cita = yield c_cita_car_sales_1.default.findOne({ where: { ID_CITA_CAR_SALES: ID_CITA } });
        const { ID_VEHICULO, ID_COMPRADOR, ID_VENDEDOR } = cita;
        const datosComprador = yield consultas_1.default.ObtenerDatosUsuario(ID_COMPRADOR);
        const datosVendedor = yield consultas_1.default.ObtenerDatosUsuario(ID_VENDEDOR);
        const NB_VEHICULO = yield consultas_1.default.ObtenerNombreVehiculo(ID_VEHICULO);
        let smsMessage = smsEnums_1.SmsCitaComercial.SMS_VT_03.replace('[NB_VEHICULO]', NB_VEHICULO);
        smsMessage = smsMessage.replace('[NB_COMPRADOR]', datosComprador.NB_USUARIO + ' ' + datosComprador.NB_APELLIDO_PATERNO + ' ' + datosComprador.NB_APELLIDO_MATERNO);
        smsMessage = smsMessage.replace('[NB_VENDEDOR]', datosVendedor.NB_USUARIO + ' ' + datosVendedor.NB_APELLIDO_PATERNO + ' ' + datosVendedor.NB_APELLIDO_MATERNO);
        yield sms_1.default.EnviarSMS(datosComprador.NO_TELEFONO_MOVIL, smsMessage, enums_1.SEND_NOTIFICATIONS);
        yield Correos_1.default.EnviarCorreo('Cita rechazada', DS_CORREO, [enums_2.default.EMAIL_RECHAZA_VENDEDOR, ID_CITA, "", config_1.URL_FRONTEND, ""], []);
        return res.redirect(`${config_1.URL_FRONTEND}compra/reagenda/${TOKEN}`);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.ProponerTresFechas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let fecha1 = body.HORARIO[0].FECHA_COMPLETA;
        let hora1 = body.HORARIO[0].HORA_AGENDAR;
        let fecha2 = body.HORARIO.length == 2 ? body.HORARIO[1].FECHA_COMPLETA : "";
        let hora2 = body.HORARIO.length == 2 ? body.HORARIO[1].HORA_AGENDAR : "";
        let fecha3 = body.HORARIO.length == 3 ? body.HORARIO[2].FECHA_COMPLETA : "";
        let hora3 = body.HORARIO.length == 3 ? body.HORARIO[2].HORA_AGENDAR : "";
        fecha1 = fecha1 != "" ? fecha1.split('/').reverse().join('-') : fecha1;
        fecha2 = fecha2 != "" ? fecha2.split('/').reverse().join('-') : fecha2;
        fecha3 = fecha3 != "" ? fecha3.split('/').reverse().join('-') : fecha3;
        let replacements = [body.ID_CITA, body.ID_CAV, fecha1, hora1, fecha2, hora2, fecha3, hora3];
        const query = "CALL CA_INSERTA_PROPUESTA_HORARIOS(?,?,?,?,?,?,?,?)";
        let respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA == -1001) {
            return res.status(401).json({
                success: false,
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        const cita = yield c_cita_car_sales_1.default.findOne({ where: { ID_CITA_CAR_SALES: body.ID_CITA } });
        const { ID_VEHICULO, ID_COMPRADOR, ID_VENDEDOR } = cita;
        const datosComprador = yield consultas_1.default.ObtenerDatosUsuario(ID_COMPRADOR);
        const datosVendedor = yield consultas_1.default.ObtenerDatosUsuario(ID_VENDEDOR);
        const NB_VEHICULO = yield consultas_1.default.ObtenerNombreVehiculo(ID_VEHICULO);
        let smsMessageVendedor = smsEnums_1.SmsCitaComercial.SMS_VT_06.replace('[NB_VEHICULO]', NB_VEHICULO);
        smsMessageVendedor = smsMessageVendedor.replace('[NB_COMPRADOR]', datosComprador.NB_USUARIO + ' ' + datosComprador.NB_APELLIDO_PATERNO + ' ' + datosComprador.NB_APELLIDO_MATERNO);
        smsMessageVendedor = smsMessageVendedor.replace('[NB_VENDEDOR]', datosVendedor.NB_USUARIO + ' ' + datosVendedor.NB_APELLIDO_PATERNO + ' ' + datosVendedor.NB_APELLIDO_MATERNO);
        let smsMessageComprador = smsEnums_1.SmsCitaComercial.SMS_VT_07.replace('[NB_VEHICULO]', NB_VEHICULO);
        smsMessageComprador.replace('[NB_COMPRADOR]', datosComprador.NB_USUARIO + ' ' + datosComprador.NB_APELLIDO_PATERNO + ' ' + datosComprador.NB_APELLIDO_MATERNO);
        //MANDAR MESSAGE A VENDEDOR
        yield sms_1.default.EnviarSMS(datosVendedor.NO_TELEFONO_MOVIL, smsMessageVendedor, enums_1.SEND_NOTIFICATIONS);
        //MANDAR MESSAGE A COMPRADOR
        yield sms_1.default.EnviarSMS(datosComprador.NO_TELEFONO_MOVIL, smsMessageComprador, enums_1.SEND_NOTIFICATIONS);
        //MANDAR CORREO A COMPRADOR
        const enviado = yield Correos_1.default.EnviarCorreo('Propuesta de cita', respuesta[0].POUT_DS_EMAIL, [enums_2.default.EMAIL_CITA_HORARIOS_PROPUESTOS, body.ID_CITA, respuesta[0].POUT_ID_AGRUPADOR, config_1.URL_BACKEND, ""], []);
        return res.status(200).json({
            message: 'Propuesta enviada correctamente.',
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.ConfirmarPropuestaCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TOKEN = yield Genericos_1.default.generarJWTGenerico(req.params.ID_CITA, '2hr');
        const query = "CALL CA_CONFIRMA_HORA_PROPUESTA(?,?)";
        let replacements = [req.params.ID_CITA, req.params.ID_AGRUPADOR];
        let respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.redirect(config_1.URL_FRONTEND);
        }
        yield Correos_1.default.EnviarCorreo('¡Cita confirmada!', respuesta[0].POUT_DS_EMAIL, [enums_2.default.EMAIL_CONFIRMACION_VENDEDOR, req.params.ID_CITA, "", "", ""], []);
        res.status(200);
        return res.redirect(`${config_1.URL_FRONTEND}compra/cita-confirmada/${TOKEN}`);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.RechazarPropuestas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_CONFIRMA_HORA_PROPUESTA(?,?)";
        let replacements = ['-1', req.params.ID_AGRUPADOR];
        let respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.redirect(config_1.URL_FRONTEND);
        }
        yield Correos_1.default.EnviarCorreo('Propuestas rechazadas', respuesta[0].POUT_DS_EMAIL, [enums_2.default.EMAIL_RECHAZA_COMPRADOR_PROPUESTA, 0, "", "", ""], []);
        res.status(200);
        return res.redirect(`${config_1.URL_FRONTEND}compra/cita-rechazada`);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.NoSigueEnVentaAutoVendedorCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query0 = "CALL CA_CONFIRMACION_DE_CITA(?,?)";
        const query1 = "CALL CA_OBTIENE_CITA_CAR_SALES_X_ID(?)";
        const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
        let replacements = [req.params.ID_CITA, 'VENDEDOR_CANCELA'];
        let respuesta = yield config_1.db.query(query0, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            res.status(500);
            return res.redirect(config_1.URL_FRONTEND);
        }
        //CONSULTAR IDS DE VENDEDOR Y COMPRADOR ASI COMO ID VEHICULO
        let DATOS_CITA = yield config_1.db.query(query1, { replacements: [req.params.ID_CITA] });
        let ID_USUARIO_COMPRADOR = DATOS_CITA[0].ID_COMPRADOR;
        let USUARIO_COMPRADOR = yield config_1.db.query(query, { replacements: [ID_USUARIO_COMPRADOR] });
        let USUARIO_VENDEDOR = yield config_1.db.query(query, { replacements: [DATOS_CITA[0].ID_VENDEDOR] });
        let DS_EMAIL_COMPRADOR = USUARIO_COMPRADOR[0].DS_EMAIL;
        let NB_USUARIO_COMPRADOR = USUARIO_COMPRADOR[0].NB_USUARIO;
        let NO_TELEFONO_MOVIL_COMPRADOR = USUARIO_COMPRADOR[0].NO_TELEFONO_MOVIL;
        let DS_EMAIL_VENDEDOR = USUARIO_VENDEDOR[0].DS_EMAIL;
        let NB_USUARIO_VENDEDOR = USUARIO_VENDEDOR[0].NB_USUARIO;
        const TOKEN = yield Genericos_1.default.generarJWTGenerico(req.params.ID_CITA, '48hr');
        const cita = yield c_cita_car_sales_1.default.findOne({ where: { ID_CITA_CAR_SALES: req.params.ID_CITA } });
        const { ID_VEHICULO } = cita;
        const NB_VEHICULO = yield consultas_1.default.ObtenerNombreVehiculo(ID_VEHICULO);
        let smsMessage = smsEnums_1.SmsCitaComercial.SMS_VT_04.replace('[NB_VEHICULO]', NB_VEHICULO);
        smsMessage = smsMessage.replace('[NB_COMPRADOR]', NB_USUARIO_COMPRADOR);
        smsMessage = smsMessage.replace('[NB_VENDEDOR]', NB_USUARIO_VENDEDOR);
        /**NOTIFICACIONES A COMPRADOR */
        yield sms_1.default.EnviarSMS(NO_TELEFONO_MOVIL_COMPRADOR, smsMessage, enums_1.SEND_NOTIFICATIONS);
        yield Correos_1.default.EnviarCorreo('Auto no disponible', DS_EMAIL_COMPRADOR, [enums_2.default.EMAIL_AUTO_NO_DISPONIBLE_COMPRADOR, 0, NB_USUARIO_COMPRADOR, config_1.URL_FRONTEND, ""], []);
        res.status(200);
        return res.redirect(`${config_1.URL_FRONTEND}compra/autonodisponible/` + TOKEN);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.EnviarCorreoVerAuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isNaN(req.body.id_vehiculo)) {
            res.status(500).json({
                message: "Ocurrio un error"
            });
            return;
        }
        const query = "CALL CA_INSERTA_POSIBLE_COMPRA_ABIERTO(?,?,?,?,?,?)";
        let replacements = [req.body.id_vehiculo, req.body.CB_NOMBRE, req.body.CL_EMAIL, req.body.NO_TELEFONO, req.body.DIA_SEMANA, req.body.HORA_SEMANA];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, ID_SOLICITUD } = respuesta[0];
        const dataCaralianz = [enums_2.default.EMAIL_POSIBLE_COMPRA_ABIERTO_CARALIANZ, ID_SOLICITUD, "", "", ""];
        const dataUsuario = [enums_2.default.EMAIL_POSIBLE_COMPRA_ABIERTO_USUARIO, ID_SOLICITUD, "", "", ""];
        const correoCaralianzEnviado = yield Correos_1.default.EnviarCorreo("Solicitud para ver auto.", config_1.admin, dataCaralianz, config_1.bbc);
        const correoUsuarioEnviado = yield Correos_1.default.EnviarCorreo("Solicitud para ver auto.", req.body.CL_EMAIL, dataUsuario, config_1.bbc);
        return res.status(200).json({
            success: true,
            message: "Solicitud enviada correctamente."
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.RegistraVistaQr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_vehiculo_completo = req.params.ID_COMPLETO;
        const Query = "CALL CA_REGISTRA_ESTADISTICA_PORTAL(?,?)";
        let replacements = [req.params.ID_VEHICULO, 'QR'];
        let respuesta = yield config_1.db.query(Query, { replacements });
        console.log("****************************VINE*******************************");
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            res.status(500);
            return res.redirect(config_1.URL_FRONTEND);
        }
        console.log("****************************VINE*******************************");
        console.log(`${config_1.URL_FRONTEND}compra/auto/` + id_vehiculo_completo);
        console.log("****************************VINE*******************************");
        res.status(200);
        return res.redirect(`${config_1.URL_FRONTEND}compra/auto/` + id_vehiculo_completo);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.VendiAuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_CITA = req.body.id_cita;
        const query1 = "CALL CA_OBTIENE_CITA_CAR_SALES_X_ID(?)";
        let DATOS_CITA = yield config_1.db.query(query1, { replacements: [ID_CITA] });
        const { ID_VENDEDOR, ID_VEHICULO, ID_COMPRADOR, CL_ESTADO } = DATOS_CITA[0];
        if (CL_ESTADO != "CANCELADA") {
            return res.status(403).json({
                error: true,
                message: "Este auto no se puede dar de baja porque tiene una cita activa."
            });
        }
        //DAR DE BAJA VEHICULO
        let query2 = 'CALL CA_ACTUALIZA_PORTAL(?,?,?,?)';
        yield config_1.db.query(query2, { replacements: [ID_VEHICULO, 'BAJA', 1, ID_VENDEDOR] });
        const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
        let USUARIO_VENDEDOR = yield config_1.db.query(query, { replacements: [ID_VENDEDOR] });
        let DS_EMAIL_VENDEDOR = USUARIO_VENDEDOR[0].DS_EMAIL;
        let NB_USUARIO_VENDEDOR = USUARIO_VENDEDOR[0].NB_USUARIO;
        const NB_VEHICULO = yield consultas_1.default.ObtenerNombreVehiculo(ID_VEHICULO);
        //ENVIAR NOTIFICACION AL VENDEDOR
        let smsMessage = smsEnums_1.SmsCitaComercial.SMS_VT_05.replace('[NB_VEHICULO]', NB_VEHICULO);
        smsMessage = smsMessage.replace('[NB_VENDEDOR]', NB_USUARIO_VENDEDOR);
        yield sms_1.default.EnviarSMS(USUARIO_VENDEDOR[0].NO_TELEFONO_MOVIL, smsMessage, enums_1.SEND_NOTIFICATIONS);
        yield Correos_1.default.EnviarCorreo('Auto no disponible', DS_EMAIL_VENDEDOR, [enums_2.default.EMAIL_VENDI_AUTO_VENDEDOR, 0, NB_USUARIO_VENDEDOR, config_1.URL_FRONTEND, ""], []);
        return res.status(200).json({
            error: false,
            message: "El auto fue dado de baja correctamente."
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CompraVentaController.MeQuedeAuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_CITA = req.body.id_cita;
        const query1 = "CALL SP_OBTIENE_CITA_CAR_SALES_X_ID(?)";
        let DATOS_CITA = yield config_1.db.query(query1, { replacements: [ID_CITA] });
        const { ID_VENDEDOR, ID_VEHICULO, CL_ESTADO } = DATOS_CITA[0];
        if (CL_ESTADO != "CANCELADA") {
            return res.status(403).json({
                error: true,
                message: "Este auto no se puede dar de baja porque tiene una cita activa."
            });
        }
        //DAR DE BAJA VEHICULO
        let query2 = 'CALL CA_ACTUALIZA_PORTAL(?,?,?,?)';
        yield config_1.db.query(query2, { replacements: [ID_VEHICULO, 'BAJA', 0, ID_VENDEDOR] });
        const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
        let USUARIO_VENDEDOR = yield config_1.db.query(query, { replacements: [ID_VENDEDOR] });
        let DS_EMAIL_VENDEDOR = USUARIO_VENDEDOR[0].DS_EMAIL;
        let NB_USUARIO_VENDEDOR = USUARIO_VENDEDOR[0].NB_USUARIO;
        //ENVIAR NOTIFICACION AL VENDEDOR
        let smsMessage = smsEnums_1.SmsCitaComercial.SMS_VT_05A.replace('[NB_VENDEDOR]', NB_USUARIO_VENDEDOR);
        yield sms_1.default.EnviarSMS(USUARIO_VENDEDOR[0].NO_TELEFONO_MOVIL, smsMessage, enums_1.SEND_NOTIFICATIONS);
        yield Correos_1.default.EnviarCorreo('Auto no disponible', DS_EMAIL_VENDEDOR, [enums_2.default.EMAIL_ME_QUEDE_CON_AUTO_VENDEDOR, 0, NB_USUARIO_VENDEDOR, config_1.URL_FRONTEND, ""], []);
        return res.status(200).json({
            error: false,
            message: "El auto fue dado de baja correctamente."
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = CompraVentaController;
//# sourceMappingURL=CompraVenta.controller.js.map