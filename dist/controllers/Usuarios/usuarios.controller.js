"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/config");
const bcrypt = __importStar(require("bcrypt"));
const Genericos_1 = __importDefault(require("../../helpers/Genericos"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enums_1 = require("../../enums/enums");
const c_usuario_1 = __importDefault(require("../../models/c_usuario"));
const Correos_1 = __importDefault(require("../../helpers/Correos"));
const enums_2 = __importDefault(require("../../enums/enums"));
const s_concepto_1 = __importDefault(require("../../models/s_concepto"));
const google_verify_1 = __importDefault(require("../../helpers/google-verify"));
const EditarPerfilEnum_1 = require("../../enums/EditarPerfilEnum");
const k_usuario_direccion_1 = __importDefault(require("../../models/k_usuario_direccion"));
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
const Notifications_1 = __importDefault(require("../../helpers/Notifications"));
class UserController {
}
_a = UserController;
UserController.EnviarCorreoActivacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_EMAIL } = req.body;
        const Usuario = yield c_usuario_1.default.findOne({ where: { DS_EMAIL }, attributes: ['CL_ESTADO', 'ID_USUARIO', 'DS_PASSWORD'] });
        if (!Usuario) {
            return res.status(500).json({
                success: false,
                message: "El usuario no se encuentra registrado.."
            });
        }
        if (Usuario.CL_ESTADO == 1) {
            return res.status(500).json({
                success: false,
                message: "El usuario ya se encuentra activo"
            });
        }
        const token = yield Genericos_1.default.generarJWT(Usuario.ID_USUARIO);
        const urlactivar = config_1.URL_FRONTEND + "activar-usuario/" + token;
        const CorreoUsuario = yield Correos_1.default.EnviarCorreo("Activa tu cuenta", DS_EMAIL, [enums_2.default.EMAIL_ACTIVA_USUARIO, 0, urlactivar, "", ""], config_1.bbc);
        if (!CorreoUsuario) {
            return res.status(500).json({
                success: false,
                message: "El correo no pudo ser enviado, intenta mas tarde"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Correo enviado correctamente."
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ActivarCuentaInvitado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_USUARIO, DS_PASSWORD } = req.body;
        const Usuario = yield c_usuario_1.default.findOne({ where: { ID_USUARIO }, attributes: ['CL_ESTADO', 'ID_USUARIO', 'DS_PASSWORD'] });
        if (!Usuario) {
            return res.status(500).json({
                success: false,
                message: "El usuario no se encuentra registrado"
            });
        }
        let password = bcrypt.hashSync(DS_PASSWORD, 10);
        yield c_usuario_1.default.update({
            CL_ESTADO: 1,
            DS_PASSWORD: password
        }, {
            where: {
                ID_USUARIO,
            }
        });
        return res.status(200).json({
            success: true,
            message: "Usuario activado correctamente."
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.VerificaUsuarioInvitado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.body.token;
        const tokenvalid = yield Genericos_1.default.comprobarJWT(token);
        if (!tokenvalid) {
            return res.status(200).json({
                tokenValid: false
            });
        }
        if (tokenvalid.CL_ESTADO == 1) {
            return res.status(200).json({
                tokenValid: true,
                UsuarioActivo: true
            });
        }
        return res.status(200).json({
            tokenValid: true,
            UsuarioActivo: false,
            id_usuario: tokenvalid.ID_USUARIO
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.eliminarDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield k_usuario_direccion_1.default.destroy({ where: { ID_USUARIO_DIRECCION: req.body.ID_USUARIO_DIRECCION } });
        return res.status(200).json({
            ok: true,
            message: "Eliminado correctamente"
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ObtenerNotificacionesPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ID_USUARIO = req.params.id_usuario;
        //TRAER TODASN LAS NOTIFICACIONES
        let query = 'CALL CA_OBTIENE_NOTIFICACIONES(?)';
        let Respuesta = yield config_1.db.query(query, { replacements: [ID_USUARIO] });
        return res.status(200).json({
            Notificaciones: Respuesta,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ObtenerEventosPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ID_USUARIO = req.params.id_usuario;
        //TRAER TODASN LAS NOTIFICACIONES
        let query = 'CALL CA_OBTIENE_EVENTOS(?)';
        let Respuesta = yield config_1.db.query(query, { replacements: [ID_USUARIO] });
        return res.status(200).json({
            Notificaciones: Respuesta,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.obtenerDireccionesUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_USUARIO = req.params.id_usuario;
        const query = "CALL CA_OBTIENE_DIRECCIONES_USUARIO_CARALIANZ(?)";
        let sql = yield config_1.db.query(query, { replacements: [ID_USUARIO] });
        let DIRECCIONES = sql == undefined ? [] : sql;
        return res.status(200).json({
            DIRECCIONES,
            // menu:MENU.getMenu(USUARIO.DS_ROL)
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.obtenerDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ID_DIRECCION = req.params.id_direccion;
        const query = "CALL CA_OBTIENE_DIRECCION_USUARIO_CARALIANZ(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [ID_DIRECCION] });
        return res.status(200).json(Object.assign({}, Respuesta[0]));
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ObtenerNotificaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ID_USUARIO = req.params.id_usuario;
        let query = 'CALL CA_OBTIENE_NOTIFICACIONES(?)';
        let Respuesta = yield config_1.db.query(query, { replacements: [ID_USUARIO] });
        return res.status(200).json({
            Notificaciones: Respuesta,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ObtenerCitasPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id_usuario = req.params.id_usuario;
        const query = "CALL CA_OBTIENE_CITA_PERFIL(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [id_usuario] });
        return res.status(200).json({
            Citas: Respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ObtenerAutosPerfilUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id_usuario = req.params.id_usuario;
        const query = "CALL CA_OBTIENE_CITA_PERFIL(?)";
        let Respuesta = yield config_1.db.query(query, { replacements: [id_usuario] });
        return res.status(200).json({
            Autos: Respuesta
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.EliminaNotificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ID_NOTIFICACION = req.params.ID_NOTIFICACION;
        let query = 'CALL CA_DESACTIVA_NOTIFICACION(?)';
        let Respuesta = yield config_1.db.query(query, { replacements: [ID_NOTIFICACION] });
        if (Respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(500).json({
                ok: false,
                mssg: Respuesta[0].POUT_DS_RESPUESTA,
            });
        }
        return res.status(200).json({
            message: "Eliminada correctamente"
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opcionEditar = req.body.opcionEditar;
        const body = req.body;
        if (opcionEditar == EditarPerfilEnum_1.EditarPerfilEnum.INFORMACION_USUARIO) {
            const query = 'CALL CA_ACTUALIZA_CAMPOS_USUARIOS_CARALIANZ(?,?,?,?,?,?,?)';
            let replacements = [body.ID_USUARIO, body.NB_USUARIO, body.NB_APELLIDO_PATERNO, body.NB_APELLIDO_MATERNO, body.DS_RFC, body.NO_TELEFONO, body.NO_TELEFONO_OFICINA];
            let respuesta = yield config_1.db.query(query, { replacements });
            if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
                return res.status(500).json({
                    ok: false,
                    mssg: respuesta[0].POUT_DS_RESPUESTA,
                });
            }
            return res.status(200).json({
                ok: true,
                Usuario: respuesta[0],
                message: "Datos actualizados correctamente"
            });
        }
        else if (opcionEditar == EditarPerfilEnum_1.EditarPerfilEnum.DS_PASSWORD_USUARIO) {
            let query = "CALL CA_OBTIENE_PASSWORD_CARALIANZ(?)";
            let respuesta = yield config_1.db.query(query, { replacements: [body.ID_USUARIO] });
            const PASSWORDVALIDA = bcrypt.compareSync(body.DS_PASSWORD_ACTUAL, respuesta[0].DS_PASSWORD);
            if (!PASSWORDVALIDA) {
                return res
                    .status(400)
                    .json({
                    ok: false,
                    mssg: 'La contraseña actual no es correcta'
                });
            }
            query = 'CALL CA_ACTUALIZA_CAMPO_USUARIOS_CARALIANZ(?,?,?)';
            let DS_PASSWORD = bcrypt.hashSync(body.DS_PASSWORD_NUEVA, 10);
            let replacements = [body.ID_USUARIO, 'DS_PASSWORD', DS_PASSWORD];
            respuesta = yield config_1.db.query(query, { replacements });
            if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
                return res.status(500).json({
                    ok: false,
                    mssg: respuesta[0].POUT_DS_RESPUESTA,
                });
            }
            return res.status(200).json({
                ok: true,
                Usuario: respuesta[0],
                message: "Datos actualizados correctamente"
            });
        }
        else if (opcionEditar == EditarPerfilEnum_1.EditarPerfilEnum.DIRECCIONES_USUARIO) {
            let replacements = [body.ID_USUARIO, -1, body.DS_CALLE, body.DS_COLONIA, body.NO_INTERIOR, body.NO_EXTERIOR, Number(body.NO_CP), Number(body.DS_MUNICIPIO), Number(body.DS_ESTADO), body.DS_DESCRIPCION, body.FG_DIRECCION_PRINCIPAL, body.DS_DIRECCION_TIPO];
            const query = "CALL CA_INSERTA_ACTUALIZA_DIRECCION_USUARIO_CARALIANZ(?,?,?,?,?,?,?,?,?,?,?,?)";
            let respuesta = yield config_1.db.query(query, { replacements });
            if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
                return res.status(500).json({
                    message: respuesta[0].POUT_DS_RESPUESTA,
                });
            }
            return res.status(200).json({
                message: respuesta[0].POUT_DS_RESPUESTA,
                Usuario: null
            });
        }
        else if (opcionEditar == EditarPerfilEnum_1.EditarPerfilEnum.EDITAR_DIRECCION) {
            let replacements = [body.ID_USUARIO, body.ID_USUARIO_DIRECCION, body.DS_CALLE, body.DS_COLONIA, body.NO_INTERIOR, body.NO_EXTERIOR, Number(body.NO_CP), Number(body.DS_MUNICIPIO), Number(body.DS_ESTADO), body.DS_DESCRIPCION, body.FG_DIRECCION_PRINCIPAL, body.DS_DIRECCION_TIPO];
            const query = "CALL CA_INSERTA_ACTUALIZA_DIRECCION_USUARIO_CARALIANZ(?,?,?,?,?,?,?,?,?,?,?,?)";
            let respuesta = yield config_1.db.query(query, { replacements });
            if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
                return res.status(500).json({
                    mssg: respuesta[0].POUT_DS_RESPUESTA,
                });
            }
            return res.status(200).json({
                message: "Actualizado correctamente"
            });
        }
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.InsertaAccionBitacora = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { CVE_BOTON } = req.body;
        const query = "CALL  CA_INSERTA_ACCION_BITACORA(?)";
        let replacements = [CVE_BOTON];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA } = respuesta[0];
        return res.status(200).json({
            success: true,
            // message:""
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.enviarDatosSeguro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { ID_MARCA, ID_MODELO, ID_ANIO, NB_USUARIO, CL_EMAIL, CL_TELEFONO } = req.body;
        const query = "CALL  CA_INSERTA_POSIBLE_SEGURO_ABIERTO(?,?,?,?,?,?)";
        let replacements = [ID_MARCA, ID_MODELO, ID_ANIO, NB_USUARIO, CL_EMAIL, CL_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } = respuesta[0];
        const dataCaralianz = [enums_2.default.EMAIL_POSIBLE_SEGURO_CARALIANZ, IDD_SOLICITUD, "", "", ""];
        const dataUsuario = [enums_2.default.EMAIL_POSIBLE_SEGURO_USUARIO, IDD_SOLICITUD, "", "", ""];
        //enviar correo electronico.
        const correoCaralianzEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de seguro", config_1.admin, dataCaralianz, config_1.bbc);
        const correoUsuarioEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de seguro", CL_EMAIL, dataUsuario, config_1.bbc);
        console.log(correoUsuarioEnviado);
        console.log("***********************************");
        /*      if (!correoCaralianzEnviado || !correoUsuarioEnviado) {
                return res.status(500).json({
                    success: false,
                    message: "No fue posible enviar los datos, intente mas tarde"
                })
            }   */
        return res.status(200).json({
            success: true,
            message: POUT_DS_RESPUESTA,
            folio: CL_FOLIO,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.enviarDatosCredito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { ID_MARCA, ID_MODELO, ID_ANIO, NB_NOMBRE, CL_EMAIL, NO_TELEFONO, CL_TIPO } = req.body;
        const query = "CALL CA_INSERTA_LEAD_PORTAL_CREDITO(?,?,?,?,?,?,?)";
        let replacements = [NB_NOMBRE, NO_TELEFONO, CL_EMAIL, ID_MARCA, ID_MODELO, ID_ANIO, CL_TIPO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_ID_CITA, POUT_DS_RESPUESTA, POUT_CL_REFERENCIA } = respuesta[0];
        const Notification = yield Notifications_1.default.SendNotification("SOL_CREDITO", POUT_ID_CITA);
        if (!Notification) {
            return res.status(400).json({
                success: false,
                message: "Ocurrio un problema al enviar las notificaciones"
            });
        }
        return res.status(200).json({
            success: true,
            message: POUT_DS_RESPUESTA,
            referencia: POUT_CL_REFERENCIA,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.enviarDatosGarantia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "CALL  CA_INSERTA_POSIBLE_GARANTIA(?,?,?,?,?,?)";
        let replacements = [req.body.ID_MARCA, req.body.ID_MODELO, req.body.ID_ANIO, req.body.NB_NOMBRE, req.CL_EMAIL, req.CL_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } = respuesta[0];
        console.log(respuesta[0]);
        const dataCaralianz = [enums_2.default.EMAIL_POSIBLE_GARANTIA_CARALIANZ, IDD_SOLICITUD, "", "", ""];
        const dataUsuario = [enums_2.default.EMAIL_POSIBLE_GARANTIA_USUARIO, IDD_SOLICITUD, "", "", ""];
        //enviar correo electronico.
        const correoCaralianzEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de garantía extendida", config_1.admin, dataCaralianz, config_1.bbc);
        const correoUsuarioEnviado = yield Correos_1.default.EnviarCorreo("Solicitud de garantía extendida", req.CL_EMAIL, dataUsuario, config_1.bbc);
        if (!correoCaralianzEnviado || !correoUsuarioEnviado) {
            return res.status(500).json({
                success: false,
                message: "No fue posible enviar los datos, intente mas tarde"
            });
        }
        return res.status(200).json({
            success: true,
            message: POUT_DS_RESPUESTA,
            folio: CL_FOLIO,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.InsertaPosibleFinanciamiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PIN_ID_VEHICULO, PIN_PR_ENGANCHE_MINIMO, PIN_MN_ENGANCHE_MINIMO, PIN_NO_MESES_PLAZO, PIN_MN_MENSUALIDAD_DESEADA, PIN_NB_USUARIO, PIN_CL_CORREO, PIN_NO_TELEFONO, ID_USUARIO } = req.body;
        console.log(req.body);
        const query = "CALL  CA_INSERTA_POSIBLE_FINANCIAMIENTO(?,?,?,?,?,?,?,?,?)";
        let replacements = [PIN_ID_VEHICULO, ID_USUARIO, PIN_PR_ENGANCHE_MINIMO, PIN_MN_ENGANCHE_MINIMO, PIN_NO_MESES_PLAZO, PIN_MN_MENSUALIDAD_DESEADA, PIN_NB_USUARIO, PIN_CL_CORREO, PIN_NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const ID_FINANCIAMIENTO = respuesta[0].POUT_NO_VALOR; //
        const correoEnviadoCaralianz = yield Correos_1.default.EnviarCorreo("Solicitud de financiamiento", config_1.admin, [enums_2.default.EMAIL_POSIBLE_FINANCIAMIENTO_CARALIANZ, ID_FINANCIAMIENTO, "", "", ""], config_1.bbc);
        const correoEnviadoUsuario = yield Correos_1.default.EnviarCorreo("Posible financiamiento", PIN_CL_CORREO, [enums_2.default.EMAIL_POSIBLE_FINANCIAMIENTO_USUARIO, ID_FINANCIAMIENTO, "", "", ""], config_1.bbc);
        if (!correoEnviadoCaralianz || !correoEnviadoUsuario) {
            return res.status(500).json({
                success: false,
                message: "No fue posible enviar los datos, intente mas tarde"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Solicitud enviada correctamente."
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.InsertaPosibleFinanciamientoAbierto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { PIN_ID_MARCA, PIN_ID_MODELO, PIN_ID_ANIO, PIN_NB_USUARIO, PIN_CL_EMAIL, PIN_NO_TELEFONO, PIN_MN_PRECIO_VEHICULO, PIN_PR_ENGANCHE, PIN_MAS_MN_ENGANCHE, PIN_TOTAL_MN_ENGANCHE } = req.body;
        /*         IN PIN_ID_MARCA INT,
                IN PIN_ID_MODELO INT,
                IN PIN_ID_ANIO INT,
                IN PIN_NB_USUARIO VARCHAR(255),
                IN PIN_CL_EMAIL VARCHAR(100),
                IN PIN_NO_TELEFONO VARCHAR(100),
                IN PIN_MN_PRECIO_VEHICULO VARCHAR(100),
                IN PIN_PR_ENGANCHE DECIMAL(12,4),
                IN PIN_MAS_MN_ENGANCHE DECIMAL(12,4),
                IN PIN_TOTAL_MN_ENGANCHE DECIMAL(12,4) */
        const query = "CALL  CA_INSERTA_POSIBLE_FINANCIAMIENTO_ABIERTO(?,?,?,?,?,?,?,?,?,?)";
        let replacements = [
            PIN_ID_MARCA,
            PIN_ID_MODELO,
            PIN_ID_ANIO,
            PIN_NB_USUARIO,
            PIN_CL_EMAIL,
            PIN_NO_TELEFONO,
            PIN_MN_PRECIO_VEHICULO,
            PIN_PR_ENGANCHE,
            PIN_MAS_MN_ENGANCHE,
            PIN_TOTAL_MN_ENGANCHE
        ];
        let respuesta = yield config_1.db.query(query, { replacements });
        const ID_FINANCIAMIENTO = respuesta[0].IDD_SOLICITUD; //
        const correoEnviadoCaralianz = yield Correos_1.default.EnviarCorreo("Solicitud de financiamiento", config_1.admin, [enums_2.default.EMAIL_POSIBLE_FINANCIAMIENTO_ABIERTO_CARALIANZ, ID_FINANCIAMIENTO, "", "", ""], config_1.bbc);
        const correoEnviadoUsuario = yield Correos_1.default.EnviarCorreo("Solicitud de financiamiento", PIN_CL_EMAIL, [enums_2.default.EMAIL_POSIBLE_FINANCIAMIENTO_ABIERTO_USUARIO, ID_FINANCIAMIENTO, "", "", ""], config_1.bbc);
        if (!correoEnviadoCaralianz || !correoEnviadoUsuario) {
            return res.status(500).json({
                success: false,
                message: "No fue posible enviar los datos, intente mas tarde"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Solicitud enviada correctamente."
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.RegistraUsuarioInvitado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_USUARIO, NOMBRE_USUARIO, NO_TELEFONO, DS_EMAIL } = req.body;
        const query = "CALL  CA_INSERTA_USUARIOS_CARALIANZ_INVITADO(?,?,?,?)";
        let replacements = [ID_USUARIO, NOMBRE_USUARIO, NO_TELEFONO, DS_EMAIL];
        let respuesta = yield config_1.db.query(query, { replacements });
        /*     if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
                return res.status(200).json({
                    error: true,
                    message: respuesta[0].POUT_DS_RESPUESTA,
                    id_usuario:respuesta[0].POUT_NO_VALOR_RESPUESTA
                })
            } */
        return res.status(200).json({
            success: true,
            id_usuario: respuesta[0].POUT_NO_VALOR_RESPUESTA
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.RemoveAutoGarage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let ID_USUARIO = body.id_usuario;
        let ID_AUTO = body.id_vehiculo;
        const query = "CALL  CA_ELIMINA_VEHICULO_GARAGE(?,?)";
        let replacements = [ID_USUARIO, ID_AUTO];
        let respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(200).json({
                error: true,
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.AddAutoGarage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let ID_USUARIO = body.id_usuario;
        let ID_AUTO = body.id_vehiculo;
        const query = "CALL  CA_INSERTA_VEHICULO_GARAGE(?,?)";
        let replacements = [ID_USUARIO, ID_AUTO];
        let respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(200).json({
                error: true,
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        return res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.registrarCorreoNewsletter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let DS_EMAIL = req.body.DS_EMAIL;
        const query = "CALL CA_ALTA_NEWSLATTER(?);";
        let respuesta = yield config_1.db.query(query, { replacements: [DS_EMAIL] });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(200).json({
                error: true,
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        return res.status(200).json({
            success: true,
            message: "Correo registrado correctamente!"
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ResetearPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DS_EMAIL = req.body.DS_EMAIL;
        //Buscar que exista ese correo
        //  const usuario:any =   await UsuarioModel.findOne({where: {DS_EMAIL}})
        const PasswordNueva = Genericos_1.default.GenerarPassword();
        const PasswordEncriptada = bcrypt.hashSync(PasswordNueva, 10);
        const query = "CALL CA_RESETEAR_CONTRASENA_CARALIANZ(?,?,?,?)";
        const replacements = [DS_EMAIL, "RFC", PasswordEncriptada, "FISICA"];
        const respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(403).json({
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        //Mandar correo electrónico
        /* const DataCorreo = {
           DS_EMAIL,
           DATA: [TemplateCorreo.EMAIL_RESETEAR_PASSWORD,0,PasswordNueva,"",""],
           SUBJECT: "",
           BBC:"",
           FG_ENVIAR_CORREO:""
        } */
        const data = [enums_2.default.EMAIL_RESETEAR_PASSWORD, 0, PasswordNueva, "", ""];
        //enviar correo electronico.
        const correoEnviado = yield Correos_1.default.EnviarCorreo("Recuperación de contraseña", DS_EMAIL, data, []);
        if (!correoEnviado) {
            return res.status(500).json({
                success: false,
                message: "No fue posible enviar el correo, intenta mas tarde."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Contraseña cambiada correctamente"
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ActualizaCampoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ID_USUARIO, VALOR_ACTUALIZADO, CAMPO_ACTUALIZAR } = req.body;
        const query = "CALL CA_ACTUALIZA_CAMPO_USUARIOS_CARALIANZ(?,?,?)";
        let replacements = [ID_USUARIO, CAMPO_ACTUALIZAR, VALOR_ACTUALIZADO];
        const respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(403).json({
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        return res.status(200).json({
            Usuario: respuesta[0],
            success: true,
            message: "Guardado correctamente"
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.RegistroUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_PASSWORD, NB_NOMBRE, NB_APELLIDO_PATERNO, DS_EMAIL } = req.body;
        //encriptando la contraseña.;
        let passwordencrypt = bcrypt.hashSync(DS_PASSWORD.trim(), 10);
        const FG_MORAL = 0;
        const RAZON_SOCIAL = "";
        const URL_IMG = "";
        const replacements = [FG_MORAL, NB_NOMBRE, NB_APELLIDO_PATERNO, DS_EMAIL, passwordencrypt, URL_IMG, "RFC", RAZON_SOCIAL];
        const query = "CALL CA_INSERTA_USUARIOS_CARALIANZ(?,?,?,?,?,?,?,?)";
        const respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(403).json({
                success: false,
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        const ID_USUARIO_NUEVO = respuesta[0].POUT_NO_VALOR_RESPUESTA;
        let token = jsonwebtoken_1.default.sign({
            ID_USUARIO_NUEVO,
            DS_EMAIL,
        }, process.env.SEED_TOKEN, { expiresIn: '24h' }); //expira en 60 minutos
        const data = [enums_2.default.EMAIL_REGISTRO_ACTIVACION, ID_USUARIO_NUEVO, token, `${config_1.URL_BACKEND}/api/caralianz/Usuarios/ActivaUsuarioCaralianz/${token}`, ''];
        const correoEnviado = yield Correos_1.default.EnviarCorreoActivacion(DS_EMAIL, data, "Bienvenido a caralianz", [], enums_1.SEND_NOTIFICATIONS);
        if (!correoEnviado) {
            return res.status(500).json({
                success: false,
                message: "No fue posible enviar el correo, intenta más tarde."
            });
        }
        return res.status(200).json({
            message: 'Correo enviado correctamente',
            success: true,
            data
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ReenviarCorreoActivacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const correoEnviado = yield Correos_1.default.EnviarCorreoActivacion(req.body.DS_EMAIL, req.body.datos, "Bienvenido a caralianz", [], enums_1.SEND_NOTIFICATIONS);
        if (!correoEnviado) {
            return res.status(500).json({
                success: false,
                message: "No fue posible enviar el correo, intenta más tarde."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Correo enviado correctamente."
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ActivaUsuarioCaralianz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.params.token;
        const query = "CALL CA_ACTIVA_USUARIO_CARALIANZ(?);";
        const tokenvalid = jsonwebtoken_1.default.verify(token, process.env.SEED_TOKEN);
        const { ID_USUARIO_NUEVO, DS_EMAIL } = tokenvalid;
        yield config_1.db.query(query, { replacements: [ID_USUARIO_NUEVO] });
        res.status(200);
        res.redirect(config_1.URL_FRONTEND + "activacion/correcta");
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ObtenerAutosFavoritosUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ID_USUARIO = req.params.id_usuario;
        if (ID_USUARIO == "-1" || !ID_USUARIO || ID_USUARIO == "0") {
            return res.status(200).json({
                success: true,
                AutosFavoritos: []
            });
        }
        const query = "CALL CA_OBTIENE_ID_VEHICULOS_GARAGE(?)";
        const AutosFavoritos = yield config_1.db.query(query, { replacements: [ID_USUARIO] });
        return res.status(200).json({
            success: true,
            AutosFavoritos
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_EMAIL, DS_PASSWORD, DS_TIPO } = req.body;
        const query = "CALL CA_OBTIENE_LOGIN_USUARIO_CARALIANZ(?,?,?)";
        const replacements = [DS_EMAIL, DS_PASSWORD, DS_TIPO];
        const respuesta = yield config_1.db.query(query, { replacements });
        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
            return res.status(500).json({
                ok: false,
                message: respuesta[0].POUT_DS_RESPUESTA
            });
        }
        const PASSWORDVALIDA = bcrypt.compareSync(DS_PASSWORD, respuesta[0].DS_PASSWORD);
        if (!PASSWORDVALIDA) {
            return res.status(401).json({
                ok: false,
                message: 'Credenciales inválidas'
            });
        }
        const id_usuario = respuesta[0].ID_USUARIO;
        const TOKEN = yield Genericos_1.default.generarJWT(id_usuario);
        return res.status(200).json({
            ok: true,
            TOKEN,
            message: 'Inicio de sesión correcto',
            USUARIO: respuesta[0]
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.enviarFormularioAyuda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_NOMBRE, DS_EMAIL, NO_TELEFONO, DS_MENSAJE } = req.body;
        const query = "CALL CA_INSERTA_CONTACTANOS(?,?,?,?)";
        const replacements = [DS_NOMBRE, DS_EMAIL, NO_TELEFONO, DS_MENSAJE];
        const respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, IDD_SOLICITUD } = respuesta[0];
        const Notification = yield Notifications_1.default.SendNotification("FRM_AYUDA", IDD_SOLICITUD);
        if (!Notification) {
            return res.status(400).json({
                success: false,
                message: "Ocurrio un problema al enviar las notificaciones"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Correo enviado correctamente"
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.enviarFormularioContacto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { DS_NOMBRE, DS_EMAIL, NO_TELEFONO, DS_MENSAJE } = req.body;
        const query = "CALL CA_INSERTA_CONTACTANOS(?,?,?,?)";
        const replacements = [DS_NOMBRE, DS_EMAIL, NO_TELEFONO, DS_MENSAJE];
        const respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, IDD_SOLICITUD } = respuesta[0];
        console.log(IDD_SOLICITUD);
        const Notification = yield Notifications_1.default.SendNotification("FRM_CONTACTO", IDD_SOLICITUD);
        if (!Notification) {
            return res.status(400).json({
                success: false,
                message: "Ocurrio un problema al enviar las notificaciones"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Correo enviado correctamente"
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario } = req.id_usuario;
        const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
        let respuesta = yield config_1.db.query(query, { replacements: [id_usuario] });
        const usuario = respuesta[0];
        //SE GENERA NUEVAMENTE PARA DAR NUEVA VIGENCIA PERO NOSOTROS PODEMOS SIMPLEMENTE DEJAR EL MISMO
        const token = yield Genericos_1.default.generarJWT(id_usuario);
        const ConceptoCarinspector = yield s_concepto_1.default.findOne({ where: { CL_CONCEPTO: 1 } });
        return res.status(200).json({
            success: true,
            token,
            usuario,
            PrecioCarinspector: ConceptoCarinspector.MN_CONCEPTO
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.prueba = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({
            success: true,
            message: "vine"
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.ObtenerUsuarioLogueado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        const tokenvalid = jsonwebtoken_1.default.verify(token, process.env.SEED_TOKEN);
        const { id_usuario } = tokenvalid;
        const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
        const respuesta = yield config_1.db.query(query, { replacements: [id_usuario] });
        const ConceptoCarinspector = yield s_concepto_1.default.findOne({ where: { CL_CONCEPTO: 1 } });
        return res.status(200).json({
            success: true,
            Usuario: respuesta[0],
            PrecioCarinspector: ConceptoCarinspector.MN_CONCEPTO
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.enviarDatosRifa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { CL_PROMOCION, NB_USUARIO, DS_CORREO, NO_TELEFONO } = req.body;
        const query = "CALL CA_REGISTRA_RIFA(?,?,?,?)";
        let replacements = [CL_PROMOCION, NB_USUARIO, DS_CORREO, NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, ID_RIFA } = respuesta[0];
        const Notification = yield Notifications_1.default.SendNotification("REG_RIFA", ID_RIFA);
        if (POUT_CL_RESPUESTA != -1000) {
            return res.status(400).json({
                success: false,
                message: POUT_DS_RESPUESTA
            });
        }
        else {
            if (!Notification) {
                return res.status(400).json({
                    success: false,
                    message: "Ocurrio un problema al enviar las notificaciones"
                });
            }
        }
        return res.status(200).json({
            success: true,
            message: POUT_DS_RESPUESTA,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.enviarDatosRifaDoble = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { CL_PROMOCION, NB_USUARIO, DS_CORREO, NO_TELEFONO } = req.body;
        const query = "CALL CA_REGISTRA_RIFA_SHARE(?,?,?,?)";
        let replacements = [CL_PROMOCION, NB_USUARIO, DS_CORREO, NO_TELEFONO];
        let respuesta = yield config_1.db.query(query, { replacements });
        const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, ID_RIFA } = respuesta[0];
        const Notification = yield Notifications_1.default.SendNotification("REG_RIFA_SHARE", ID_RIFA);
        if (POUT_CL_RESPUESTA != -1000) {
            return res.status(400).json({
                success: false,
                message: POUT_DS_RESPUESTA
            });
        }
        else {
            if (!Notification) {
                return res.status(400).json({
                    success: false,
                    message: "Ocurrio un problema al enviar las notificaciones"
                });
            }
        }
        return res.status(200).json({
            success: true,
            message: POUT_DS_RESPUESTA,
        });
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
UserController.loginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_token } = req.body;
        const googleUser = yield google_verify_1.default.ObtenerInfoGoogle(id_token);
        //VALIDAR QUE EXISTA EL USUARIO
        const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_EMAIL(?)";
        let respuesta = yield config_1.db.query(query, { replacements: [googleUser.email] });
        let USUARIO = respuesta[0];
        if (!USUARIO) {
            //REGISTRA USUARIO
            const query = "CALL CA_INSERTA_USUARIOS_CARALIANZ_GOOGLE(?,?,?,?)";
            const replacements = [googleUser.email, googleUser.picture, googleUser.name, 'usergoogle'];
            let respuesta = yield config_1.db.query(query, { replacements });
            let USUARIO = respuesta[0].POUT_NO_VALOR_RESPUESTA;
            const TOKEN = yield Genericos_1.default.generarJWT(USUARIO);
            return res.status(200).json({
                ok: true,
                TOKEN,
                message: 'Inició sesión correctamente',
            });
        }
        else {
            //SI EXISTE INGRESA CORRECTAMENTE
            const TOKEN = yield Genericos_1.default.generarJWT(USUARIO.ID_USUARIO);
            return res.status(200).json({
                ok: true,
                TOKEN,
                message: 'Inició sesión correctamente',
                USUARIO: USUARIO
            });
        }
    }
    catch (error) {
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
    //Sitio 2023
});
exports.default = UserController;
//# sourceMappingURL=usuarios.controller.js.map