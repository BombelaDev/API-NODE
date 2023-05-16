"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SolicitudAutoController_1 = __importDefault(require("../../controllers/SolicitudAuto/SolicitudAutoController"));
const AutoController_1 = __importDefault(require("../../controllers/Auto/AutoController"));
const router = (0, express_1.Router)();
router.post('/GuardarAutoSolicitado', SolicitudAutoController_1.default.guardarAutoSolicitado);
router.post('/GuardarAutoEncontrado', SolicitudAutoController_1.default.guardarAutoEncontrado);
router.get('/ObtenerAutosBuscados', SolicitudAutoController_1.default.obtenerAutosSolicitados);
router.get('/', AutoController_1.default.index);
router.get('/todos', AutoController_1.default.index);
exports.default = router;
//# sourceMappingURL=AutosRoute.js.map