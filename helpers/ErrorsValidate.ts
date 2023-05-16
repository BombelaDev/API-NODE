import { Request, Response } from "express";

import { IncomingWebhook } from "@slack/webhook";
import { TIPO_AMBIENTE } from "../config/config";

const webHookSlack = new IncomingWebhook(
  "https://hooks.slack.com/services/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"
);

class ErrorClass {
  static async HttpError(error: any, res: Response, code = 403) {
    let date = new Date();
    let today =
      String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear();

    const error1 = error.message || error;
    const errorSql = error?.parent?.sql || "";

    console.log("**********ERROR*********");
    console.log(error1);
    console.log(errorSql);
    console.log("**********ERROR*********");

    webHookSlack.send({
      text:
        "PORTAL CARALIANZ " +
        TIPO_AMBIENTE +
        "\n" +
        " FECHA: " +
        today +
        "\n" +
        "=>" +
        error1 +
        "\n" +
        errorSql,
    });

    return res.status(code).json({
      ok: false,
      message: "Ocurrio un error intente más tarde",
    });
  }
}

export default ErrorClass;
