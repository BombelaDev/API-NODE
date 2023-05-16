import { Request, Response } from "express";
import { db, NB_BUCKET, URL_BACKEND, URL_FRONTEND } from "../../config/config";
import ErrorClass from "../../helpers/ErrorsValidate";

class CatalogosController {
  static GetCavs = async (req: any, res: Response) => {
    try {
      //  let replacements = FG_TIPO_CAV == 0 ? [busqueda] : [ID_VEHICULO] ; // 0 CAV SERVICIOS  1 CAV COMERCIALES
      let query = "CALL CA_OBTIENE_CAV_PORTAL()";

      const respuesta: any = await db.query(query);
      console.log(respuesta);

      return res.status(200).json(respuesta);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static getDates = async (req: any, res: Response) => {
    try {
      const { ID_CAV } = req.params;
      let replacements = [ID_CAV];

      let QueryFechasLaborables = "CALL CA_OBTIENE_FECHAS_PORTAL(?)";
      //   const QueryDiasInactivos = "CALL CA_OBTIENE_DIAS_NO_LABORABLES_PORTAL(?,?)";

      const FechasLaborables: any = await db.query(QueryFechasLaborables, {
        replacements,
      });
      // const FechasNoLaborables:any = await  db.query(QueryDiasInactivos,{replacements:[FG_TIPO_CAV,ID_CAV]});

      return res.status(200).json(FechasLaborables);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static BuscarDireccionPorCp = async (req: Request, res: Response) => {
    try {
      let CP = req.params.NO_CP;

      const query = "CALL CA_OBTIENE_COLONIAS_por_CP(?)";
      let Respuesta: any = await db.query(query, { replacements: [CP] });

      return res.status(200).json({
        ID_ESTADO_GEOGRAFICO: Respuesta[0]?.ID_ESTADO_GEOGRAFICO || -1,
        ID_MUNICIPIO_GEOGRAFICO: Respuesta[0]?.ID_MUNICIPIO_GEOGRAFICO || -1,
        Colonias: Respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static obtenerEstadosGeograficos = async (req: Request, res: Response) => {
    try {
      const query = "CALL CA_OBTIENE_ESTADOS_GEOGRAFICOS()";

      let respuesta: any = await db.query(query);

      return res.status(200).json({
        Estados: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerMunicipios = async (req: Request, res: Response) => {
    let ID_ESTADO = req.params.ID_ESTADO;

    const query = "CALL CA_OBTIENE_MUNICIPIOS_GEOGRAFICO(?)";
    let respuesta: any = await db.query(query, { replacements: [ID_ESTADO] });

    return res.status(200).json({
      Municipios: respuesta,
    });
  };
  static ObtenerHorasPorDia = async (req: any, res: Response) => {
    try {
      const { DS_FECHA, ID_CAV } = req.body;
      let replacements = [ID_CAV, DS_FECHA];
      let query = "CALL CA_OBTIENE_HORAS_DISPONIBLES(?,?)";

      const Horas: any = await db.query(query, { replacements });

      return res.status(200).json({
        success: true,
        Horas,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerCavs = async (req: any, res: Response) => {
    try {
      const PROCESO = req.params.PROCESO;

      //  let replacements = FG_TIPO_CAV == 0 ? [busqueda] : [ID_VEHICULO] ; // 0 CAV SERVICIOS  1 CAV COMERCIALES
      let query = "CALL CA_OBTIENE_CAVS_PORTAL_REL (?)";

      const respuesta: any = await db.query(query, { replacements: [0] });

      return res.status(200).json({
        success: true,
        Cavs: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
  static ObtieneMunicipios = async (req, res: Response) => {
    try {
      const IdEstado = req.params.IdEstado;

      const Query = "CALL CA_OBTIENE_MUNICIPIOS_GEOGRAFICO(?)";

      let respuesta: any = await db.query(Query, { replacements: [IdEstado] });

      res.json(respuesta);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerMensualidades = async (req: any, res: Response) => {
    try {
      const { ID_VEHICULO, PR_ENGANCHE } = req.params;

      let query = "CALL CA_OBTIENE_MENSUALIDADES(?,?)";

      const respuesta: any = await db.query(query, {
        replacements: [ID_VEHICULO, PR_ENGANCHE],
      });

      return res.status(200).json(...respuesta);
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerDatosFormularioContratos = async (req, res: Response) => {
    try {
      const IdCita = req.params.IdCita;

      const QIdentificaciones = "CALL CA_OBTIENE_TIPO_IDENTIFICACION()";
      const QAutoridades = "CALL CA_OBTIENE_AUTORIDAD()";
      const QEstados = "CALL CA_OBTIENE_ESTADOS_GEOGRAFICOS()";
      const QBancos = "CALL CA_OBTIENE_BANCOS()";
      const QInstrumentos = "CALL CA_OBTIENE_INSTRUMENTO_CONTRATO()";

      let Identificaciones: any = await db.query(QIdentificaciones);
      let Autoridades: any = await db.query(QAutoridades);
      let Estados: any = await db.query(QEstados);
      let Bancos: any = await db.query(QBancos);
      let Instrumentos: any = await db.query(QInstrumentos);

      res.status(200).json({
        Identificaciones,
        Autoridades,
        Estados,
        Bancos,
        Instrumentos,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerMarcasAuto = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_OBTIENE_MARCAS()";

      const respuesta: any = await db.query(query, {});

      return res.status(200).json({
        success: true,
        Marcas: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
  static ObtenerColores = async (req: any, res: Response) => {
    try {
      const query = "CALL CA_OBTIENE_COLOR()";

      const respuesta: any = await db.query(query);

      return res.status(200).json({
        success: true,
        Colores: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerModelos = async (req: any, res: Response) => {
    try {
      let ID_MARCA = req.params.ID_MARCA;

      const query = "CALL CA_OBTIENE_MODELOS(?)";

      const respuesta: any = await db.query(query, {
        replacements: [ID_MARCA],
      });

      return res.status(200).json({
        success: true,
        Modelos: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAnios = async (req: any, res: Response) => {
    try {
      let ID_MODELO = req.params.ID_MODELO;

      const query = "CALL CA_OBTIENE_ANIOS(?)";

      const respuesta: any = await db.query(query, {
        replacements: [ID_MODELO],
      });

      return res.status(200).json({
        success: true,
        Anios: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };

  static ObtenerAniosCompleto = async (req: any, res: Response) => {
    try {
      let ID_MODELO = req.params.ID_MODELO;

      const query = "CALL CA_OBTIENE_ANIOS_COMPLETO(?)";

      const respuesta: any = await db.query(query, {
        replacements: [ID_MODELO],
      });

      return res.status(200).json({
        success: true,
        Anios: respuesta,
      });
    } catch (error) {
      ErrorClass.HttpError(error, res, 500);
    }
  };
}

export default CatalogosController;
