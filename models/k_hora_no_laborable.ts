

import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const KHoraNoLaborableModel = db.define('k_hora_no_laborable',
 {
  ID_HORA_NO_LABORABLE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_DIA_NO_LABORABLE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'k_dia_no_laborable',
      key: 'ID_DIA_NO_LABORABLE'
    }
  },
  NO_HORA: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {

  tableName: 'k_hora_no_laborable',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_HORA_NO_LABORABLE" },
      ]
    },
    {
      name: "fk_hora_dia",
      using: "BTREE",
      fields: [
        { name: "ID_DIA_NO_LABORABLE" },
      ]
    },
  ]
});

export default KHoraNoLaborableModel
