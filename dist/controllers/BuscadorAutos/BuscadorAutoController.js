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
class BuscadorAutoController {
}
_a = BuscadorAutoController;
BuscadorAutoController.ObtenerDetalleVehiculoEnVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id_vehiculo = req.params.id_vehiculo;
        const query = "CALL CA_OBTIENE_DATOS_EN_VENTA(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [id_vehiculo] });
        const JS_FOTOS = JSON.parse(Respuesta[0].JS_FOTOS).filter(img => img.URL != null);
        return res.status(200).json({
            Auto: Respuesta[0],
            JS_FOTOS
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ObtenerDetalleVehiculoPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g;
    try {
        let id_vehiculo = req.params.id_vehiculo;
        const query = "CALL CA_OBTIENE_DATOS_PRE_VENTA(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [id_vehiculo] });
        const JS_FOTOS = JSON.parse(Respuesta[0].JS_FOTOS).filter(img => img.URL != null);
        const JS_ASIENTOS = (_b = JSON.parse(Respuesta[0].JS_ASIENTOS)) !== null && _b !== void 0 ? _b : [];
        const JS_CAJUELA = (_c = JSON.parse(Respuesta[0].JS_CAJUELA)) !== null && _c !== void 0 ? _c : [];
        const JS_CLIMA = (_d = JSON.parse(Respuesta[0].JS_CLIMA)) !== null && _d !== void 0 ? _d : [];
        const JS_CONECTIVIDAD = (_e = JSON.parse(Respuesta[0].JS_CONECTIVIDAD)) !== null && _e !== void 0 ? _e : [];
        const JS_CRISTALES = (_f = JSON.parse(Respuesta[0].JS_CRISTALES)) !== null && _f !== void 0 ? _f : [];
        const JS_PORTAVASOS = (_g = JSON.parse(Respuesta[0].JS_PORTAVASOS)) !== null && _g !== void 0 ? _g : [];
        return res.status(200).json({
            Auto: Respuesta[0],
            JS_FOTOS,
            JS_ASIENTOS,
            JS_CAJUELA,
            JS_CLIMA,
            JS_CONECTIVIDAD,
            JS_CRISTALES,
            JS_PORTAVASOS,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ObtenerAutosPerfilUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id_usuario = req.params.id_usuario;
        const query = "CALL CA_OBTIENE_VEHICULOS_USUARIO_PERFIL(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [id_usuario] });
        console.log(Respuesta);
        return res.status(200).json({
            Autos: Respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ObtenerInformacionAutoPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_VEHICULO = req.params.ID_VEHICULO;
        const query = "CALL CA_OBTIENE_PREVIO_VEHICULO_PORTAL(?,?,?)";
        let replacements = [ID_VEHICULO, "0", 0];
        let respuesta = yield config_1.db.query(query, { replacements });
        const Auto = respuesta[0];
        return res.status(200).json({
            ok: true,
            Auto
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ObtenerAutosBuscador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_OBTIENE_VEHICULOS_BUSCADOR(?,?)";
        let replacements = [req.params.TIPO_BUSQUEDA, req.params.BUSQUEDA];
        let respuesta = yield config_1.db.query(query, { replacements });
        const AllMarcas = respuesta.map((auto) => auto.NB_MARCA);
        const Marcas = AllMarcas.filter((ele, pos) => AllMarcas.indexOf(ele) == pos);
        const AllModelos = respuesta.map((auto) => auto.NB_MODELO);
        const Modelos = AllModelos.filter((ele, pos) => AllModelos.indexOf(ele) == pos);
        const AllAnios = respuesta.map((auto) => auto.NO_ANIO);
        let AniosNumericos = AllAnios.filter((ele, pos) => AllAnios.indexOf(ele) == pos);
        let Anios = [];
        AniosNumericos.forEach(element => {
            Anios.push(element.toString());
        });
        const AllPrecios = respuesta.map((auto) => auto.MN_PRECIO_PUBLICADO);
        const MayorPrecio = Math.max.apply(null, AllPrecios);
        const MenorPrecio = Math.min.apply(null, AllPrecios);
        const AllKm = respuesta.map((auto) => auto.NO_KM);
        const MayorKm = Math.max.apply(null, AllKm);
        const MenorKm = Math.min.apply(null, AllKm);
        const AllColores = respuesta.map((auto) => auto.CL_COLOR);
        const Colores = AllColores.filter((ele, pos) => AllColores.indexOf(ele) == pos);
        Anios = Anios.sort((a, b) => b - a);
        return res.status(200).json({
            success: true,
            Autos: respuesta,
            Marcas,
            Modelos,
            Colores,
            Anios,
            MayorPrecio,
            MenorPrecio,
            MayorKm,
            MenorKm
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ObtenerAutosFavoritosUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_USUARIO = req.params.ID_USUARIO;
        console.log(ID_USUARIO);
        const query = "CALL CA_OBTIENE_VEHICULOS_USUARIO_GARAGE(?)";
        let replacements = [ID_USUARIO];
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
            AutosFavoritos: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ObtenerAutoPreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k, _l, _m, _o, _p, _q, _r;
    try {
        const ID_AUTO = req.params.ID_AUTO;
        if (!ID_AUTO) {
            return res.status(403).json({ success: false });
        }
        if (isNaN(ID_AUTO)) {
            return res.status(404).json({ success: false });
        }
        if (typeof ID_AUTO === 'number') {
            return res.status(403).json({ success: false });
        }
        const ID_USUARIO = req.params.ID_USUARIO;
        const ISQR = req.params.ISQR;
        const query = "CALL CA_OBTIENE_PREVIO_VEHICULO_PORTAL(?,?,?)";
        let replacements = [ID_AUTO, ID_USUARIO, ISQR];
        let respuesta = yield config_1.db.query(query, { replacements });
        /**AUTOS SIMILARES */
        const queryAutosSimilares = "CALL CA_OBTIENE_CARRUSEL_SIMILARES(?)";
        let AutosSimilares = yield config_1.db.query(queryAutosSimilares, { replacements: [ID_AUTO] });
        const Auto = respuesta[0];
        if (!Auto) {
            return res.status(500).json({
                message: "No se encontró ningún auto"
            });
        }
        const JS_FOTOS = JSON.parse(respuesta[0].JS_FOTOS).filter(img => img.URL != null);
        const JS_ASIENTOS = (_h = JSON.parse(respuesta[0].JS_ASIENTOS)) !== null && _h !== void 0 ? _h : [];
        const JS_CAJUELA = (_j = JSON.parse(respuesta[0].JS_CAJUELA)) !== null && _j !== void 0 ? _j : [];
        const JS_CLIMA = (_k = JSON.parse(respuesta[0].JS_CLIMA)) !== null && _k !== void 0 ? _k : [];
        const JS_CONECTIVIDAD = (_l = JSON.parse(respuesta[0].JS_CONECTIVIDAD)) !== null && _l !== void 0 ? _l : [];
        const JS_CRISTALES = (_m = JSON.parse(respuesta[0].JS_CRISTALES)) !== null && _m !== void 0 ? _m : [];
        const JS_ESTILOS = (_o = JSON.parse(respuesta[0].JS_ESTILOS)) !== null && _o !== void 0 ? _o : [];
        const JS_MECANICAS = (_p = JSON.parse(respuesta[0].JS_MECANICAS)) !== null && _p !== void 0 ? _p : [];
        const JS_PORTAVASOS = (_q = JSON.parse(respuesta[0].JS_PORTAVASOS)) !== null && _q !== void 0 ? _q : [];
        const JS_SEGURIDAD = (_r = JSON.parse(respuesta[0].JS_SEGURIDAD)) !== null && _r !== void 0 ? _r : [];
        return res.status(200).json({
            Auto,
            JS_FOTOS,
            JS_ASIENTOS,
            JS_CAJUELA,
            JS_CLIMA,
            JS_CONECTIVIDAD,
            JS_CRISTALES,
            JS_ESTILOS,
            JS_MECANICAS,
            JS_PORTAVASOS,
            JS_SEGURIDAD,
            AutosSimilares
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ObtenerAutosSimilares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_AUTO = req.params.ID_AUTO;
        const query = "CALL CA_OBTIENE_VEHICULOS_BUSCADOR_SIMILARES(?)";
        let replacements = [ID_AUTO];
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
            AutosSimilares: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ObtenerAutosNuevos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_OBTIENE_CARRUSEL_NUEVOS()";
        let replacements = [];
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
            AutosNuevos: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.PublicarVehiculoPortal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_VEHICULO = req.body.ID_VEHICULO;
        const query = "CALL CA_VENDER_VEHICULO(?)";
        let replacements = [ID_VEHICULO];
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
            message: respuesta[0].POUT_DS_RESPUESTA
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.ActualizarPrecioVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_ACTUALIZA_PRECIO_DESDE_PERFIL(?,?)";
        let replacements = [req.body.ID_VEHICULO, req.body.MN_PRECIO.replace(/,/g, "")];
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
            message: respuesta[0].POUT_DS_RESPUESTA
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
BuscadorAutoController.dejarDeVenderAuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_DEJAR_VENDER_VEHICULO(?)";
        let replacements = [req.body.ID_VEHICULO];
        let respuesta = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
            message: respuesta[0].POUT_DS_RESPUESTA
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = BuscadorAutoController;
//# sourceMappingURL=BuscadorAutoController.js.map