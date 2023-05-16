import { Router, Request, Response } from "express";

import validaciones from '../../middlewares/middleware';
import CarinspectorController from '../../controllers/Carinspector/carinspector.controller';

const router:Router = Router();



router.post('/InsertaLeadPortal', CarinspectorController.InsertaLeadPortal);
router.post('/PagarCarisnpector', CarinspectorController.PagoCarinspector);
router.post('/verificarCuponCarinspector', CarinspectorController.verificarCuponCarinspector);

router.post('/AplicarCupon', CarinspectorController.AplicarCupon);

router.get('/ObtenerPrecioCarinspector', CarinspectorController.ObtenerPrecioCarinspector);

router.post('/GenerarRerefenciaGarantia', CarinspectorController.GenerarRerefenciaGarantia);

router.get('/ObtenerPrecioGarantia/:cl_concepto', CarinspectorController.ObtenerPrecioGarantia);

router.get('/ObtenerInformacionCertificadoCarinspector/:id_vehiculo_datos', CarinspectorController.ObtenerInformacionCertificadoCarinspector);

router.post('/LiberarCitaCarinspector', CarinspectorController.LiberarCitaCarinspector);

router.post('/InsertaPosibleVenta', CarinspectorController.InsertaPosibleVenta);

router.post('/InsertaPosibleGarantia', CarinspectorController.InsertaPosibleGarantia);



router.post('/GuardarProcesoPortal', CarinspectorController.GuardarProcesoPortal);



export default router;

