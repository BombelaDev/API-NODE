
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const RolSasModel = db.define('c_rol_sas',
 {
  ID_ROL_SAS: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_ROL_SAS: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  NO_JERARQUIA: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'c_rol_sas',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_ROL_SAS" },
      ]
    },
  ]
});

export default RolSasModel
