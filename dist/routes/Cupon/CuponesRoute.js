"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cupon_controller_1 = __importDefault(require("../../controllers/Cupon/cupon.controller"));
const router = (0, express_1.Router)();
router.post('/verificarCupon', cupon_controller_1.default.verficarCupon);
router.post('/aplicarCupon', cupon_controller_1.default.aplicarCupon);
exports.default = router;
//# sourceMappingURL=CuponesRoute.js.map