
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const RegionModel = db.define('c_region',
 {
  ID_REGION: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NO_CP_DEL: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_CP_AL: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'c_region',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_REGION" },
      ]
    },
  ]
});

export default RegionModel

