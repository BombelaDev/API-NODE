
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kVehiculoDatosModel = db.define('k_vehiculo_datos',
 {
  ID_VEHICULO_DATOS: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'c_vehiculo',
      key: 'ID_VEHICULO'
    }
  },
  ID_DUENO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'c_usuario',
      key: 'ID_USUARIO'
    }
  },
  MN_PRECIO_SUGERIDO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  NO_KM: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  PR_LLANTAS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  PR_AMORTIGUADORES: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  PR_BATERIAS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  PR_FRENOS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  PR_NIVELES: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CL_ESTADO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  FE_ESCENARIO: {
    type: DataTypes.DATE(6),
    allowNull: false,
    comment: "fecha de cuando se hizo la revisión del vehiculo"
  },
  ID_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 's_municipios_geografico',
      key: 'ID_MUNICIPIO_GEOGRAFICO'
    }
  },
  ID_ESTADO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 's_estados_geografico',
      key: 'ID_ESTADO_GEOGRAFICO'
    }
  },
  JS_FOTOS: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  CL_COLOR: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  FE_VENTA: {
    type: DataTypes.DATE(6),
    allowNull: true
  },
  FG_ACTIVO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  URL_FOTO_PRINCIPAL: {
    type: DataTypes.STRING(5000),
    allowNull: true
  },
  URL_FICHA_TECNICA: {
    type: DataTypes.STRING(5000),
    allowNull: true
  },
  CL_ESTATUS: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  FE_CADUCIDAD: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  URL_REPORTE_REVISION: {
    type: DataTypes.STRING(5000),
    allowNull: true
  },
  ID_CITA_CARINSPECTOR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  JS_REVISION: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ID_ESTADO_GEOGRAFICO_PLACAS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CL_ESTADO_GEOGRAFICO_PLACAS: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  DS_OBSERVACION: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  FG_BLINDADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NB_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NB_ESTADO_GEOGRAFICO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  JS_DOCUMENTOS: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  NO_CALIFICACION: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  FG_APTO_GARANTIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  URL_CERTIFICADO: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  CL_TOKEN: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  NO_KM_REVISION: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_INICIO_REVISION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FE_FIN_REVISION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  JS_PREGUNTAS: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_NO_ES_PROPIETARIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_GARANTIA_FABRICA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_SERVICIO_HECHO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_PLACAS: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  URL_DOCUMENTOS: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  FG_REPORTE_PLACAS_ROBO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_VIN_NO_COINCIDE: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_REFRENDO_MULTAS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  MN_REFRENDO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  JS_OBSERVACION_MECANICA: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_OBSERVACION_ESTETICA: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_OBSERVACION_PRUEBA_MANEJO: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  CL_FOLIO_REVISION: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  CL_FOLIO_CARINSPECTOR: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  FG_ES_AGENCIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_LIBERACION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FG_MOTOR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_TRANSMISION: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_FRENOS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_CHASIS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_DIRECCION: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CL_TIPO_USO: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  FE_FACTURA_ORIGINAL: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {

  tableName: 'k_vehiculo_datos',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO_DATOS" },
        { name: "ID_VEHICULO" },
      ]
    },
    {
      name: "fk_vehiculo_vehiculo",
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO" },
      ]
    },
    {
      name: "fk_vehiculo_dueno",
      using: "BTREE",
      fields: [
        { name: "ID_DUENO" },
      ]
    },
    {
      name: "fk_vehiculo_estado",
      using: "BTREE",
      fields: [
        { name: "ID_ESTADO_GEOGRAFICO" },
      ]
    },
    {
      name: "fk_vehiculo_datos",
      using: "BTREE",
      fields: [
        { name: "ID_MUNICIPIO_GEOGRAFICO" },
      ]
    },
    {
      name: "ID_VEHICULO_DATOS",
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO_DATOS" },
      ]
    },
  ]
});

export default kVehiculoDatosModel
