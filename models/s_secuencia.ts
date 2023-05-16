
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const SecuenciaModel = db.define('s_secuencia',
 {
  CL_SECUENCIA: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true
  },
  NO_SECUENCIA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_PREFIJO: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  NO_DIGITOS: {
    type: DataTypes.STRING(10),
    allowNull: false
  }
}, {

  tableName: 's_secuencia',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "CL_SECUENCIA" },
      ]
    },
  ]
});

export default SecuenciaModel
