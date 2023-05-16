import { Request, Response } from "express";

var messagebird = require("messagebird")("Zu5bgCTKCcGsf9L9Uat0zpWG6");

class sms {
  static async EnviarSMS(
    telefono: string,
    mssg: string,
    FG_ENVIAR_NOTIFICACIONES: number
  ): Promise<boolean> {
    try {
      if (!telefono || telefono == "") {
        return true;
      }
      if (FG_ENVIAR_NOTIFICACIONES == 0) {
        console.log("NO ENVIAR MENSAJES");
        return true;
      }

      var params = {
        originator: "+524775580729",
        recipients: [telefono],
        body: mssg,
      };

      messagebird.messages.create(
        params,
        function (err: Error, response: Response) {
          if (err) {
            console.log(
              "*************************************************************************"
            );
            console.log(err);
            console.log(
              "****************************************************************************"
            );
          } else {
            console.log("MENSAJE DE TEXTO ENVIADO CORRECTAMENTE");
            return true;
          }
        }
      );
    } catch (error) {
      const message = `Error al enviar MENSJA DE TEXTO`;
      console.error(message);
      console.error(error.message || error);
      if (error.response) {
        console.error(error.response.body);
      }

      return false;
    }
  }
}

export default sms;
