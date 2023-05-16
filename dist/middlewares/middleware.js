"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responses_1 = __importDefault(require("../helpers/responses"));
class validaciones {
}
validaciones.validarCampos = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req); //cachando errores desde el middleware
    if (!errores.isEmpty()) {
        return responses_1.default.send(res, req, 400, true, errores.mapped().toString());
    }
    //si llega aqui no hay errores
    next();
};
validaciones.validarToken = (req, res, next) => {
    //LEER DEL TOKEN
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            error: true,
            message: 'unauthorized 401'
        });
    }
    try {
        const id_usuario = jsonwebtoken_1.default.verify(token, process.env.SEED_TOKEN);
        req.id_usuario = id_usuario;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: true, message: 'Token no válido' });
    }
};
exports.default = validaciones;
//# sourceMappingURL=middleware.js.map