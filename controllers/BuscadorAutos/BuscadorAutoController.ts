import { Request, Response } from "express";
import {
  db,
  NB_BUCKET,
  URL_BACKEND,
  URL_FRONTEND,
  TOKEN_CONEKTA,
} from "../../config/config";
import Correo from "../../helpers/Correos";
import { SEND_NOTIFICATIONS } from "../../enums/enums";
import sms from "../../helpers/sms";
import smsEnums from "../../enums/smsEnums";
import TemplateCorreo from "../../enums/enums";
import { SmsCitaComercial } from "../../enums/smsEnums";
import CitasCarSalesModel from "../../models/c_cita_car_sales";
import Consultas from "../../helpers/consultas";
import Genericos from "../../helpers/Genericos";
import ErrorClass from "../../helpers/ErrorsValidate";

class BuscadorAutoController {
  static ObtenerDetalleVehiculoEnVenta = async (
    req: Request,
    res: Response
  ) => {
    try {
      let id_vehiculo = req.params.id_vehiculo;
      const query = "CALL CA_OBTIENE_DATOS_EN_VENTA(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [id_vehiculo],
      });
      const JS_FOTOS = JSON.parse(Respuesta[0].JS_FOTOS).filter(
        (img) => img.URL != null
      );

      return res.status(200).json({
        Auto: Respuesta[0],
        JS_FOTOS,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
  static ObtenerDetalleVehiculoPerfil = async (req: Request, res: Response) => {
    try {
      let id_vehiculo = req.params.id_vehiculo;
      const query = "CALL CA_OBTIENE_DATOS_PRE_VENTA(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [id_vehiculo],
      });
      const JS_FOTOS = JSON.parse(Respuesta[0].JS_FOTOS).filter(
        (img) => img.URL != null
      );

      const JS_ASIENTOS = JSON.parse(Respuesta[0].JS_ASIENTOS) ?? [];
      const JS_CAJUELA = JSON.parse(Respuesta[0].JS_CAJUELA) ?? [];
      const JS_CLIMA = JSON.parse(Respuesta[0].JS_CLIMA) ?? [];
      const JS_CONECTIVIDAD = JSON.parse(Respuesta[0].JS_CONECTIVIDAD) ?? [];
      const JS_CRISTALES = JSON.parse(Respuesta[0].JS_CRISTALES) ?? [];
      const JS_PORTAVASOS = JSON.parse(Respuesta[0].JS_PORTAVASOS) ?? [];
      return res.status(200).json({
        Auto: Respuesta[0],
        JS_FOTOS,
        JS_ASIENTOS,
        JS_CAJUELA,
        JS_CLIMA,
        JS_CONECTIVIDAD,
        JS_CRISTALES,
        JS_PORTAVASOS,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAutosPerfilUsuario = async (req: Request, res: Response) => {
    try {
      let id_usuario = req.params.id_usuario;
      const query = "CALL CA_OBTIENE_VEHICULOS_USUARIO_PERFIL(?)";
      let Respuesta: any = await db.query(query, {
        replacements: [id_usuario],
      });

      console.log(Respuesta);

      return res.status(200).json({
        Autos: Respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerInformacionAutoPorId = async (req: any, res: Response) => {
    try {
      const ID_VEHICULO = req.params.ID_VEHICULO;

      const query = "CALL CA_OBTIENE_PREVIO_VEHICULO_PORTAL(?,?,?)";
      let replacements = [ID_VEHICULO, "0", 0];
      let respuesta: any = await db.query(query, { replacements });

      const Auto = respuesta[0];

      return res.status(200).json({
        ok: true,
        Auto,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAutosBuscador = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_OBTIENE_VEHICULOS_BUSCADOR(?,?)";
      let replacements = [req.params.TIPO_BUSQUEDA, req.params.BUSQUEDA];
      let respuesta: any = await db.query(query, { replacements });

      const AllMarcas = respuesta.map((auto) => auto.NB_MARCA);
      const Marcas = AllMarcas.filter(
        (ele, pos) => AllMarcas.indexOf(ele) == pos
      );

      const AllModelos = respuesta.map((auto) => auto.NB_MODELO);
      const Modelos = AllModelos.filter(
        (ele, pos) => AllModelos.indexOf(ele) == pos
      );

      const AllAnios = respuesta.map((auto) => auto.NO_ANIO);
      let AniosNumericos = AllAnios.filter(
        (ele, pos) => AllAnios.indexOf(ele) == pos
      );
      let Anios = [];

      AniosNumericos.forEach((element) => {
        Anios.push(element.toString());
      });

      const AllPrecios = respuesta.map((auto) => auto.MN_PRECIO_PUBLICADO);
      const MayorPrecio = Math.max.apply(null, AllPrecios);
      const MenorPrecio = Math.min.apply(null, AllPrecios);

      const AllKm = respuesta.map((auto) => auto.NO_KM);
      const MayorKm = Math.max.apply(null, AllKm);
      const MenorKm = Math.min.apply(null, AllKm);

      const AllColores = respuesta.map((auto) => auto.CL_COLOR);
      const Colores = AllColores.filter(
        (ele, pos) => AllColores.indexOf(ele) == pos
      );

      Anios = Anios.sort((a, b) => b - a);

      return res.status(200).json({
        success: true,
        Autos: respuesta,
        Marcas,
        Modelos,
        Colores,
        Anios,
        MayorPrecio,
        MenorPrecio,
        MayorKm,
        MenorKm,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAutosFavoritosUsuario = async (req: any, res: Response) => {
    try {
      const ID_USUARIO = req.params.ID_USUARIO;
      console.log(ID_USUARIO);

      const query = "CALL CA_OBTIENE_VEHICULOS_USUARIO_GARAGE(?)";
      let replacements = [ID_USUARIO];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
        AutosFavoritos: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAutoPreview = async (req: any, res: Response) => {
    try {
      const ID_AUTO = req.params.ID_AUTO;

      if (!ID_AUTO) {
        return res.status(403).json({ success: false });
      }

      if (isNaN(ID_AUTO)) {
        return res.status(404).json({ success: false });
      }

      if (typeof ID_AUTO === "number") {
        return res.status(403).json({ success: false });
      }

      const ID_USUARIO = req.params.ID_USUARIO;
      const ISQR = req.params.ISQR;

      const query = "CALL CA_OBTIENE_PREVIO_VEHICULO_PORTAL(?,?,?)";
      let replacements = [ID_AUTO, ID_USUARIO, ISQR];
      let respuesta: any = await db.query(query, { replacements });

      /**AUTOS SIMILARES */
      const queryAutosSimilares = "CALL CA_OBTIENE_CARRUSEL_SIMILARES(?)";
      let AutosSimilares: any = await db.query(queryAutosSimilares, {
        replacements: [ID_AUTO],
      });

      const Auto = respuesta[0];

      if (!Auto) {
        return res.status(500).json({
          message: "No se encontró ningún auto",
        });
      }

      const JS_FOTOS = JSON.parse(respuesta[0].JS_FOTOS).filter(
        (img) => img.URL != null
      );

      const JS_ASIENTOS = JSON.parse(respuesta[0].JS_ASIENTOS) ?? [];
      const JS_CAJUELA = JSON.parse(respuesta[0].JS_CAJUELA) ?? [];
      const JS_CLIMA = JSON.parse(respuesta[0].JS_CLIMA) ?? [];
      const JS_CONECTIVIDAD = JSON.parse(respuesta[0].JS_CONECTIVIDAD) ?? [];
      const JS_CRISTALES = JSON.parse(respuesta[0].JS_CRISTALES) ?? [];
      const JS_ESTILOS = JSON.parse(respuesta[0].JS_ESTILOS) ?? [];
      const JS_MECANICAS = JSON.parse(respuesta[0].JS_MECANICAS) ?? [];
      const JS_PORTAVASOS = JSON.parse(respuesta[0].JS_PORTAVASOS) ?? [];
      const JS_SEGURIDAD = JSON.parse(respuesta[0].JS_SEGURIDAD) ?? [];

      return res.status(200).json({
        Auto,
        JS_FOTOS,
        JS_ASIENTOS,
        JS_CAJUELA,
        JS_CLIMA,
        JS_CONECTIVIDAD,
        JS_CRISTALES,
        JS_ESTILOS,
        JS_MECANICAS,
        JS_PORTAVASOS,
        JS_SEGURIDAD,
        AutosSimilares,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAutosSimilares = async (req: any, res: Response) => {
    try {
      const ID_AUTO = req.params.ID_AUTO;

      const query = "CALL CA_OBTIENE_VEHICULOS_BUSCADOR_SIMILARES(?)";
      let replacements = [ID_AUTO];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
        AutosSimilares: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAutosNuevos = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_OBTIENE_CARRUSEL_NUEVOS()";
      let replacements = [];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
        AutosNuevos: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static PublicarVehiculoPortal = async (req: any, res: Response) => {
    try {
      const ID_VEHICULO = req.body.ID_VEHICULO;
      const query = "CALL CA_VENDER_VEHICULO(?)";
      let replacements = [ID_VEHICULO];
      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
        message: respuesta[0].POUT_DS_RESPUESTA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ActualizarPrecioVehiculo = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_ACTUALIZA_PRECIO_DESDE_PERFIL(?,?)";
      let replacements = [
        req.body.ID_VEHICULO,
        req.body.MN_PRECIO.replace(/,/g, ""),
      ];

      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
        message: respuesta[0].POUT_DS_RESPUESTA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
  static dejarDeVenderAuto = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_DEJAR_VENDER_VEHICULO(?)";
      let replacements = [req.body.ID_VEHICULO];

      let respuesta: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
        message: respuesta[0].POUT_DS_RESPUESTA,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
}

export default BuscadorAutoController;
