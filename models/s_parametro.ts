
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const ParametroModel = db.define('s_parametro',
 {
  ID_PARAMETRO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_PARAMETRO: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  NO_VALOR: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NO_VALOR_JSON: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
 
  tableName: 's_parametro',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_PARAMETRO" },
      ]
    },
  ]
});

export default ParametroModel
