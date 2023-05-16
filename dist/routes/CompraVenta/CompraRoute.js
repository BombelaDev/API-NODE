"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../../middlewares/middleware"));
const CompraVenta_controller_1 = __importDefault(require("../../controllers/CompraVenta/CompraVenta.controller"));
const router = (0, express_1.Router)();
router.post('/GeneraCitaComercial', CompraVenta_controller_1.default.GeneraCitaComercial);
router.get('/VendedorConfirmaCitaCorreo/:ID_CITA', CompraVenta_controller_1.default.VendedorConfirmaCitaCorreo);
router.get('/ObtenerDatosCitaCarSalesPorToken/:ID_CITA', CompraVenta_controller_1.default.ObtenerDatosCitaCarSalesPorToken);
router.get('/VendedorRechazaCitaCorreo/:ID_CITA', CompraVenta_controller_1.default.VendedorRechazaCitaCorreo);
router.post('/ProponerTresFechas', middleware_1.default.validarToken, CompraVenta_controller_1.default.ProponerTresFechas);
router.get('/ConfirmarPropuestaCorreo/:ID_CITA/:ID_AGRUPADOR', CompraVenta_controller_1.default.ConfirmarPropuestaCorreo);
router.get('/RechazarPropuestas/:ID_AGRUPADOR', CompraVenta_controller_1.default.RechazarPropuestas);
router.get('/NoSigueEnVentaAutoVendedorCorreo/:ID_CITA', CompraVenta_controller_1.default.NoSigueEnVentaAutoVendedorCorreo);
router.put('/VendiAuto', middleware_1.default.validarToken, CompraVenta_controller_1.default.VendiAuto);
router.put('/MeQuedeAuto', middleware_1.default.validarToken, CompraVenta_controller_1.default.MeQuedeAuto);
router.get('/RegistraVistaQr/:ID_VEHICULO/:ID_COMPLETO', CompraVenta_controller_1.default.RegistraVistaQr);
router.post('/EnviarCorreoVerAuto', CompraVenta_controller_1.default.EnviarCorreoVerAuto);
exports.default = router;
//# sourceMappingURL=CompraRoute.js.map