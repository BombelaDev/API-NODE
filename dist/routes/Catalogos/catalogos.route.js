"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catalogos_controller_1 = __importDefault(require("../../controllers/Catalogos/catalogos.controller"));
const router = (0, express_1.Router)();
router.get('/GetCavs', catalogos_controller_1.default.GetCavs);
router.get('/getDates/:ID_CAV', catalogos_controller_1.default.getDates);
router.get('/ObtenerMarcasAuto', catalogos_controller_1.default.ObtenerMarcasAuto);
router.get('/ObtenerModelos/:ID_MARCA', catalogos_controller_1.default.ObtenerModelos);
router.get('/ObtenerAnios/:ID_MODELO', catalogos_controller_1.default.ObtenerAnios);
router.get('/ObtenerAniosCompleto/:ID_MODELO', catalogos_controller_1.default.ObtenerAniosCompleto);
router.get('/ObtenerColores', catalogos_controller_1.default.ObtenerColores);
router.post('/ObtenerHorasPorDia', catalogos_controller_1.default.ObtenerHorasPorDia);
router.get('/obtenerMunicipios/:ID_ESTADO', catalogos_controller_1.default.ObtenerMunicipios);
router.get('/obtenerEstadosGeograficos', catalogos_controller_1.default.obtenerEstadosGeograficos);
router.get('/BuscarDireccionPorCp/:NO_CP', catalogos_controller_1.default.BuscarDireccionPorCp);
router.get('/ObtenerMensualidades/:ID_VEHICULO/:PR_ENGANCHE', catalogos_controller_1.default.ObtenerMensualidades);
router.get('/ObtenerDatosFormularioContratos', catalogos_controller_1.default.ObtenerDatosFormularioContratos);
router.get('/ObtieneMunicipios/:IdEstado', catalogos_controller_1.default.ObtieneMunicipios);
exports.default = router;
//# sourceMappingURL=catalogos.route.js.map