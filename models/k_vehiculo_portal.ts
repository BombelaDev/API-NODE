
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kVehiculoPortalModel = db.define('k_vehiculo_portal',
 {
  ID_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NB_MARCA: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  NB_MODELO: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  NO_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NB_VERSION: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  CL_TIPO_COMBUSTIBLE: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  CL_TRANSMISION: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  NO_CILINDROS: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  NO_PUERTAS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_PASAJEROS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_VIN: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  JS_ESTILOS: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  MN_PRECIO_SUGERIDO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  NO_KM: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PR_LLANTAS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PR_AMORTIGUADORES: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PR_BATERIAS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PR_FRENOS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PR_NIVELES: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_ESTADO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  NB_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  NB_ESTADO_GEOGRAFICO: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FE_ACTIVACION_PORTAL: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: "0000-00-00 00:00:00"
  },
  JS_FOTOS: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  CL_COLOR: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  JS_CRISTALES: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  JS_PORTAVASOS: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  JS_CONECTIVIDAD: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  JS_CAJUELA: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  JS_ASIENTOS: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  JS_CLIMA: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  JS_SEGURIDAD: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  NO_VISTAS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  URL_FOTO_PRINCIPAL: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  URL_FICHA_TECNICA: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  FG_TIENE_GARANTIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  URL_CERTIFICADO: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  MN_PRECIO_ESTABLECIDO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  CNT_CUANTOS_GARAGE: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CNT_NO_AGENDADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_VEHICULO_EN_BUSCADOR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_EN_OFERTA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_APARTADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_CADUCIDAD: {
    type: DataTypes.DATE,
    allowNull: true
  },
  MN_PRECIO_PUBLICADO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  FG_VENTA_CARALIANZ: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_DUENO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_KM_REVISION: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_APTO_GARANTIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_PROMOCIONAR_CON_GARANTIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_IS_AGENCIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_VEHICULO_DATOS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_HP: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CNT_CUANTOS_QR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_CADUCIDAD_APARTADO: {
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
  }
}, {

  tableName: 'k_vehiculo_portal',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO" },
      ]
    },
    {
      name: "fk_vehiculo_marca",
      using: "BTREE",
      fields: [
        { name: "NB_MARCA" },
      ]
    },
    {
      name: "fk_vehiculo_modelo",
      using: "BTREE",
      fields: [
        { name: "NB_MODELO" },
      ]
    },
    {
      name: "fk_vehiculo_anio",
      using: "BTREE",
      fields: [
        { name: "NO_ANIO" },
      ]
    },
    {
      name: "fk_vehiculo_version",
      using: "BTREE",
      fields: [
        { name: "NB_VERSION" },
      ]
    },
  ]
});

export default kVehiculoPortalModel
