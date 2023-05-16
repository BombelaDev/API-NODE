import { Request, Response } from "express";
import {
  db,
  NB_BUCKET,
  bbc,
  URL_BACKEND,
  URL_FRONTEND,
  admin,
} from "../../config/config";
import * as bcrypt from "bcrypt";
import Genericos from "../../helpers/Genericos";
import jwt from "jsonwebtoken";
import { SEND_NOTIFICATIONS } from "../../enums/enums";
import UsuarioModel from "../../models/c_usuario";
import Correo from "../../helpers/Correos";
import TemplateCorreo from "../../enums/enums";
import ConceptoModel from "../../models/s_concepto";
import GoogleVerify from "../../helpers/google-verify";
import { EditarPerfilEnum } from "../../enums/EditarPerfilEnum";
import kUsuarioDireccionModel from "../../models/k_usuario_direccion";
import ErrorClass from "../../helpers/ErrorsValidate";
import Notifications from "../../helpers/Notifications";

class UserController {
  static EnviarCorreoActivacion = async (req: Request, res: Response) => {
    try {
      const { DS_EMAIL } = req.body;

      const Usuario: any = await UsuarioModel.findOne({
        where: { DS_EMAIL },
        attributes: ["CL_ESTADO", "ID_USUARIO", "DS_PASSWORD"],
      });

      if (!Usuario) {
        return res.status(500).json({
          success: false,
          message: "El usuario no se encuentra registrado..",
        });
      }
      if (Usuario.CL_ESTADO == 1) {
        return res.status(500).json({
          success: false,
          message: "El usuario ya se encuentra activo",
        });
      }

      const token = await Genericos.generarJWT(Usuario.ID_USUARIO);
      const urlactivar = URL_FRONTEND + "activar-usuario/" + token;
      const CorreoUsuario = await Correo.EnviarCorreo(
        "Activa tu cuenta",
        DS_EMAIL,
        [TemplateCorreo.EMAIL_ACTIVA_USUARIO, 0, urlactivar, "", ""],
        bbc
      );
      if (!CorreoUsuario) {
        return res.status(500).json({
          success: false,
          message: "El correo no pudo ser enviado, intenta mas tarde",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Correo enviado correctamente.",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ActivarCuentaInvitado = async (req: Request, res: Response) => {
    try {
      const { ID_USUARIO, DS_PASSWORD } = req.body;

      const Usuario: any = await UsuarioModel.findOne({
        where: { ID_USUARIO },
        attributes: ["CL_ESTADO", "ID_USUARIO", "DS_PASSWORD"],
      });

      if (!Usuario) {
        return res.status(500).json({
          success: false,
          message: "El usuario no se encuentra registrado",
        });
      }

      let password = bcrypt.hashSync(DS_PASSWORD, 10);

      await UsuarioModel.update(
        {
          CL_ESTADO: 1,
          DS_PASSWORD: password,
        },
        {
          where: {
            ID_USUARIO,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "Usuario activado correctamente.",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static VerificaUsuarioInvitado = async (req: Request, res: Response) => {
    try {
      let token = req.body.token;

      const tokenvalid: any = await Genericos.comprobarJWT(token);

      if (!tokenvalid) {
        return res.status(200).json({
          tokenValid: false,
        });
      }

      if (tokenvalid.CL_ESTADO == 1) {
        return res.status(200).json({
          tokenValid: true,
          UsuarioActivo: true,
        });
      }

      return res.status(200).json({
        tokenValid: true,
        UsuarioActivo: false,
        id_usuario: tokenvalid.ID_USUARIO,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static eliminarDireccion = async (req: Request, res: Response) => {
    try {
      await kUsuarioDireccionModel.destroy({
        where: { ID_USUARIO_DIRECCION: req.body.ID_USUARIO_DIRECCION },
      });
      return res.status(200).json({
        ok: true,
        message: "Eliminado correctamente",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerNotificacionesPerfil = async (req: Request, res: Response) => {
    try {
      let ID_USUARIO = req.params.id_usuario;
      //TRAER TODASN LAS NOTIFICACIONES
      let query = "CALL CA_OBTIENE_NOTIFICACIONES(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [ID_USUARIO],
      });

      return res.status(200).json({
        Notificaciones: Respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerEventosPerfil = async (req: Request, res: Response) => {
    try {
      let ID_USUARIO = req.params.id_usuario;
      //TRAER TODASN LAS NOTIFICACIONES
      let query = "CALL CA_OBTIENE_EVENTOS(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [ID_USUARIO],
      });

      return res.status(200).json({
        Notificaciones: Respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static obtenerDireccionesUsuario = async (req: Request, res: Response) => {
    try {
      const ID_USUARIO = req.params.id_usuario;
      const query = "CALL CA_OBTIENE_DIRECCIONES_USUARIO_CARALIANZ(?)";

      let sql: any = await db.query(query, { replacements: [ID_USUARIO] });
      let DIRECCIONES = sql == undefined ? [] : sql;

      return res.status(200).json({
        DIRECCIONES,

        // menu:MENU.getMenu(USUARIO.DS_ROL)
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static obtenerDireccion = async (req: Request, res: Response) => {
    try {
      let ID_DIRECCION = req.params.id_direccion;

      const query = "CALL CA_OBTIENE_DIRECCION_USUARIO_CARALIANZ(?)";

      let Respuesta: any = await db.query(query, {
        replacements: [ID_DIRECCION],
      });

      return res.status(200).json({
        ...Respuesta[0],
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerNotificaciones = async (req: Request, res: Response) => {
    try {
      let ID_USUARIO = req.params.id_usuario;
      let query = "CALL CA_OBTIENE_NOTIFICACIONES(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [ID_USUARIO],
      });

      return res.status(200).json({
        Notificaciones: Respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerCitasPerfil = async (req: Request, res: Response) => {
    try {
      let id_usuario = req.params.id_usuario;
      const query = "CALL CA_OBTIENE_CITA_PERFIL(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [id_usuario],
      });

      return res.status(200).json({
        Citas: Respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
  static ObtenerAutosPerfilUsuario = async (req: Request, res: Response) => {
    try {
      let id_usuario = req.params.id_usuario;
      const query = "CALL CA_OBTIENE_CITA_PERFIL(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [id_usuario],
      });

      return res.status(200).json({
        Autos: Respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static EliminaNotificacion = async (req: Request, res: Response) => {
    try {
      let ID_NOTIFICACION = req.params.ID_NOTIFICACION;
      let query = "CALL CA_DESACTIVA_NOTIFICACION(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [ID_NOTIFICACION],
      });

      if (Respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(500).json({
          ok: false,
          mssg: Respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      return res.status(200).json({
        message: "Eliminada correctamente",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static actualizarUsuario = async (req: Request, res: Response) => {
    try {
      const opcionEditar = req.body.opcionEditar;
      const body = req.body;

      if (opcionEditar == EditarPerfilEnum.INFORMACION_USUARIO) {
        const query =
          "CALL CA_ACTUALIZA_CAMPOS_USUARIOS_CARALIANZ(?,?,?,?,?,?,?)";
        let replacements = [
          body.ID_USUARIO,
          body.NB_USUARIO,
          body.NB_APELLIDO_PATERNO,
          body.NB_APELLIDO_MATERNO,
          body.DS_RFC,
          body.NO_TELEFONO,
          body.NO_TELEFONO_OFICINA,
        ];

        let respuesta: any = await db.query(query, { replacements });

        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
          return res.status(500).json({
            ok: false,
            mssg: respuesta[0].POUT_DS_RESPUESTA,
          });
        }

        return res.status(200).json({
          ok: true,
          Usuario: respuesta[0],
          message: "Datos actualizados correctamente",
        });
      } else if (opcionEditar == EditarPerfilEnum.DS_PASSWORD_USUARIO) {
        let query = "CALL CA_OBTIENE_PASSWORD_CARALIANZ(?)";
        let respuesta: any = await db.query(query, {
          replacements: [body.ID_USUARIO],
        });
        const PASSWORDVALIDA = bcrypt.compareSync(
          body.DS_PASSWORD_ACTUAL,
          respuesta[0].DS_PASSWORD
        );
        if (!PASSWORDVALIDA) {
          return res.status(400).json({
            ok: false,
            mssg: "La contraseña actual no es correcta",
          });
        }

        query = "CALL CA_ACTUALIZA_CAMPO_USUARIOS_CARALIANZ(?,?,?)";
        let DS_PASSWORD = bcrypt.hashSync(body.DS_PASSWORD_NUEVA, 10);
        let replacements = [body.ID_USUARIO, "DS_PASSWORD", DS_PASSWORD];

        respuesta = await db.query(query, { replacements });

        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
          return res.status(500).json({
            ok: false,
            mssg: respuesta[0].POUT_DS_RESPUESTA,
          });
        }

        return res.status(200).json({
          ok: true,
          Usuario: respuesta[0],
          message: "Datos actualizados correctamente",
        });
      } else if (opcionEditar == EditarPerfilEnum.DIRECCIONES_USUARIO) {
        let replacements = [
          body.ID_USUARIO,
          -1,
          body.DS_CALLE,
          body.DS_COLONIA,
          body.NO_INTERIOR,
          body.NO_EXTERIOR,
          Number(body.NO_CP),
          Number(body.DS_MUNICIPIO),
          Number(body.DS_ESTADO),
          body.DS_DESCRIPCION,
          body.FG_DIRECCION_PRINCIPAL,
          body.DS_DIRECCION_TIPO,
        ];

        const query =
          "CALL CA_INSERTA_ACTUALIZA_DIRECCION_USUARIO_CARALIANZ(?,?,?,?,?,?,?,?,?,?,?,?)";

        let respuesta: any = await db.query(query, { replacements });

        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
          return res.status(500).json({
            message: respuesta[0].POUT_DS_RESPUESTA,
          });
        }

        return res.status(200).json({
          message: respuesta[0].POUT_DS_RESPUESTA,
          Usuario: null,
        });
      } else if (opcionEditar == EditarPerfilEnum.EDITAR_DIRECCION) {
        let replacements = [
          body.ID_USUARIO,
          body.ID_USUARIO_DIRECCION,
          body.DS_CALLE,
          body.DS_COLONIA,
          body.NO_INTERIOR,
          body.NO_EXTERIOR,
          Number(body.NO_CP),
          Number(body.DS_MUNICIPIO),
          Number(body.DS_ESTADO),
          body.DS_DESCRIPCION,
          body.FG_DIRECCION_PRINCIPAL,
          body.DS_DIRECCION_TIPO,
        ];
        const query =
          "CALL CA_INSERTA_ACTUALIZA_DIRECCION_USUARIO_CARALIANZ(?,?,?,?,?,?,?,?,?,?,?,?)";
        let respuesta: any = await db.query(query, { replacements });

        if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
          return res.status(500).json({
            mssg: respuesta[0].POUT_DS_RESPUESTA,
          });
        }

        return res.status(200).json({
          message: "Actualizado correctamente",
        });
      }
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaAccionBitacora = async (req: Request, res: Response) => {
    try {
      const { CVE_BOTON } = req.body;

      const query = "CALL  CA_INSERTA_ACCION_BITACORA(?)";

      let replacements = [CVE_BOTON];
      let respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA } = respuesta[0];

      return res.status(200).json({
        success: true,
        // message:""
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static enviarDatosSeguro = async (req: Request, res: Response) => {
    try {
      let { ID_MARCA, ID_MODELO, ID_ANIO, NB_USUARIO, CL_EMAIL, CL_TELEFONO } =
        req.body;

      const query = "CALL  CA_INSERTA_POSIBLE_SEGURO_ABIERTO(?,?,?,?,?,?)";

      let replacements = [
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        NB_USUARIO,
        CL_EMAIL,
        CL_TELEFONO,
      ];
      let respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } =
        respuesta[0];

      const dataCaralianz = [
        TemplateCorreo.EMAIL_POSIBLE_SEGURO_CARALIANZ,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const dataUsuario = [
        TemplateCorreo.EMAIL_POSIBLE_SEGURO_USUARIO,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];

      //enviar correo electronico.
      const correoCaralianzEnviado = await Correo.EnviarCorreo(
        "Solicitud de seguro",
        admin,
        dataCaralianz,
        bbc
      );
      const correoUsuarioEnviado = await Correo.EnviarCorreo(
        "Solicitud de seguro",
        CL_EMAIL,
        dataUsuario,
        bbc
      );
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
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static enviarDatosCredito = async (req: Request, res: Response) => {
    try {
      let {
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        NB_NOMBRE,
        CL_EMAIL,
        NO_TELEFONO,
        CL_TIPO,
      } = req.body;

      const query = "CALL CA_INSERTA_LEAD_PORTAL_CREDITO(?,?,?,?,?,?,?)";

      let replacements = [
        NB_NOMBRE,
        NO_TELEFONO,
        CL_EMAIL,
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        CL_TIPO,
      ];
      let respuesta: any = await db.query(query, { replacements });
      const { POUT_ID_CITA, POUT_DS_RESPUESTA, POUT_CL_REFERENCIA } =
        respuesta[0];

      const Notification = await Notifications.SendNotification(
        "SOL_CREDITO",
        POUT_ID_CITA
      );

      if (!Notification) {
        return res.status(400).json({
          success: false,
          message: "Ocurrio un problema al enviar las notificaciones",
        });
      }

      return res.status(200).json({
        success: true,
        message: POUT_DS_RESPUESTA,
        referencia: POUT_CL_REFERENCIA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static enviarDatosGarantia = async (req: any, res: Response) => {
    try {
      const query = "CALL  CA_INSERTA_POSIBLE_GARANTIA(?,?,?,?,?,?)";

      let replacements = [
        req.body.ID_MARCA,
        req.body.ID_MODELO,
        req.body.ID_ANIO,
        req.body.NB_NOMBRE,
        req.CL_EMAIL,
        req.CL_TELEFONO,
      ];
      let respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, CL_FOLIO, IDD_SOLICITUD } =
        respuesta[0];

      console.log(respuesta[0]);

      const dataCaralianz = [
        TemplateCorreo.EMAIL_POSIBLE_GARANTIA_CARALIANZ,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];
      const dataUsuario = [
        TemplateCorreo.EMAIL_POSIBLE_GARANTIA_USUARIO,
        IDD_SOLICITUD,
        "",
        "",
        "",
      ];

      //enviar correo electronico.
      const correoCaralianzEnviado = await Correo.EnviarCorreo(
        "Solicitud de garantía extendida",
        admin,
        dataCaralianz,
        bbc
      );
      const correoUsuarioEnviado = await Correo.EnviarCorreo(
        "Solicitud de garantía extendida",
        req.CL_EMAIL,
        dataUsuario,
        bbc
      );

      if (!correoCaralianzEnviado || !correoUsuarioEnviado) {
        return res.status(500).json({
          success: false,
          message: "No fue posible enviar los datos, intente mas tarde",
        });
      }

      return res.status(200).json({
        success: true,
        message: POUT_DS_RESPUESTA,
        folio: CL_FOLIO,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaPosibleFinanciamiento = async (req: Request, res: Response) => {
    try {
      const {
        PIN_ID_VEHICULO,
        PIN_PR_ENGANCHE_MINIMO,
        PIN_MN_ENGANCHE_MINIMO,
        PIN_NO_MESES_PLAZO,
        PIN_MN_MENSUALIDAD_DESEADA,
        PIN_NB_USUARIO,
        PIN_CL_CORREO,
        PIN_NO_TELEFONO,
        ID_USUARIO,
      } = req.body;
      console.log(req.body);

      const query =
        "CALL  CA_INSERTA_POSIBLE_FINANCIAMIENTO(?,?,?,?,?,?,?,?,?)";

      let replacements = [
        PIN_ID_VEHICULO,
        ID_USUARIO,
        PIN_PR_ENGANCHE_MINIMO,
        PIN_MN_ENGANCHE_MINIMO,
        PIN_NO_MESES_PLAZO,
        PIN_MN_MENSUALIDAD_DESEADA,
        PIN_NB_USUARIO,
        PIN_CL_CORREO,
        PIN_NO_TELEFONO,
      ];
      let respuesta: any = await db.query(query, { replacements });

      const ID_FINANCIAMIENTO = respuesta[0].POUT_NO_VALOR; //

      const correoEnviadoCaralianz = await Correo.EnviarCorreo(
        "Solicitud de financiamiento",
        admin,
        [
          TemplateCorreo.EMAIL_POSIBLE_FINANCIAMIENTO_CARALIANZ,
          ID_FINANCIAMIENTO,
          "",
          "",
          "",
        ],
        bbc
      );

      const correoEnviadoUsuario = await Correo.EnviarCorreo(
        "Posible financiamiento",
        PIN_CL_CORREO,
        [
          TemplateCorreo.EMAIL_POSIBLE_FINANCIAMIENTO_USUARIO,
          ID_FINANCIAMIENTO,
          "",
          "",
          "",
        ],
        bbc
      );

      if (!correoEnviadoCaralianz || !correoEnviadoUsuario) {
        return res.status(500).json({
          success: false,
          message: "No fue posible enviar los datos, intente mas tarde",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Solicitud enviada correctamente.",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static InsertaPosibleFinanciamientoAbierto = async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        PIN_ID_MARCA,
        PIN_ID_MODELO,
        PIN_ID_ANIO,
        PIN_NB_USUARIO,
        PIN_CL_EMAIL,
        PIN_NO_TELEFONO,
        PIN_MN_PRECIO_VEHICULO,
        PIN_PR_ENGANCHE,
        PIN_MAS_MN_ENGANCHE,
        PIN_TOTAL_MN_ENGANCHE,
      } = req.body;

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
      const query =
        "CALL  CA_INSERTA_POSIBLE_FINANCIAMIENTO_ABIERTO(?,?,?,?,?,?,?,?,?,?)";

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
        PIN_TOTAL_MN_ENGANCHE,
      ];

      let respuesta: any = await db.query(query, { replacements });

      const ID_FINANCIAMIENTO = respuesta[0].IDD_SOLICITUD; //

      const correoEnviadoCaralianz = await Correo.EnviarCorreo(
        "Solicitud de financiamiento",
        admin,
        [
          TemplateCorreo.EMAIL_POSIBLE_FINANCIAMIENTO_ABIERTO_CARALIANZ,
          ID_FINANCIAMIENTO,
          "",
          "",
          "",
        ],
        bbc
      );

      const correoEnviadoUsuario = await Correo.EnviarCorreo(
        "Solicitud de financiamiento",
        PIN_CL_EMAIL,
        [
          TemplateCorreo.EMAIL_POSIBLE_FINANCIAMIENTO_ABIERTO_USUARIO,
          ID_FINANCIAMIENTO,
          "",
          "",
          "",
        ],
        bbc
      );

      if (!correoEnviadoCaralianz || !correoEnviadoUsuario) {
        return res.status(500).json({
          success: false,
          message: "No fue posible enviar los datos, intente mas tarde",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Solicitud enviada correctamente.",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static RegistraUsuarioInvitado = async (req: Request, res: Response) => {
    try {
      const { ID_USUARIO, NOMBRE_USUARIO, NO_TELEFONO, DS_EMAIL } = req.body;

      const query = "CALL  CA_INSERTA_USUARIOS_CARALIANZ_INVITADO(?,?,?,?)";

      let replacements = [ID_USUARIO, NOMBRE_USUARIO, NO_TELEFONO, DS_EMAIL];

      let respuesta: any = await db.query(query, { replacements });

      /*     if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
                return res.status(200).json({
                    error: true,
                    message: respuesta[0].POUT_DS_RESPUESTA,
                    id_usuario:respuesta[0].POUT_NO_VALOR_RESPUESTA
                })
            } */

      return res.status(200).json({
        success: true,
        id_usuario: respuesta[0].POUT_NO_VALOR_RESPUESTA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static RemoveAutoGarage = async (req: Request, res: Response) => {
    try {
      let body = req.body;
      let ID_USUARIO = body.id_usuario;
      let ID_AUTO = body.id_vehiculo;

      const query = "CALL  CA_ELIMINA_VEHICULO_GARAGE(?,?)";

      let replacements = [ID_USUARIO, ID_AUTO];

      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(200).json({
          error: true,
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static AddAutoGarage = async (req: Request, res: Response) => {
    try {
      let body = req.body;
      let ID_USUARIO = body.id_usuario;
      let ID_AUTO = body.id_vehiculo;

      const query = "CALL  CA_INSERTA_VEHICULO_GARAGE(?,?)";

      let replacements = [ID_USUARIO, ID_AUTO];

      let respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(200).json({
          error: true,
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static registrarCorreoNewsletter = async (req: Request, res: Response) => {
    try {
      let DS_EMAIL = req.body.DS_EMAIL;
      const query = "CALL CA_ALTA_NEWSLATTER(?);";

      let respuesta: any = await db.query(query, { replacements: [DS_EMAIL] });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(200).json({
          error: true,
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Correo registrado correctamente!",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ResetearPassword = async (req: Request, res: Response) => {
    try {
      const DS_EMAIL = req.body.DS_EMAIL;
      //Buscar que exista ese correo
      //  const usuario:any =   await UsuarioModel.findOne({where: {DS_EMAIL}})

      const PasswordNueva = Genericos.GenerarPassword();
      const PasswordEncriptada = bcrypt.hashSync(PasswordNueva, 10);

      const query = "CALL CA_RESETEAR_CONTRASENA_CARALIANZ(?,?,?,?)";

      const replacements = [DS_EMAIL, "RFC", PasswordEncriptada, "FISICA"];

      const respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(403).json({
          message: respuesta[0].POUT_DS_RESPUESTA,
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

      const data = [
        TemplateCorreo.EMAIL_RESETEAR_PASSWORD,
        0,
        PasswordNueva,
        "",
        "",
      ];

      //enviar correo electronico.
      const correoEnviado = await Correo.EnviarCorreo(
        "Recuperación de contraseña",
        DS_EMAIL,
        data,
        []
      );

      if (!correoEnviado) {
        return res.status(500).json({
          success: false,
          message: "No fue posible enviar el correo, intenta mas tarde.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Contraseña cambiada correctamente",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ActualizaCampoUsuario = async (req: Request, res: Response) => {
    try {
      const { ID_USUARIO, VALOR_ACTUALIZADO, CAMPO_ACTUALIZAR } = req.body;

      const query = "CALL CA_ACTUALIZA_CAMPO_USUARIOS_CARALIANZ(?,?,?)";
      let replacements = [ID_USUARIO, CAMPO_ACTUALIZAR, VALOR_ACTUALIZADO];

      const respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(403).json({
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      return res.status(200).json({
        Usuario: respuesta[0],
        success: true,
        message: "Guardado correctamente",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static RegistroUsuario = async (req: Request, res: Response) => {
    try {
      const { DS_PASSWORD, NB_NOMBRE, NB_APELLIDO_PATERNO, DS_EMAIL } =
        req.body;

      //encriptando la contraseña.;
      let passwordencrypt = bcrypt.hashSync(DS_PASSWORD.trim(), 10);

      const FG_MORAL = 0;
      const RAZON_SOCIAL = "";
      const URL_IMG = "";

      const replacements = [
        FG_MORAL,
        NB_NOMBRE,
        NB_APELLIDO_PATERNO,
        DS_EMAIL,
        passwordencrypt,
        URL_IMG,
        "RFC",
        RAZON_SOCIAL,
      ];
      const query = "CALL CA_INSERTA_USUARIOS_CARALIANZ(?,?,?,?,?,?,?,?)";
      const respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(403).json({
          success: false,
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }

      const ID_USUARIO_NUEVO = respuesta[0].POUT_NO_VALOR_RESPUESTA;

      let token = jwt.sign(
        {
          ID_USUARIO_NUEVO,
          DS_EMAIL,
        },
        process.env.SEED_TOKEN,
        { expiresIn: "24h" }
      ); //expira en 60 minutos

      const data = [
        TemplateCorreo.EMAIL_REGISTRO_ACTIVACION,
        ID_USUARIO_NUEVO,
        token,
        `${URL_BACKEND}/api/caralianz/Usuarios/ActivaUsuarioCaralianz/${token}`,
        "",
      ];

      const correoEnviado = await Correo.EnviarCorreoActivacion(
        DS_EMAIL,
        data,
        "Bienvenido a caralianz",
        [],
        SEND_NOTIFICATIONS
      );

      if (!correoEnviado) {
        return res.status(500).json({
          success: false,
          message: "No fue posible enviar el correo, intenta más tarde.",
        });
      }

      return res.status(200).json({
        message: "Correo enviado correctamente",
        success: true,
        data,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ReenviarCorreoActivacion = async (req: Request, res: Response) => {
    try {
      const correoEnviado = await Correo.EnviarCorreoActivacion(
        req.body.DS_EMAIL,
        req.body.datos,
        "Bienvenido a caralianz",
        [],
        SEND_NOTIFICATIONS
      );

      if (!correoEnviado) {
        return res.status(500).json({
          success: false,
          message: "No fue posible enviar el correo, intenta más tarde.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Correo enviado correctamente.",
      });
    } catch (error: any) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ActivaUsuarioCaralianz = async (req: Request, res: Response) => {
    try {
      let token = req.params.token;

      const query = "CALL CA_ACTIVA_USUARIO_CARALIANZ(?);";
      const tokenvalid: any = jwt.verify(token, process.env.SEED_TOKEN);
      const { ID_USUARIO_NUEVO, DS_EMAIL } = tokenvalid;

      await db.query(query, { replacements: [ID_USUARIO_NUEVO] });

      res.status(200);
      res.redirect(URL_FRONTEND + "activacion/correcta");
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAutosFavoritosUsuario = async (req: Request, res: Response) => {
    try {
      const ID_USUARIO = req.params.id_usuario;
      if (ID_USUARIO == "-1" || !ID_USUARIO || ID_USUARIO == "0") {
        return res.status(200).json({
          success: true,
          AutosFavoritos: [],
        });
      }
      const query = "CALL CA_OBTIENE_ID_VEHICULOS_GARAGE(?)";
      const AutosFavoritos = await db.query(query, {
        replacements: [ID_USUARIO],
      });

      return res.status(200).json({
        success: true,
        AutosFavoritos,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { DS_EMAIL, DS_PASSWORD, DS_TIPO } = req.body;
      const query = "CALL CA_OBTIENE_LOGIN_USUARIO_CARALIANZ(?,?,?)";
      const replacements = [DS_EMAIL, DS_PASSWORD, DS_TIPO];
      const respuesta: any = await db.query(query, { replacements });

      if (respuesta[0].POUT_CL_RESPUESTA != -1000) {
        return res.status(500).json({
          ok: false,
          message: respuesta[0].POUT_DS_RESPUESTA,
        });
      }
      const PASSWORDVALIDA = bcrypt.compareSync(
        DS_PASSWORD,
        respuesta[0].DS_PASSWORD
      );
      if (!PASSWORDVALIDA) {
        return res.status(401).json({
          ok: false,
          message: "Credenciales inválidas",
        });
      }

      const id_usuario = respuesta[0].ID_USUARIO;
      const TOKEN = await Genericos.generarJWT(id_usuario);

      return res.status(200).json({
        ok: true,
        TOKEN,
        message: "Inicio de sesión correcto",
        USUARIO: respuesta[0],
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static enviarFormularioAyuda = async (req: Request, res: Response) => {
    try {
      const { DS_NOMBRE, DS_EMAIL, NO_TELEFONO, DS_MENSAJE } = req.body;

      const query = "CALL CA_INSERTA_CONTACTANOS(?,?,?,?)";
      const replacements = [DS_NOMBRE, DS_EMAIL, NO_TELEFONO, DS_MENSAJE];
      const respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, IDD_SOLICITUD } =
        respuesta[0];

      const Notification = await Notifications.SendNotification(
        "FRM_AYUDA",
        IDD_SOLICITUD
      );

      if (!Notification) {
        return res.status(400).json({
          success: false,
          message: "Ocurrio un problema al enviar las notificaciones",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Correo enviado correctamente",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static enviarFormularioContacto = async (req: Request, res: Response) => {
    try {
      const { DS_NOMBRE, DS_EMAIL, NO_TELEFONO, DS_MENSAJE } = req.body;

      const query = "CALL CA_INSERTA_CONTACTANOS(?,?,?,?)";
      const replacements = [DS_NOMBRE, DS_EMAIL, NO_TELEFONO, DS_MENSAJE];
      const respuesta: any = await db.query(query, { replacements });

      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, IDD_SOLICITUD } =
        respuesta[0];
      console.log(IDD_SOLICITUD);
      const Notification = await Notifications.SendNotification(
        "FRM_CONTACTO",
        IDD_SOLICITUD
      );

      if (!Notification) {
        return res.status(400).json({
          success: false,
          message: "Ocurrio un problema al enviar las notificaciones",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Correo enviado correctamente",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static renewToken = async (req: any, res: Response) => {
    try {
      const { id_usuario } = req.id_usuario;

      const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
      let respuesta: any = await db.query(query, {
        replacements: [id_usuario],
      });
      const usuario = respuesta[0];

      //SE GENERA NUEVAMENTE PARA DAR NUEVA VIGENCIA PERO NOSOTROS PODEMOS SIMPLEMENTE DEJAR EL MISMO
      const token = await Genericos.generarJWT(id_usuario);
      const ConceptoCarinspector: any = await ConceptoModel.findOne({
        where: { CL_CONCEPTO: 1 },
      });

      return res.status(200).json({
        success: true,
        token,
        usuario,
        PrecioCarinspector: ConceptoCarinspector.MN_CONCEPTO,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
  static prueba = async (req: any, res: Response) => {
    try {
      return res.status(200).json({
        success: true,
        message: "vine",
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerUsuarioLogueado = async (req: any, res: Response) => {
    try {
      const token = req.params.token;

      const tokenvalid: any = jwt.verify(token, process.env.SEED_TOKEN);

      const { id_usuario } = tokenvalid;

      const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
      const respuesta: any = await db.query(query, {
        replacements: [id_usuario],
      });

      const ConceptoCarinspector: any = await ConceptoModel.findOne({
        where: { CL_CONCEPTO: 1 },
      });

      return res.status(200).json({
        success: true,
        Usuario: respuesta[0],
        PrecioCarinspector: ConceptoCarinspector.MN_CONCEPTO,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static enviarDatosRifa = async (req: Request, res: Response) => {
    try {
      let { CL_PROMOCION, NB_USUARIO, DS_CORREO, NO_TELEFONO } = req.body;

      const query = "CALL CA_REGISTRA_RIFA(?,?,?,?)";

      let replacements = [CL_PROMOCION, NB_USUARIO, DS_CORREO, NO_TELEFONO];
      let respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, ID_RIFA } = respuesta[0];

      const Notification = await Notifications.SendNotification(
        "REG_RIFA",
        ID_RIFA
      );

      if (POUT_CL_RESPUESTA != -1000) {
        return res.status(400).json({
          success: false,
          message: POUT_DS_RESPUESTA,
        });
      } else {
        if (!Notification) {
          return res.status(400).json({
            success: false,
            message: "Ocurrio un problema al enviar las notificaciones",
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: POUT_DS_RESPUESTA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static enviarDatosRifaDoble = async (req: Request, res: Response) => {
    try {
      let { CL_PROMOCION, NB_USUARIO, DS_CORREO, NO_TELEFONO } = req.body;

      const query = "CALL CA_REGISTRA_RIFA_SHARE(?,?,?,?)";

      let replacements = [CL_PROMOCION, NB_USUARIO, DS_CORREO, NO_TELEFONO];
      let respuesta: any = await db.query(query, { replacements });
      const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, ID_RIFA } = respuesta[0];

      const Notification = await Notifications.SendNotification(
        "REG_RIFA_SHARE",
        ID_RIFA
      );

      if (POUT_CL_RESPUESTA != -1000) {
        return res.status(400).json({
          success: false,
          message: POUT_DS_RESPUESTA,
        });
      } else {
        if (!Notification) {
          return res.status(400).json({
            success: false,
            message: "Ocurrio un problema al enviar las notificaciones",
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: POUT_DS_RESPUESTA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static loginGoogle = async (req: Request, res: Response) => {
    try {
      const { id_token } = req.body;
      const googleUser: any = await GoogleVerify.ObtenerInfoGoogle(id_token);

      //VALIDAR QUE EXISTA EL USUARIO

      const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_EMAIL(?)";
      let respuesta: any = await db.query(query, {
        replacements: [googleUser.email],
      });
      let USUARIO = respuesta[0];

      if (!USUARIO) {
        //REGISTRA USUARIO
        const query = "CALL CA_INSERTA_USUARIOS_CARALIANZ_GOOGLE(?,?,?,?)";
        const replacements = [
          googleUser.email,
          googleUser.picture,
          googleUser.name,
          "usergoogle",
        ];
        let respuesta: any = await db.query(query, { replacements });
        let USUARIO = respuesta[0].POUT_NO_VALOR_RESPUESTA;

        const TOKEN = await Genericos.generarJWT(USUARIO);

        return res.status(200).json({
          ok: true,
          TOKEN,
          message: "Inició sesión correctamente",
        });
      } else {
        //SI EXISTE INGRESA CORRECTAMENTE

        const TOKEN = await Genericos.generarJWT(USUARIO.ID_USUARIO);

        return res.status(200).json({
          ok: true,
          TOKEN,
          message: "Inició sesión correctamente",
          USUARIO: USUARIO,
        });
      }
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }

    //Sitio 2023
  };
}

export default UserController;
