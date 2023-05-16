"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../../middlewares/middleware"));
const BuscadorAutoController_1 = __importDefault(require("../../controllers/BuscadorAutos/BuscadorAutoController"));
const router = (0, express_1.Router)();
router.get('/ObtenerAutosBuscador/:TIPO_BUSQUEDA/:BUSQUEDA', BuscadorAutoController_1.default.ObtenerAutosBuscador);
router.get('/ObtenerAutoPreview/:ID_AUTO/:ID_USUARIO/:ISQR', BuscadorAutoController_1.default.ObtenerAutoPreview);
router.get('/ObtenerAutosSimilares/:ID_AUTO', BuscadorAutoController_1.default.ObtenerAutosSimilares);
router.get('/ObtenerInformacionAutoPorId/:ID_VEHICULO', BuscadorAutoController_1.default.ObtenerInformacionAutoPorId);
router.get('/ObtenerAutoNuevos', BuscadorAutoController_1.default.ObtenerAutosNuevos);
router.get('/ObtenerAutosFavoritosUsuario/:ID_USUARIO', BuscadorAutoController_1.default.ObtenerAutosFavoritosUsuario);
router.get('/ObtenerAutosPerfilUsuario/:id_usuario', middleware_1.default.validarToken, BuscadorAutoController_1.default.ObtenerAutosPerfilUsuario);
router.get('/ObtenerDetalleVehiculo/:id_vehiculo', middleware_1.default.validarToken, BuscadorAutoController_1.default.ObtenerDetalleVehiculoPerfil);
router.get('/ObtenerDetalleVehiculoEnVenta/:id_vehiculo', middleware_1.default.validarToken, BuscadorAutoController_1.default.ObtenerDetalleVehiculoEnVenta);
router.post('/PublicarVehiculoPortal', middleware_1.default.validarToken, BuscadorAutoController_1.default.PublicarVehiculoPortal);
router.put('/ActualizarPrecioVehiculo', middleware_1.default.validarToken, BuscadorAutoController_1.default.ActualizarPrecioVehiculo);
router.put('/dejarDeVenderAuto', middleware_1.default.validarToken, BuscadorAutoController_1.default.dejarDeVenderAuto);
exports.default = router;
//# sourceMappingURL=BuscadorAutoRoute.js.map