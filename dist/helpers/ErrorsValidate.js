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
Object.defineProperty(exports, "__esModule", { value: true });
const webhook_1 = require("@slack/webhook");
const config_1 = require("../config/config");
const webHookSlack = new webhook_1.IncomingWebhook("https://hooks.slack.com/services/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");
class ErrorClass {
    static HttpError(error, res, code = 403) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let date = new Date();
            let today = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
            const error1 = error.message || error;
            const errorSql = ((_a = error === null || error === void 0 ? void 0 : error.parent) === null || _a === void 0 ? void 0 : _a.sql) || "";
            console.log("**********ERROR*********");
            console.log(error1);
            console.log(errorSql);
            console.log("**********ERROR*********");
            webHookSlack.send({
                text: "PORTAL CARALIANZ " + config_1.TIPO_AMBIENTE + "\n" + " FECHA: " + today + "\n" + "=>" + error1 + "\n" + errorSql
            });
            /*  if(TIPO_AMBIENTE == "PRODUCTION"){
                webHookSlack.send({
                    text: "PORTAL CARALIANZ " + "\n" + " FECHA: " + today + "\n" + "=>" + error1 + "\n" + errorSql
                });
             } */
            return res.status(code).json({
                ok: false,
                message: 'Ocurrio un error intente más tarde'
            });
        });
    }
}
exports.default = ErrorClass;
//# sourceMappingURL=ErrorsValidate.js.map