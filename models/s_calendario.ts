


import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const SCalendarioModel = db.define('s_calendario',
 {
  ID_CALENDARIO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  FE_CALENDARIO: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {

  tableName: 's_calendario',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CALENDARIO" },
      ]
    },
  ]
});

export default SCalendarioModel
