
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const ConceptoModel = db.define('s_concepto',
 {
  ID_CONCEPTO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_CONCEPTO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  DS_CONCEPTO: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  MN_CONCEPTO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  NB_TITULO: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 's_concepto',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CONCEPTO" },
      ]
    },
  ]
});

export default ConceptoModel
