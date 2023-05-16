import { Router, Request, Response } from "express";
import SolicitudUsuarioController from "../../controllers/SolicitudUsuario/SolicitudUsuarioController";
import UserController from '../../controllers/Usuarios/usuarios.controller';
import validaciones from '../../middlewares/middleware';

const router:Router = Router();

router.post('/login',UserController.login);
router.get('/renew',validaciones.validarToken, UserController.renewToken);
router.post('/RegistroUsuario', UserController.RegistroUsuario);
router.get('/ActivaUsuarioCaralianz/:token', UserController.ActivaUsuarioCaralianz);
router.post('/ReenviarCorreoActivacion', UserController.ReenviarCorreoActivacion);
router.post('/ResetearPassword', UserController.ResetearPassword);
router.get('/ObtenerUsuarioLogueado/:token',validaciones.validarToken, UserController.ObtenerUsuarioLogueado);
router.post('/login-google',UserController.loginGoogle);
router.post('/enviarFormularioAyuda',  UserController.enviarFormularioAyuda);
router.post('/enviarFormularioContacto',  UserController.enviarFormularioContacto);
router.put('/ActualizaCampoUsuario',  validaciones.validarToken, UserController.ActualizaCampoUsuario);
router.post('/registrarCorreoNewsletter',  UserController.registrarCorreoNewsletter);
router.get('/prueba', UserController.prueba);
router.get('/ObtenerAutosFavoritosUsuario/:id_usuario',validaciones.validarToken, UserController.ObtenerAutosFavoritosUsuario);

router.post('/RemoveAutoGarage',  UserController.RemoveAutoGarage);
router.post('/AddAutoGarage',  UserController.AddAutoGarage);
router.post('/InsertaPosibleFinanciamiento',  UserController.InsertaPosibleFinanciamiento);
router.post('/enviarDatosCredito',  UserController.enviarDatosCredito);
router.post('/enviarDatosSeguro',  UserController.enviarDatosSeguro);
router.post('/enviarDatosGarantia',  UserController.enviarDatosGarantia);
router.post('/actualizarUsuario',  UserController.actualizarUsuario);
router.post('/InsertaAccionBitacora',  UserController.InsertaAccionBitacora);

router.get('/ObtenerNotificacionesPerfil/:id_usuario',validaciones.validarToken, UserController.ObtenerNotificacionesPerfil);
router.get('/ObtenerEventosPerfil/:id_usuario',validaciones.validarToken, UserController.ObtenerEventosPerfil);
router.get('/obtenerDireccionesUsuario/:id_usuario',validaciones.validarToken, UserController.obtenerDireccionesUsuario);

router.post('/eliminarDireccion',  UserController.eliminarDireccion);

router.get('/obtenerDireccion/:id_direccion',validaciones.validarToken, UserController.obtenerDireccion);

router.get('/ObtenerNotificaciones/:id_usuario',validaciones.validarToken, UserController.ObtenerNotificaciones);

router.get('/EliminaNotificacion/:ID_NOTIFICACION',validaciones.validarToken, UserController.EliminaNotificacion);


router.get('/ObtenerCitasPerfil/:id_usuario',validaciones.validarToken, UserController.ObtenerCitasPerfil);

router.post('/RegistraUsuarioInvitado',  UserController.RegistraUsuarioInvitado);
router.post('/VerificaUsuarioInvitado', UserController.VerificaUsuarioInvitado);
router.post('/ActivarCuentaInvitado', UserController.ActivarCuentaInvitado);
router.post('/EnviarCorreoActivacion', UserController.EnviarCorreoActivacion);
router.post('/InsertaPosibleFinanciamientoAbierto',  UserController.InsertaPosibleFinanciamientoAbierto);

router.post('/GuardarSolicitudCobroSeguro', SolicitudUsuarioController.guardarSolicitudSeguro);
router.post('/GuardarSolicitudFacturacion', SolicitudUsuarioController.guardarSolicitudFacturacion);
router.post('/InsertaPosibleRevisionLegal', SolicitudUsuarioController.guardarSolicitudRevisionLegal);
router.post('/EnviarDatosRifa', UserController.enviarDatosRifa);







export default router;

