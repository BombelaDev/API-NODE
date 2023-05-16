

import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kVehiculoGarageModel = db.define('k_vehiculo_garage',
 {
  ID_VEHICULO_GARAGE: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_GARAGE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_garage',
      key: 'ID_GARAGE'
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
  FE_ALTA_GARAGE: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: "fecha en que se agrego al garage"
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_usuario',
      key: 'ID_USUARIO'
    }
  }
}, {
 
  tableName: 'k_vehiculo_garage',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO_GARAGE" },
      ]
    },
    {
      name: "FK_VEHICULO_GARAGE_C_GARAGE",
      using: "BTREE",
      fields: [
        { name: "ID_GARAGE" },
      ]
    },
    {
      name: "FK_VEHICULO_VEHICULO_GARAGE",
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO" },
      ]
    },
    {
      name: "FK_USUARIO_G_USUAIRO",
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO" },
      ]
    },
  ]
});

export default kVehiculoGarageModel
