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
const c_cav_1 = __importDefault(require("../models/c_cav"));
const c_usuario_1 = __importDefault(require("../models/c_usuario"));
const k_vehiculo_portal_1 = __importDefault(require("../models/k_vehiculo_portal"));
class Consultas {
}
_a = Consultas;
Consultas.ObtenerNombreCav = (ID_CAV) => __awaiter(void 0, void 0, void 0, function* () {
    const cav = yield c_cav_1.default.findOne({ where: { ID_CAV, } });
    return cav.NB_CAV;
});
Consultas.ObtenerNombreVehiculo = (ID_VEHICULO) => __awaiter(void 0, void 0, void 0, function* () {
    const auto = yield k_vehiculo_portal_1.default.findOne({ where: { ID_VEHICULO, } });
    return auto.NB_MARCA + ' ' + auto.NB_MODELO + ' ' + auto.NO_ANIO;
});
Consultas.ObtenerDatosUsuario = (ID_USUARIO) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield c_usuario_1.default.findOne({ where: { ID_USUARIO: ID_USUARIO, } });
    return usuario;
});
exports.default = Consultas;
//# sourceMappingURL=consultas.js.map