import { admin } from "./../../config/config";
import { Request, Response } from "express";
import {
  db,
} from "../../config/config";

import ErrorClass from "../../helpers/ErrorsValidate";

class CuponController {
  static verficarCupon = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_VERIFICA_CUPON(?,?,?)";
      let replacements = [
        req.body.PIN_CL_CUPON,
        req.body.PIN_ID_USUARIO,
        req.body.PIN_CL_PROCESO,
      ];
      let respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } =
        respuesta[0];
      console.log(respuesta[0]);
      return res.status(200).json(respuesta[0]);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static aplicarCupon = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_APLICA_CUPON(?,?)";
      let replacements = [
        req.body.PIN_ID_REGISTRO_CUPON,
        req.body.PIN_CL_REFERENCIA,
      ];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json(respuesta[0]);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
}

export default CuponController;
