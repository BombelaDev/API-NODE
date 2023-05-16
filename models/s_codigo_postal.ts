

import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const ScodigoPostalModel = db.define('s_codigo_postal',
 {
  ID_CP: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NO_CP: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 's_municipios_geografico',
      key: 'ID_MUNICIPIO_GEOGRAFICO'
    }
  },
  ID_ESTADO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 's_estados_geografico',
      key: 'ID_ESTADO_GEOGRAFICO'
    }
  },
  NB_COLONIA: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {

  tableName: 's_codigo_postal',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CP" },
      ]
    },
    {
      name: "municipio_cp",
      using: "BTREE",
      fields: [
        { name: "CL_MUNICIPIO_GEOGRAFICO" },
      ]
    },
    {
      name: "estado_cp",
      using: "BTREE",
      fields: [
        { name: "ID_ESTADO_GEOGRAFICO" },
      ]
    },
  ]
});

export default ScodigoPostalModel
