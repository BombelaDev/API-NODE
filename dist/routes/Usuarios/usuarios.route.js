"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SolicitudUsuarioController_1 = __importDefault(require("../../controllers/SolicitudUsuario/SolicitudUsuarioController"));
const usuarios_controller_1 = __importDefault(require("../../controllers/Usuarios/usuarios.controller"));
const middleware_1 = __importDefault(require("../../middlewares/middleware"));
const router = (0, express_1.Router)();
router.post('/login', usuarios_controller_1.default.login);
router.get('/renew', middleware_1.default.validarToken, usuarios_controller_1.default.renewToken);
router.post('/RegistroUsuario', usuarios_controller_1.default.RegistroUsuario);
router.get('/ActivaUsuarioCaralianz/:token', usuarios_controller_1.default.ActivaUsuarioCaralianz);
router.post('/ReenviarCorreoActivacion', usuarios_controller_1.default.ReenviarCorreoActivacion);
router.post('/ResetearPassword', usuarios_controller_1.default.ResetearPassword);
router.get('/ObtenerUsuarioLogueado/:token', middleware_1.default.validarToken, usuarios_controller_1.default.ObtenerUsuarioLogueado);
router.post('/login-google', usuarios_controller_1.default.loginGoogle);
router.post('/enviarFormularioAyuda', usuarios_controller_1.default.enviarFormularioAyuda);
router.post('/enviarFormularioContacto', usuarios_controller_1.default.enviarFormularioContacto);
router.put('/ActualizaCampoUsuario', middleware_1.default.validarToken, usuarios_controller_1.default.ActualizaCampoUsuario);
router.post('/registrarCorreoNewsletter', usuarios_controller_1.default.registrarCorreoNewsletter);
router.get('/prueba', usuarios_controller_1.default.prueba);
router.get('/ObtenerAutosFavoritosUsuario/:id_usuario', middleware_1.default.validarToken, usuarios_controller_1.default.ObtenerAutosFavoritosUsuario);
router.post('/RemoveAutoGarage', usuarios_controller_1.default.RemoveAutoGarage);
router.post('/AddAutoGarage', usuarios_controller_1.default.AddAutoGarage);
router.post('/InsertaPosibleFinanciamiento', usuarios_controller_1.default.InsertaPosibleFinanciamiento);
router.post('/enviarDatosCredito', usuarios_controller_1.default.enviarDatosCredito);
router.post('/enviarDatosSeguro', usuarios_controller_1.default.enviarDatosSeguro);
router.post('/enviarDatosGarantia', usuarios_controller_1.default.enviarDatosGarantia);
router.post('/actualizarUsuario', usuarios_controller_1.default.actualizarUsuario);
router.post('/InsertaAccionBitacora', usuarios_controller_1.default.InsertaAccionBitacora);
router.get('/ObtenerNotificacionesPerfil/:id_usuario', middleware_1.default.validarToken, usuarios_controller_1.default.ObtenerNotificacionesPerfil);
router.get('/ObtenerEventosPerfil/:id_usuario', middleware_1.default.validarToken, usuarios_controller_1.default.ObtenerEventosPerfil);
router.get('/obtenerDireccionesUsuario/:id_usuario', middleware_1.default.validarToken, usuarios_controller_1.default.obtenerDireccionesUsuario);
router.post('/eliminarDireccion', usuarios_controller_1.default.eliminarDireccion);
router.get('/obtenerDireccion/:id_direccion', middleware_1.default.validarToken, usuarios_controller_1.default.obtenerDireccion);
router.get('/ObtenerNotificaciones/:id_usuario', middleware_1.default.validarToken, usuarios_controller_1.default.ObtenerNotificaciones);
router.get('/EliminaNotificacion/:ID_NOTIFICACION', middleware_1.default.validarToken, usuarios_controller_1.default.EliminaNotificacion);
router.get('/ObtenerCitasPerfil/:id_usuario', middleware_1.default.validarToken, usuarios_controller_1.default.ObtenerCitasPerfil);
router.post('/RegistraUsuarioInvitado', usuarios_controller_1.default.RegistraUsuarioInvitado);
router.post('/VerificaUsuarioInvitado', usuarios_controller_1.default.VerificaUsuarioInvitado);
router.post('/ActivarCuentaInvitado', usuarios_controller_1.default.ActivarCuentaInvitado);
router.post('/EnviarCorreoActivacion', usuarios_controller_1.default.EnviarCorreoActivacion);
router.post('/InsertaPosibleFinanciamientoAbierto', usuarios_controller_1.default.InsertaPosibleFinanciamientoAbierto);
router.post('/GuardarSolicitudCobroSeguro', SolicitudUsuarioController_1.default.guardarSolicitudSeguro);
router.post('/GuardarSolicitudFacturacion', SolicitudUsuarioController_1.default.guardarSolicitudFacturacion);
router.post('/InsertaPosibleRevisionLegal', SolicitudUsuarioController_1.default.guardarSolicitudRevisionLegal);
router.post('/EnviarDatosRifa', usuarios_controller_1.default.enviarDatosRifa);
//router.get('/autos/solicitudes/validadas',  UserController.obtenerAutosSolicituados);
//https://caralianzalfa.herokuapp.com/api/caralianz/Usuarios/prueba
/* router.post('/ReenviarCorreo', async (req, res) => {
        try {
          const response =   await UserController.ReenviarCorreo(req.body);
        
            res.send(response);
        } catch (error) {
            console.log(error);
            
            res.send(Promise.reject(error.message));
        }
}); */
exports.default = router;
//# sourceMappingURL=usuarios.route.js.map