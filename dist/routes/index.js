"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_route_1 = __importDefault(require("./Usuarios/usuarios.route"));
const catalogos_route_1 = __importDefault(require("./Catalogos/catalogos.route"));
const carinspector_route_1 = __importDefault(require("./Carinspector/carinspector.route"));
const pagos_route_1 = __importDefault(require("./Pagos/pagos.route"));
const CompraRoute_1 = __importDefault(require("./CompraVenta/CompraRoute"));
const BuscadorAutoRoute_1 = __importDefault(require("./BuscadorAutos/BuscadorAutoRoute"));
const Garantia_route_1 = __importDefault(require("./Garantia/Garantia.route"));
const AutosRoute_1 = __importDefault(require("./Autos/AutosRoute"));
const CuponesRoute_1 = __importDefault(require("./Cupon/CuponesRoute"));
const Contrato_route_1 = __importDefault(require("./Contrato/Contrato.route"));
const router = (0, express_1.Router)();
router.use("/Usuarios", usuarios_route_1.default);
router.use("/Catalogos", catalogos_route_1.default);
router.use("/Carinspector", carinspector_route_1.default);
router.use("/Pagos", pagos_route_1.default);
router.use("/CompraVenta", CompraRoute_1.default);
router.use("/Buscador", BuscadorAutoRoute_1.default);
router.use("/Garantia", Garantia_route_1.default);
router.use("/Autos", AutosRoute_1.default);
router.use("/Contrato", Contrato_route_1.default);
router.use("/Cupones", CuponesRoute_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map