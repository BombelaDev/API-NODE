

import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const CSeccionModel = db.define('c_seccion',
 {
  ID_SECCION: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NB_SECCION: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  PR_PORCENTAJE: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  }
}, {
  tableName: 'c_seccion',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_SECCION" },
      ]
    },
  ]
});

export default CSeccionModel
