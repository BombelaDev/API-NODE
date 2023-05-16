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
const enums_1 = __importDefault(require("../../enums/enums"));
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
class SolicitudAutoController {
}
_a = SolicitudAutoController;
SolicitudAutoController.guardarAutoSolicitado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL  CA_INSERTA_AUTO_SOLICITADO(?,?,?,?,?,?)";
        let replacements = [req.body.ID_MARCA, req.body.ID_MODELO, req.body.ID_ANIO, req.body.CB_NOMBRE, req.body.CL_EMAIL, req.body.NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } = respuesta[0];
        const dataCaralianz = [enums_1.default.EMAIL_NECESIDAD_VEHICULO_CARALIANZ, IDD_SOLICITUD, "", "", ""];
        const dataUsuario = [enums_1.default.EMAIL_NECESIDAD_VEHICULO_USUARIO, IDD_SOLICITUD, "", "", ""];
        const correoCaralianzEnviado = yield Correos_1.default.EnviarCorreo("Solicitud para buscar un vehiculo", config_1.admin, dataCaralianz, config_1.bbc);
        const correoUsuarioEnviado = yield Correos_1.default.EnviarCorreo("Solicitud para buscar un vehiculo", req.body.CL_EMAIL, dataUsuario, config_1.bbc);
        return res.status(200).json({
            message: 'ok',
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
SolicitudAutoController.guardarAutoEncontrado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL  CA_INSERTA_AUTO_ENCONTRADO(?,?,?,?,?,?)";
        let replacements = [req.body.ID_MARCA, req.body.ID_MODELO, req.body.ID_ANIO, req.body.NB_NOMBRE, req.body.DS_EMAIL, req.body.NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } = respuesta[0];
        const { marca, modelo, anio, nombre, correo, telefono } = respuesta[0];
        const dataCaralianz = [enums_1.default.EMAIL_VEHICULO_ENCONTRADO_CARALIANZ, IDD_SOLICITUD, "", "", ""];
        const dataUsuario = [enums_1.default.EMAIL_VEHICULO_ENCONTRADO_USUARIO, IDD_SOLICITUD, "", "", ""];
        const correoCaralianzEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de vehículo encontrado", config_1.admin, dataCaralianz, config_1.bbc);
        const correoUsuarioEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de vehículo encontrado", req.body.DS_EMAIL, dataUsuario, config_1.bbc);
        return res.status(200).json({
            message: 'ok',
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
SolicitudAutoController.obtenerAutosSolicitados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL  CA_OBTIENE_NECESIDAD_VEHICULO()";
        let respuesta = yield config_1.db.query(query, {});
        return res.status(200).json({
            message: 'ok',
            autos: respuesta,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = SolicitudAutoController;
//# sourceMappingURL=SolicitudAutoController.js.map