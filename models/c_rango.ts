


import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const RangoModel = db.define('c_rango',
 {
  ID_RANGO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_anios',
      key: 'ID_ANIO'
    }
  },
  ID_MODELO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_MARCA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_marca',
      key: 'ID_MARCA'
    }
  },
  MN_DESDE: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  MN_HASTA: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  CL_GRUPO: {
    type: DataTypes.STRING(3),
    allowNull: false
  },
  NO_PUERTAS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NB_DATOS_VERSION: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  NB_VERSION: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {

  tableName: 'c_rango',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_RANGO" },
      ]
    },
    {
      name: "FK_RANGO_MARCA",
      using: "BTREE",
      fields: [
        { name: "ID_MARCA" },
      ]
    },
    {
      name: "FK_RANGO_MODELO",
      using: "BTREE",
      fields: [
        { name: "ID_MODELO" },
      ]
    },
    {
      name: "FK_RANGO_ANIO",
      using: "BTREE",
      fields: [
        { name: "ID_ANIO" },
      ]
    },
  ]
});

export default RangoModel
