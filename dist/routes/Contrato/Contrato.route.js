"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Contrato_controller_1 = __importDefault(require("../../controllers/Contrato/Contrato.controller"));
const router = (0, express_1.Router)();
router.post('/InsertaPosibleContrato', Contrato_controller_1.default.InsertaPosibleContrato);
router.post('/InsertaDatosVendedorContrato', Contrato_controller_1.default.InsertaDatosVendedorContrato);
router.post('/InsertaDatosCompradorContrato', Contrato_controller_1.default.InsertaDatosCompradorContrato);
router.post('/InsertaDatosFormaPago', Contrato_controller_1.default.InsertaDatosFormaPago);
router.post('/InsertaDatosVehiculo', Contrato_controller_1.default.InsertaDatosVehiculo);
router.get('/ObtieneDatosContrato/:id_solicitud', Contrato_controller_1.default.ObtieneDatosContrato);
router.get('/ObtieneInformacionPago/:id_solicitud', Contrato_controller_1.default.ObtieneInformacionPago);
router.get('/GenerarContrato/:id_solicitud', Contrato_controller_1.default.GenerarContrato);
router.post('/EnviarContrato', Contrato_controller_1.default.EnviarContrato);
/*
router.post('/PagarCarisnpector', GarantiaController.PagoCarinspector);
router.post('/verificarCuponCarinspector', GarantiaController.verificarCuponCarinspector);

router.post('/AplicarCupon', GarantiaController.AplicarCupon);

router.get('/ObtenerPrecioCarinspector', GarantiaController.ObtenerPrecioCarinspector);
 */
exports.default = router;
//# sourceMappingURL=Contrato.route.js.map