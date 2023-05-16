"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const garantia_controller_1 = __importDefault(require("../../controllers/Garantia/garantia.controller"));
const router = (0, express_1.Router)();
router.post('/GenerarReferenciaCarinspector', garantia_controller_1.default.GenerarReferenciaCarinspector);
router.post('/PagarCarisnpector', garantia_controller_1.default.PagoCarinspector);
router.post('/verificarCuponCarinspector', garantia_controller_1.default.verificarCuponCarinspector);
router.post('/AplicarCupon', garantia_controller_1.default.AplicarCupon);
router.get('/ObtenerPrecioCarinspector', garantia_controller_1.default.ObtenerPrecioCarinspector);
exports.default = router;
//# sourceMappingURL=Garantia.route.js.map