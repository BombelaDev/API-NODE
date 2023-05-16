"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
const k_vehiculo_buscador_1 = __importDefault(require("../../models/k_vehiculo_buscador"));
class AutoController {
}
_a = AutoController;
AutoController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let vehiculos = yield k_vehiculo_buscador_1.default.findAll({
            offset: 0,
        });
        return res.status(200).json({
            message: 'ok',
            autos: vehiculos,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
exports.default = AutoController;
//# sourceMappingURL=AutoController.js.map