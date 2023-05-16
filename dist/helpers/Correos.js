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
const config_1 = require("../config/config");
const enums_1 = require("../enums/enums");
const sgMail = require('@sendgrid/mail');
const sendGridKey = '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';
sgMail.setApiKey(sendGridKey);
// Require:
//var postmark = require("postmark");
// Send an email:
//var client = new postmark.Client("7ff5da8f-fe25-49ae-9a18-b097a67769df");
class Correo {
    static EnviarCorreo(asunto, DS_EMAIL, replacements, BCC) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (enums_1.SEND_NOTIFICATIONS == 0) {
                console.log('NO ENVIAR CORREOS');
                return true;
            }
            try {
                console.log(replacements);
                let RESULT = yield config_1.db.query(this.Query, { replacements });
                console.log(RESULT);
                console.log("CORREEOOOOOOOOOOOOOOOOOOOOO");
                this.template = (_a = RESULT[0]) === null || _a === void 0 ? void 0 : _a.POUT_DS_RESPUESTA;
                console.log(DS_EMAIL);
                console.log("****************************REPLACEMENTES******************");
                console.log("################################# TEMPLATE VIENE VACIO ########################################");
                console.log(this.template);
                console.log("################################# TEMPLATE VIENE VACIO ########################################");
                const mailOptions = {
                    from: this.FROM,
                    to: DS_EMAIL,
                    bcc: config_1.TIPO_AMBIENTE == "PRODUCTION" ? BCC : [],
                    subject: RESULT[0].POUT_DS_ASUNTO || asunto,
                    html: this.template
                };
                yield sgMail.send(mailOptions);
                return true;
            }
            catch (error) {
                console.log("ERROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR");
                console.log(error);
                const message = `Error al enviar correo electronico`;
                console.error(message);
                console.error(error.message || error);
                if (error.response) {
                    console.error(error.response.body);
                }
                return false;
            }
        });
    }
    static EnviarCorreoActivacion(DS_EMAIL, replacements, SUBJECT, BCC, FG_ENVIAR_CORREO) {
        return __awaiter(this, void 0, void 0, function* () {
            if (FG_ENVIAR_CORREO == 0) {
                console.log('NO ENVIAR CORREOS');
                return true;
            }
            try {
                const RESULT = yield config_1.db.query(this.Query, { replacements });
                this.template = RESULT[0].POUT_DS_RESPUESTA;
                const mailOptions = {
                    from: this.FROM,
                    to: DS_EMAIL,
                    subject: SUBJECT,
                    html: this.template,
                };
                yield sgMail.send(mailOptions);
                return true;
            }
            catch (error) {
                const message = `Error al enviar correo electronico`;
                console.error(message);
                console.error(error.message || error);
                if (error.response) {
                    console.error(error.response.body);
                }
                return false;
            }
        });
    }
    static EnviarCorreoAyudaContactanos(DS_EMAIL, TEMPLATE, ASUNTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    from: this.FROM,
                    to: ['hola@caralianz.com'],
                    subject: ASUNTO,
                    html: TEMPLATE
                };
                yield sgMail.send(mailOptions);
                return true;
            }
            catch (error) {
                const message = `Error al enviar correo electronico`;
                console.error(message);
                console.error(error.message || error);
                if (error.response) {
                    console.error(error.response.body);
                }
                return false;
            }
        });
    }
    /* static async EnviarCorreoPrueba():Promise<boolean>{
    console.log('assssssssssssssssssssssssssss');
    
    this.template = "<h1>Enviado desde messageBird  sdsdfsdfsdfsd</h1>"
    
     
    const mailOptions = {
      "From": "daniel.bombela@caralianz.com",
      "To": "daniel.bombela@caralianz.com",
      "Subject": "Hello from Postmark",
      "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
      "TextBody": "Hello from Postmark!",
      "MessageStream": "outbound"
    }
      
    
      
      try {
     const response =    await client.sendEmail( mailOptions);
    console.log(response);
    console.log('****************************');
    
        return true;
    
      }
       catch (error) {
        const message = `Error al enviar correo electronico`;
        console.error(message);
        console.error(error.message  || error);
        if (error.response) {
          console.error(error.response.body)
        }
        return false;
      }
    
    } */
    static EnviarCorreoFinanciamiento(asunto, DS_EMAIL, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (enums_1.SEND_NOTIFICATIONS == 0) {
                console.log('NO ENVIAR CORREOS');
                return true;
            }
            try {
                let template = `
          <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;min-width:100%" width="100%">
          <tr>
              <td>
                  <div style=" margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                      <h2><strong>¡Alguien quiere financimiento!</strong></h2>
                      <p><strong>¿Deseas agregar más de enganche?: ${data.MN_MAS_ENGANCHE}</strong> </p>
                      <p><strong>Total de enganche: ${data.TOTAL_ENGACHE}</strong> </p>
                      <p><strong>Elige el plazo: ${data.NO_MESES} meses</strong></p>
                      <p><strong>Mensualidad deseada:${data.MENSUALIDAD_DESEADA} </strong> </p>
                    
                      </p>
        
        
                      <br><br>
                  </div>
        
              </td>
          </tr>
        </table>
        <br><br><br>
          `;
                const mailOptions = {
                    from: this.FROM,
                    to: DS_EMAIL,
                    bcc: ['adoc@caralianz.com'],
                    subject: asunto,
                    html: template
                };
                yield sgMail.send(mailOptions);
                return true;
            }
            catch (error) {
                const message = `Error al enviar correo electronico`;
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
Correo.FROM = "Caralianz <noreply@caralianz.com>";
Correo.Query = "CALL CA_OBTIENE_CORREO_ELECTRONICO(?,?,?,?,?);";
exports.default = Correo;
//# sourceMappingURL=Correos.js.map