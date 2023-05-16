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
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
class CuponController {
}
_a = CuponController;
CuponController.verficarCupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_VERIFICA_CUPON(?,?,?)";
        let replacements = [req.body.PIN_CL_CUPON, req.body.PIN_ID_USUARIO, req.body.PIN_CL_PROCESO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } = respuesta[0];
        console.log(respuesta[0]);
        return res.status(200).json(respuesta[0]);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CuponController.aplicarCupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_APLICA_CUPON(?,?)";
        let replacements = [req.body.PIN_ID_REGISTRO_CUPON, req.body.PIN_CL_REFERENCIA];
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json(respuesta[0]);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = CuponController;
//# sourceMappingURL=cupon.controller.js.map