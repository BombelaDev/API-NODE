


import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kRecordatorioModel = db.define('k_recordatorio',
 {
  CL_RECORDATORIO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  DS_RECORDATORIO: {
    type: DataTypes.STRING(5000),
    allowNull: false
  },
  FG_ACTIVO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  FG_CORREO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  FG_SMS: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  FG_CON_COPIA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  DS_CORREO_DESTINATARIO: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  DS_CORREO_COPIA: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  DS_TEMPLATE_CORREO: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  DS_TEMPLATE_MENSAJE: {
    type: DataTypes.STRING(5000),
    allowNull: false
  },
  NO_TELEFONO: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FG_PROCESADO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_RECORDATORIO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'k_recordatorio',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_RECORDATORIO" },
      ]
    },
  ]
});

export default kRecordatorioModel
