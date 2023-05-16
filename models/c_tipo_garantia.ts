

import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const TipoGarantiaModel = db.define('c_tipo_garantia',
 {
  ID_TIPO_GARANTIA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_TIPO_GARANTIA: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  CL_CLASIFICACION_GARANTIA: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  NO_HP_DESDE: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  NO_HP_HASTA: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  MN_GARANTIA: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  }
}, {
 
  tableName: 'c_tipo_garantia',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_TIPO_GARANTIA" },
      ]
    },
  ]
});

export default TipoGarantiaModel
