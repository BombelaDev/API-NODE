import { Router, Request, Response } from "express";

import validaciones from '../../middlewares/middleware';

import CompraVentaController from "../../controllers/CompraVenta/CompraVenta.controller";

const router:Router = Router();



router.post('/GeneraCitaComercial', CompraVentaController.GeneraCitaComercial);
router.get('/VendedorConfirmaCitaCorreo/:ID_CITA',CompraVentaController.VendedorConfirmaCitaCorreo);
router.get('/ObtenerDatosCitaCarSalesPorToken/:ID_CITA',CompraVentaController.ObtenerDatosCitaCarSalesPorToken);
router.get('/VendedorRechazaCitaCorreo/:ID_CITA',CompraVentaController.VendedorRechazaCitaCorreo);

router.post('/ProponerTresFechas',validaciones.validarToken, CompraVentaController.ProponerTresFechas);
router.get('/ConfirmarPropuestaCorreo/:ID_CITA/:ID_AGRUPADOR',CompraVentaController.ConfirmarPropuestaCorreo);
router.get('/RechazarPropuestas/:ID_AGRUPADOR',CompraVentaController.RechazarPropuestas);
router.get('/NoSigueEnVentaAutoVendedorCorreo/:ID_CITA',CompraVentaController.NoSigueEnVentaAutoVendedorCorreo);

router.put('/VendiAuto',validaciones.validarToken,CompraVentaController.VendiAuto);
router.put('/MeQuedeAuto',validaciones.validarToken,CompraVentaController.MeQuedeAuto);

router.get('/RegistraVistaQr/:ID_VEHICULO/:ID_COMPLETO',CompraVentaController.RegistraVistaQr);
router.post('/EnviarCorreoVerAuto', CompraVentaController.EnviarCorreoVerAuto);

export default router;

