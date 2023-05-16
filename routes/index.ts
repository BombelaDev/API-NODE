
import { Router, Request, Response } from "express";
import UsuarioRoute from './Usuarios/usuarios.route';
import CatalogoRoute from './Catalogos/catalogos.route';
import CarinspectorRoute from './Carinspector/carinspector.route';
import PagosRoute from './Pagos/pagos.route';
import CompraVentaRoute from './CompraVenta/CompraRoute';
import BuscadorAutosRoute from './BuscadorAutos/BuscadorAutoRoute';
import GarantiaRoute from './Garantia/Garantia.route';
import AutosRoute from './Autos/AutosRoute';
import CuponesRoute from './Cupon/CuponesRoute';
import ContratoRoute from './Contrato/Contrato.route';
const router = Router();

router.use("/Usuarios",UsuarioRoute);
router.use("/Catalogos",CatalogoRoute);
router.use("/Carinspector",CarinspectorRoute);
router.use("/Pagos",PagosRoute);
router.use("/CompraVenta",CompraVentaRoute);
router.use("/Buscador",BuscadorAutosRoute);
router.use("/Garantia",GarantiaRoute);
router.use("/Autos",AutosRoute);
router.use("/Contrato",ContratoRoute);
router.use("/Cupones", CuponesRoute)

export default router;
