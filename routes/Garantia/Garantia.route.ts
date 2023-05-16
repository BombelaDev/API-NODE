import { Router, Request, Response } from "express";

import validaciones from '../../middlewares/middleware';

import GarantiaController from '../../controllers/Garantia/garantia.controller';

const router:Router = Router();



router.post('/GenerarReferenciaCarinspector', GarantiaController.GenerarReferenciaCarinspector);
router.post('/PagarCarisnpector', GarantiaController.PagoCarinspector);
router.post('/verificarCuponCarinspector', GarantiaController.verificarCuponCarinspector);

router.post('/AplicarCupon', GarantiaController.AplicarCupon);

router.get('/ObtenerPrecioCarinspector', GarantiaController.ObtenerPrecioCarinspector);







export default router;

