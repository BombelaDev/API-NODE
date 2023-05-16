import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const AutoridadModel = db.define('s_autoridad_expide',
 {
  ID_AUTORIDAD_EXPIDE: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_TIPO_IDENTIFICACION: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NB_AUTORIDAD_EXPIDE: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 's_autoridad_expide',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_AUTORIDAD_EXPIDE" },
      ]
    },
  ]
});

export default AutoridadModel

