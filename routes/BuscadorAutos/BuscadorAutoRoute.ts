import { Router, Request, Response } from "express";

import validaciones from '../../middlewares/middleware';

import BuscadorAutoController from '../../controllers/BuscadorAutos/BuscadorAutoController';

const router:Router = Router();

router.get('/ObtenerAutosBuscador/:TIPO_BUSQUEDA/:BUSQUEDA',BuscadorAutoController.ObtenerAutosBuscador);
router.get('/ObtenerAutoPreview/:ID_AUTO/:ID_USUARIO/:ISQR',BuscadorAutoController.ObtenerAutoPreview);
router.get('/ObtenerAutosSimilares/:ID_AUTO',BuscadorAutoController.ObtenerAutosSimilares);
router.get('/ObtenerInformacionAutoPorId/:ID_VEHICULO',BuscadorAutoController.ObtenerInformacionAutoPorId);
router.get('/ObtenerAutoNuevos',BuscadorAutoController.ObtenerAutosNuevos);
router.get('/ObtenerAutosFavoritosUsuario/:ID_USUARIO',BuscadorAutoController.ObtenerAutosFavoritosUsuario);
router.get('/ObtenerAutosPerfilUsuario/:id_usuario',validaciones.validarToken, BuscadorAutoController.ObtenerAutosPerfilUsuario);
router.get('/ObtenerDetalleVehiculo/:id_vehiculo',validaciones.validarToken, BuscadorAutoController.ObtenerDetalleVehiculoPerfil);
router.get('/ObtenerDetalleVehiculoEnVenta/:id_vehiculo',validaciones.validarToken, BuscadorAutoController.ObtenerDetalleVehiculoEnVenta);
router.post('/PublicarVehiculoPortal',validaciones.validarToken, BuscadorAutoController.PublicarVehiculoPortal);
router.put('/ActualizarPrecioVehiculo',validaciones.validarToken, BuscadorAutoController.ActualizarPrecioVehiculo);
router.put('/dejarDeVenderAuto',validaciones.validarToken, BuscadorAutoController.dejarDeVenderAuto);




export default router;

