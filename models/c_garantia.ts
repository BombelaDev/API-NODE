
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const GarantiaModel = db.define('c_garantia',
 {
  ID_GARANTIA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_GARANTIA: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FE_CREACION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  CL_ESTADO: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FE_CADUCIDAD: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: "0000-00-00 00:00:00"
  },
  FG_AL_VENDER_AUTO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FE_CONTRATACION: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  FE_INICIO_VIGENCIA: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FE_FIN_VIGENCIA: {
    type: DataTypes.DATE,
    allowNull: true
  },
  CL_FOLIO_GARANTIA: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  CL_TIPO_GARANTIA: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ID_USUARIO_CANCELA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  DS_MOTIVO_CANCELACION: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  FE_CANCELACION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ID_USUARIO_DIRECCION: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_VEHICULO_DATOS: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'c_garantia',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_GARANTIA" },
      ]
    },
  ]
});

export default GarantiaModel
