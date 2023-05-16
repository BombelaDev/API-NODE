
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const RolCaralianzModel = db.define('c_rol',
 {
  ID_ROL: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_ROL: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  NO_JERARQUIA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FG_VENTAS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FG_SERVICIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FG_GERENTE: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_TIPO_ABR: {
    type: DataTypes.STRING(30),
    allowNull: false
  }
}, {
  tableName: 'c_rol',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_ROL" },
      ]
    },
  ]
});

export default RolCaralianzModel
