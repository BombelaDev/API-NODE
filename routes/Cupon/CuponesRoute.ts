import { Router, Request, Response } from "express";
import validaciones from '../../middlewares/middleware';
import SolicitudAutoController from '../../controllers/SolicitudAuto/SolicitudAutoController';
import CuponController from '../../controllers/Cupon/cupon.controller';
const router:Router = Router();


router.post('/verificarCupon' ,   CuponController.verficarCupon);

router.post('/aplicarCupon' ,   CuponController.aplicarCupon);

export default router;
