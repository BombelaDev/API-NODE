"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carinspector_controller_1 = __importDefault(require("../../controllers/Carinspector/carinspector.controller"));
const router = (0, express_1.Router)();
router.post('/InsertaLeadPortal', carinspector_controller_1.default.InsertaLeadPortal);
router.post('/PagarCarisnpector', carinspector_controller_1.default.PagoCarinspector);
router.post('/verificarCuponCarinspector', carinspector_controller_1.default.verificarCuponCarinspector);
router.post('/AplicarCupon', carinspector_controller_1.default.AplicarCupon);
router.get('/ObtenerPrecioCarinspector', carinspector_controller_1.default.ObtenerPrecioCarinspector);
router.post('/GenerarRerefenciaGarantia', carinspector_controller_1.default.GenerarRerefenciaGarantia);
router.get('/ObtenerPrecioGarantia/:cl_concepto', carinspector_controller_1.default.ObtenerPrecioGarantia);
router.get('/ObtenerInformacionCertificadoCarinspector/:id_vehiculo_datos', carinspector_controller_1.default.ObtenerInformacionCertificadoCarinspector);
router.post('/LiberarCitaCarinspector', carinspector_controller_1.default.LiberarCitaCarinspector);
router.post('/InsertaPosibleVenta', carinspector_controller_1.default.InsertaPosibleVenta);
router.post('/InsertaPosibleGarantia', carinspector_controller_1.default.InsertaPosibleGarantia);
router.post('/GuardarProcesoPortal', carinspector_controller_1.default.GuardarProcesoPortal);
exports.default = router;
//# sourceMappingURL=carinspector.route.js.map