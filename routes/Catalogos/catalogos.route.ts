import { Router, Request, Response } from "express";
import CatalogosController from '../../controllers/Catalogos/catalogos.controller';
import validaciones from '../../middlewares/middleware';

const router:Router = Router();
router.get('/GetCavs', CatalogosController.GetCavs);
router.get('/getDates/:ID_CAV',CatalogosController.getDates);

router.get('/ObtenerMarcasAuto', CatalogosController.ObtenerMarcasAuto);
router.get('/ObtenerModelos/:ID_MARCA', CatalogosController.ObtenerModelos);
router.get('/ObtenerAnios/:ID_MODELO', CatalogosController.ObtenerAnios);
router.get('/ObtenerAniosCompleto/:ID_MODELO', CatalogosController.ObtenerAniosCompleto);

router.get('/ObtenerColores', CatalogosController.ObtenerColores);


router.post('/ObtenerHorasPorDia', CatalogosController.ObtenerHorasPorDia);
router.get('/obtenerMunicipios/:ID_ESTADO', CatalogosController.ObtenerMunicipios);
router.get('/obtenerEstadosGeograficos',CatalogosController.obtenerEstadosGeograficos);
router.get('/BuscarDireccionPorCp/:NO_CP', CatalogosController.BuscarDireccionPorCp);
router.get('/ObtenerMensualidades/:ID_VEHICULO/:PR_ENGANCHE', CatalogosController.ObtenerMensualidades);
router.get('/ObtenerDatosFormularioContratos', CatalogosController.ObtenerDatosFormularioContratos);
router.get('/ObtieneMunicipios/:IdEstado', CatalogosController.ObtieneMunicipios);

 



export default router;

