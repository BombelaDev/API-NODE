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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sgMail = require("@sendgrid/mail");
const sendGridKey = "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";
sgMail.setApiKey(sendGridKey);
var messagebird = require("messagebird")("Zu5bgCTKCcGsf9L9Uat0zpWG6");
class Notifications {
    static SendNotification(CL_CONFIG_NOTIFICATION, ID_REGISTRO) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let RESULT = yield config_1.db.query(this.QueryNotifications, {
                    replacements: [CL_CONFIG_NOTIFICATION, ID_REGISTRO],
                });
                if (RESULT.length > 0) {
                    try {
                        for (var RESULT_1 = __asyncValues(RESULT), RESULT_1_1; RESULT_1_1 = yield RESULT_1.next(), !RESULT_1_1.done;) {
                            let data = RESULT_1_1.value;
                            if (data.CL_MEDIO == "EMAIL") {
                                this.template = data.DS_BODY;
                                let to = data.DS_DESTINO;
                                //Preguntamos si hay mas destinatarios
                                if (data.FG_TO_CC == "1") {
                                    let array = JSON.parse(data.DS_TO_CC);
                                    array.push(data.DS_DESTINO);
                                    to = array;
                                }
                                const mailOptions = {
                                    from: this.FROM,
                                    to,
                                    bcc: data.FG_TO_CCO == "1" ? data.DS_TO_CCO : [],
                                    subject: data.DS_ASUNTO,
                                    html: this.template,
                                };
                                yield sgMail.send(mailOptions);
                            }
                            if (data.CL_MEDIO == "SMS") {
                                var params = {
                                    originator: "+524696218545",
                                    recipients: [data.DS_DESTINO],
                                    body: data.DS_BODY,
                                };
                                const a = messagebird.messages.create(params, (err, response) => {
                                    if (err) {
                                        return false;
                                    }
                                    else {
                                        console.log("MENSAJE DE TEXTO ENVIADO CORRECTAMENTE");
                                        return true;
                                    }
                                });
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (RESULT_1_1 && !RESULT_1_1.done && (_a = RESULT_1.return)) yield _a.call(RESULT_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return true;
                }
            }
            catch (error) {
                console.log("ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR");
                console.log(error);
                const message = `Error al enviar notificaciones`;
                console.error(message);
                console.error(error.message || error);
                if (error.response) {
                    console.error(error.response.body);
                }
                return false;
            }
        });
    }
}
Notifications.FROM = "Caralianz <noreply@caralianz.com>";
Notifications.Query = "CALL CA_OBTIENE_CORREO_ELECTRONICO(?,?,?,?,?);";
Notifications.QueryNotifications = "CALL CA_OBTIENE_CONFIGURACION_NOTIFICACION(?,?);";
exports.default = Notifications;
//# sourceMappingURL=Notifications.js.map