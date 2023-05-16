import { db, TIPO_AMBIENTE } from "../config/config";
import { SEND_NOTIFICATIONS } from "../enums/enums";
const sgMail = require("@sendgrid/mail");

const sendGridKey =
  "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";
sgMail.setApiKey(sendGridKey);

var messagebird = require("messagebird")("Zu5bgCTKCcGsf9L9Uat0zpWG6");

class Notifications {
  static template: string;
  static html: String;
  static CORRECTO: JSON;
  static FROM = "Caralianz <noreply@caralianz.com>";
  static Query = "CALL CA_OBTIENE_CORREO_ELECTRONICO(?,?,?,?,?);";
  static QueryNotifications = "CALL CA_OBTIENE_CONFIGURACION_NOTIFICACION(?,?);";

  static async SendNotification(
    CL_CONFIG_NOTIFICATION: string,
    ID_REGISTRO: number
  ) {

    try {
      let RESULT: any = await db.query(this.QueryNotifications, {
        replacements: [CL_CONFIG_NOTIFICATION, ID_REGISTRO],
      });


      if (RESULT.length > 0) {

        for await (let data of RESULT) {

          if (data.CL_MEDIO == "EMAIL") {

            this.template = data.DS_BODY;
            let to = data.DS_DESTINO;

            //Preguntamos si hay mas destinatarios
            if (data.FG_TO_CC == "1") {
              let array = JSON.parse(data.DS_TO_CC);
              array.push(data.DS_DESTINO)
              to = array;
            }

            const mailOptions = {
              from: this.FROM,
              to,
              bcc: data.FG_TO_CCO == "1" ? data.DS_TO_CCO : [],
              subject: data.DS_ASUNTO,
              html: this.template,
            };

            await sgMail.send(mailOptions);
          }

          if (data.CL_MEDIO == "SMS") {
            var params = {
              originator: "+524696218545",
              recipients: [data.DS_DESTINO],
              body: data.DS_BODY,
            };

            const a = messagebird.messages.create(
              params,
              (err: Error, response: Response) => {
                if (err) {
                  return false;
                } else {
                  console.log("MENSAJE DE TEXTO ENVIADO CORRECTAMENTE");
                  return true;
                }
              }
            );


          }

        }





        return true;

      }
    } catch (error) {
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
  }
}

export default Notifications;
