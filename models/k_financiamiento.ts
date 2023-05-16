


import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const KFinanciamientoModel = db.define('k_financiamiento',
 {
  ID_FINANCIAMIENTO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_usuario',
      key: 'ID_USUARIO'
    }
  },
  ID_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_vehiculo',
      key: 'ID_VEHICULO'
    }
  },
  ID_VEHICULO_DATOS: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'k_vehiculo_datos',
      key: 'ID_VEHICULO_DATOS'
    }
  },
  MN_ENGANCHE: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  FE_SOLICITUD: {
    type: DataTypes.DATE,
    allowNull: false
  },
  CL_ESTADO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  MN_FINANCIAR: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  }
}, {
  tableName: 'k_financiamiento',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_FINANCIAMIENTO" },
      ]
    },
    {
      name: "financiamiento_c_vehiculo",
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO" },
      ]
    },
    {
      name: "financiamiento_datos",
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO_DATOS" },
      ]
    },
    {
      name: "financiamiento",
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO" },
      ]
    },
  ]
});

export default KFinanciamientoModel
