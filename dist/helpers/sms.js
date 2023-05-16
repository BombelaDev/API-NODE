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
var messagebird = require('messagebird')('Zu5bgCTKCcGsf9L9Uat0zpWG6');
class sms {
    static enviarTicketSms(telefono, referencia, nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            var params = {
                'originator': '+524696218545',
                'recipients': [
                    telefono
                ],
                'body': 'Hola para nosotros es un gusto contar con tu confianza,  con  esta referencia:' + referencia + 'puedes realizar el pago de tu cita en cualquier tienda oxxo. Atentamente Clara de Caralianz'
            };
            messagebird.messages.create(params, function (err, response) {
                if (err) {
                    console.log('*************************************************************************');
                    console.log(err);
                    console.log('****************************************************************************');
                }
                else {
                    console.log('MENSAJE DE TEXTO ENVIADO CORRECTAMENTE');
                }
            });
        });
    }
    static EnviarSMS(telefono, mssg, FG_ENVIAR_NOTIFICACIONES) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!telefono || telefono == "") {
                    return true;
                }
                if (FG_ENVIAR_NOTIFICACIONES == 0) {
                    console.log('NO ENVIAR MENSAJES');
                    return true;
                }
                var params = {
                    'originator': '+524775580729',
                    'recipients': [
                        telefono
                    ],
                    'body': mssg
                };
                messagebird.messages.create(params, function (err, response) {
                    if (err) {
                        console.log('*************************************************************************');
                        console.log(err);
                        console.log('****************************************************************************');
                    }
                    else {
                        console.log('MENSAJE DE TEXTO ENVIADO CORRECTAMENTE');
                        return true;
                    }
                });
            }
            catch (error) {
                const message = `Error al enviar MENSJA DE TEXTO`;
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
exports.default = sms;
//# sourceMappingURL=sms.js.map