import { Router, Request, Response } from "express";

import validaciones from "../../middlewares/middleware";

import ContratoController from "../../controllers/Contrato/Contrato.controller";

const router: Router = Router();

router.post(
  "/InsertaPosibleContrato",
  ContratoController.InsertaPosibleContrato
);

router.post(
  "/InsertaDatosVendedorContrato",
  ContratoController.InsertaDatosVendedorContrato
);

router.post(
  "/InsertaDatosCompradorContrato",
  ContratoController.InsertaDatosCompradorContrato
);
router.post("/InsertaDatosFormaPago", ContratoController.InsertaDatosFormaPago);
router.post("/InsertaDatosVehiculo", ContratoController.InsertaDatosVehiculo);
router.get(
  "/ObtieneDatosContrato/:id_solicitud",
  ContratoController.ObtieneDatosContrato
);
router.get(
  "/ObtieneInformacionPago/:id_solicitud",
  ContratoController.ObtieneInformacionPago
);
router.get(
  "/GenerarContrato/:id_solicitud",
  ContratoController.GenerarContrato
);
router.post("/EnviarContrato", ContratoController.EnviarContrato);

export default router;
