
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const KHoraCavModel = db.define('k_hora_cav',
 {
  ID_HORA_CAV: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NO_HORA: {
    type: DataTypes.TIME,
    allowNull: false
  },
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_cav',
      key: 'ID_CAV'
    }
  },
  NO_DIA_SEMANA: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'k_hora_cav',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_HORA_CAV" },
      ]
    },
    {
      name: "fk_hora_cav_cav",
      using: "BTREE",
      fields: [
        { name: "ID_CAV" },
      ]
    },
  ]
});

export default KHoraCavModel
