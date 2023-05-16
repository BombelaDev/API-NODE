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
class CatalogosController {
}
_a = CatalogosController;
CatalogosController.GetCavs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  let replacements = FG_TIPO_CAV == 0 ? [busqueda] : [ID_VEHICULO] ; // 0 CAV SERVICIOS  1 CAV COMERCIALES
        let query = "CALL CA_OBTIENE_CAV_PORTAL()";
        const respuesta = yield config_1.db.query(query);
        console.log(respuesta);
        return res.status(200).json(respuesta);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.getDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_CAV } = req.params;
        let replacements = [ID_CAV];
        let QueryFechasLaborables = "CALL CA_OBTIENE_FECHAS_PORTAL(?)";
        //   const QueryDiasInactivos = "CALL CA_OBTIENE_DIAS_NO_LABORABLES_PORTAL(?,?)";
        const FechasLaborables = yield config_1.db.query(QueryFechasLaborables, { replacements });
        // const FechasNoLaborables:any = await  db.query(QueryDiasInactivos,{replacements:[FG_TIPO_CAV,ID_CAV]});
        return res.status(200).json(FechasLaborables);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.BuscarDireccionPorCp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        let CP = req.params.NO_CP;
        const query = "CALL CA_OBTIENE_COLONIAS_por_CP(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [CP] });
        return res.status(200).json({
            ID_ESTADO_GEOGRAFICO: ((_b = Respuesta[0]) === null || _b === void 0 ? void 0 : _b.ID_ESTADO_GEOGRAFICO) || -1,
            ID_MUNICIPIO_GEOGRAFICO: ((_c = Respuesta[0]) === null || _c === void 0 ? void 0 : _c.ID_MUNICIPIO_GEOGRAFICO) || -1,
            Colonias: Respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.obtenerEstadosGeograficos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_OBTIENE_ESTADOS_GEOGRAFICOS()";
        let respuesta = yield config_1.db.query(query);
        return res.status(200).json({
            Estados: respuesta,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerMunicipios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ID_ESTADO = req.params.ID_ESTADO;
    const query = "CALL CA_OBTIENE_MUNICIPIOS_GEOGRAFICO(?)";
    let respuesta = yield config_1.db.query(query, { replacements: [ID_ESTADO] });
    return res.status(200).json({
        Municipios: respuesta,
    });
});
CatalogosController.ObtenerHorasPorDia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_FECHA, ID_CAV } = req.body;
        let replacements = [ID_CAV, DS_FECHA];
        let query = "CALL CA_OBTIENE_HORAS_DISPONIBLES(?,?)";
        const Horas = yield config_1.db.query(query, { replacements });
        return res.status(200).json({
            success: true,
            Horas,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerCavs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PROCESO = req.params.PROCESO;
        //  let replacements = FG_TIPO_CAV == 0 ? [busqueda] : [ID_VEHICULO] ; // 0 CAV SERVICIOS  1 CAV COMERCIALES
        let query = "CALL CA_OBTIENE_CAVS_PORTAL_REL (?)";
        const respuesta = yield config_1.db.query(query, { replacements: [0] });
        return res.status(200).json({
            success: true,
            Cavs: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtieneMunicipios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdEstado = req.params.IdEstado;
        const Query = "CALL CA_OBTIENE_MUNICIPIOS_GEOGRAFICO(?)";
        let respuesta = yield config_1.db.query(Query, { replacements: [IdEstado] });
        res.json(respuesta);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerMensualidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_VEHICULO, PR_ENGANCHE } = req.params;
        let query = "CALL CA_OBTIENE_MENSUALIDADES(?,?)";
        const respuesta = yield config_1.db.query(query, { replacements: [ID_VEHICULO, PR_ENGANCHE] });
        return res.status(200).json(...respuesta);
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerDatosFormularioContratos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdCita = req.params.IdCita;
        const QIdentificaciones = "CALL CA_OBTIENE_TIPO_IDENTIFICACION()";
        const QAutoridades = "CALL CA_OBTIENE_AUTORIDAD()";
        const QEstados = "CALL CA_OBTIENE_ESTADOS_GEOGRAFICOS()";
        const QBancos = "CALL CA_OBTIENE_BANCOS()";
        const QInstrumentos = "CALL CA_OBTIENE_INSTRUMENTO_CONTRATO()";
        /*       const QDatosBeneficiario = "CALL CA_OBTIENE_DATOS_BENEFICIARIO_CITA_SALES(?)";
              const QDatosVendedor = "CALL CA_OBTIENE_DATOS_VENDEDOR_CITA_SALES(?)";
              const QDatosComprador = "CALL CA_OBTIENE_DATOS_COMPRADOR_CITA_SALES(?)"; */
        /*      let DatosVendedor:any = await  db.query(QDatosVendedor,{replacements:[IdCita]});
             let DatosComprador:any = await  db.query(QDatosComprador,{replacements:[IdCita]});
             let Paises:any = await  db.query(QPaises); */
        let Identificaciones = yield config_1.db.query(QIdentificaciones);
        let Autoridades = yield config_1.db.query(QAutoridades);
        //  let MotivosCancelacion:any = await  db.query(QCancelacionMotivos);
        let Estados = yield config_1.db.query(QEstados);
        let Bancos = yield config_1.db.query(QBancos);
        let Instrumentos = yield config_1.db.query(QInstrumentos);
        /*       let Actividades:any = await  db.query(QActividades);
              let Beneficiarios:any = await  db.query(QDatosBeneficiario,{replacements:[IdCita]}); */
        res.status(200).json({
            //  Paises,
            Identificaciones,
            Autoridades,
            //MotivosCancelacion,
            Estados,
            Bancos,
            Instrumentos
            /*    Actividades,
               DatosVendedor,
               Beneficiarios,
               DatosComprador */
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerMarcasAuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_OBTIENE_MARCAS()";
        const respuesta = yield config_1.db.query(query, {});
        return res.status(200).json({
            success: true,
            Marcas: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerColores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL CA_OBTIENE_COLOR()";
        const respuesta = yield config_1.db.query(query);
        return res.status(200).json({
            success: true,
            Colores: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerModelos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ID_MARCA = req.params.ID_MARCA;
        const query = "CALL CA_OBTIENE_MODELOS(?)";
        const respuesta = yield config_1.db.query(query, { replacements: [ID_MARCA] });
        return res.status(200).json({
            success: true,
            Modelos: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerAnios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ID_MODELO = req.params.ID_MODELO;
        const query = "CALL CA_OBTIENE_ANIOS(?)";
        const respuesta = yield config_1.db.query(query, { replacements: [ID_MODELO] });
        return res.status(200).json({
            success: true,
            Anios: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
CatalogosController.ObtenerAniosCompleto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ID_MODELO = req.params.ID_MODELO;
        const query = "CALL CA_OBTIENE_ANIOS_COMPLETO(?)";
        const respuesta = yield config_1.db.query(query, { replacements: [ID_MODELO] });
        return res.status(200).json({
            success: true,
            Anios: respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = CatalogosController;
//# sourceMappingURL=catalogos.controller.js.map