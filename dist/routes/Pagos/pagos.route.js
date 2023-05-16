"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Pagos_controller_1 = __importDefault(require("../../controllers/Pagos/Pagos.controller"));
const router = (0, express_1.Router)();
router.post('/PagoConektaTarjeta', Pagos_controller_1.default.PagoConektaTarjeta);
router.post('/RealizarPagoOxxo', Pagos_controller_1.default.RealizarPagoOxxo);
router.post('/WebHookConekta', Pagos_controller_1.default.WebHookConekta);
/* router.get('/ObtenerInformacionCitaPorReferencia/:referencia', PagosController.ObtenerInformacionCitaPorReferencia);
 */
exports.default = router;
//# sourceMappingURL=pagos.route.js.map