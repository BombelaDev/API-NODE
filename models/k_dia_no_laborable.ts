


import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const KDiaNoLaborableModel = db.define('k_dia_no_laborable',
 {
  ID_DIA_NO_LABORABLE: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_cav',
      key: 'ID_CAV'
    }
  },
  FE_NO_LABORABLE: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  FG_DIA_COMPLETO: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {

  tableName: 'k_dia_no_laborable',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_DIA_NO_LABORABLE" },
      ]
    },
    {
      name: "fk_no_laborable_cav",
      using: "BTREE",
      fields: [
        { name: "ID_CAV" },
      ]
    },
  ]
});

export default KDiaNoLaborableModel
