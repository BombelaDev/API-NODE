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
class SolicitudUsuarioController {
}
_a = SolicitudUsuarioController;
//66
SolicitudUsuarioController.guardarSolicitudSeguro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        console.log("***************************************************************");
        const query = "CALL CA_INSERTA_POSIBLE_SEGURO_COBRO_SEGURO(?,?,?,?,?,?)";
        let replacements = [req.body.ID_MARCA, req.body.ID_MODELO, req.body.ID_ANIO, req.body.CB_NOMBRE, req.body.CL_EMAIL, req.body.NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } = respuesta[0];
        const dataCaralianz = [enums_1.default.EMAIL_COBRO_SEGURO_CARALIANZ, IDD_SOLICITUD, "", "", ""];
        const dataUsuario = [enums_1.default.EMAIL_COBRO_SEGURO_USUARIO, IDD_SOLICITUD, "", "", ""];
        const correoCaralianzEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de cobro seguro", config_1.admin, dataCaralianz, config_1.bbc);
        const correoUsuarioEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de cobro seguro", req.body.CL_EMAIL, dataUsuario, config_1.bbc);
        return res.status(200).json({
            message: 'ok',
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
SolicitudUsuarioController.guardarSolicitudFacturacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_INSERTA_POSIBLE_FACTURACION_SEGURO(?,?,?,?,?,?)";
        let replacements = [req.body.ID_MARCA, req.body.ID_MODELO, req.body.ID_ANIO, req.body.CB_NOMBRE, req.body.CL_EMAIL, req.body.NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } = respuesta[0];
        const dataCaralianz = [enums_1.default.EMAIL_FACTURACION_CARALIANZ, IDD_SOLICITUD, "", "", ""];
        const dataUsuario = [enums_1.default.EMAIL_FACTURACION_USUARIO, IDD_SOLICITUD, "", "", ""];
        //   const correoCaralianzEnviado = await Correo.EnviarCorreo("Solicitud de Facturación", admin, dataCaralianz, bbc);
        const correoCaralianzEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de Facturación", config_1.admin, dataCaralianz, config_1.bbc);
        const correoUsuarioEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de Facturación", req.body.CL_EMAIL, dataUsuario, config_1.bbc);
        return res.status(200).json({
            message: 'ok',
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
SolicitudUsuarioController.guardarSolicitudRevisionLegal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_INSERTA_POSIBLE_REVISION_LEGAL(?,?,?,?,?,?)";
        let replacements = [req.body.ID_MARCA, req.body.ID_MODELO, req.body.ID_ANIO, req.body.CB_NOMBRE, req.body.CL_EMAIL, req.body.NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } = respuesta[0];
        const dataUsuario = [enums_1.default.EMAIL_REVISION_LEGAL_USUARIO, IDD_SOLICITUD, "", "", ""];
        const dataCaralianz = [enums_1.default.EMAIL_REVISION_LEGAL_CARALIANZ, IDD_SOLICITUD, "", "", ""];
        const correoCaralianzEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de Revisión Legal", config_1.admin, dataCaralianz, config_1.bbc);
        const correoUsuarioEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de Revisión Legal", req.body.CL_EMAIL, dataUsuario, config_1.bbc);
        return res.status(200).json({
            message: 'ok',
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = SolicitudUsuarioController;
//# sourceMappingURL=SolicitudUsuarioController.js.map