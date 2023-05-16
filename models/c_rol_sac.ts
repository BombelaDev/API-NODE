


import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const RolSacModel = db.define('c_rol_sac',
 {
  ID_ROL_SAC: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_ROL_SAC: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  NO_JERARQUIA: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {

  tableName: 'c_rol_sac',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_ROL_SAC" },
      ]
    },
  ]
});

export default RolSacModel
