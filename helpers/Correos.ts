import { db, TIPO_AMBIENTE } from "../config/config";
import { SEND_NOTIFICATIONS } from "../enums/enums";
const sgMail = require("@sendgrid/mail");

const sendGridKey =
  "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";
sgMail.setApiKey(sendGridKey);

class Correo {
  static template: string;
  static html: String;
  static CORRECTO: JSON;
  static FROM = "Caralianz <noreply@caralianz.com>";
  static Query = "CALL CA_OBTIENE_CORREO_ELECTRONICO(?,?,?,?,?);";

  static async EnviarCorreo(
    asunto: string,
    DS_EMAIL: string,
    replacements: any,
    BCC: any
  ): Promise<boolean> {
    if (SEND_NOTIFICATIONS == 0) {
      console.log("NO ENVIAR CORREOS");
      return true;
    }

    try {
      let RESULT: any = await db.query(this.Query, { replacements });

      this.template = RESULT[0]?.POUT_DS_RESPUESTA;

      const mailOptions = {
        from: this.FROM,
        to: DS_EMAIL,
        bcc: TIPO_AMBIENTE == "PRODUCTION" ? BCC : [],
        subject: RESULT[0].POUT_DS_ASUNTO || asunto,
        html: this.template,
      };

      await sgMail.send(mailOptions);
      return true;
    } catch (error) {
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
  }
}

export default Correo;
