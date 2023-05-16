import { Router, Request, Response } from "express";
import validaciones from '../../middlewares/middleware';
import SolicitudAutoController from '../../controllers/SolicitudAuto/SolicitudAutoController';
import AutoController from '../../controllers/Auto/AutoController';
const router: Router = Router();

router.post('/GuardarAutoSolicitado', SolicitudAutoController.guardarAutoSolicitado);
router.post('/GuardarAutoEncontrado', SolicitudAutoController.guardarAutoEncontrado);
router.get('/ObtenerAutosBuscados', SolicitudAutoController.obtenerAutosSolicitados);
router.get('/', AutoController.index);
router.get('/todos', AutoController.index);

export default router;
