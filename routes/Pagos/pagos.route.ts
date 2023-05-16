import { Router, Request, Response } from "express";

import validaciones from '../../middlewares/middleware';

import PagosController from "../../controllers/Pagos/Pagos.controller";

const router:Router = Router();




router.post('/PagoConektaTarjeta', PagosController.PagoConektaTarjeta);

router.post('/RealizarPagoOxxo', PagosController.RealizarPagoOxxo);

router.post('/WebHookConekta', PagosController.WebHookConekta);
/* router.get('/ObtenerInformacionCitaPorReferencia/:referencia', PagosController.ObtenerInformacionCitaPorReferencia);
 */




export default router;

