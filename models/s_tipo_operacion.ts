import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const TipoOperacionModel = db.define('s_tipo_operacion',
 {
  ID_TIPO_OPERACION: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_TIPO_OPERACION: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  NB_TIPO_OPERACION: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 's_tipo_operacion',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_TIPO_OPERACION" },
      ]
    },
  ]
});

export default TipoOperacionModel
