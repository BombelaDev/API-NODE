import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const MarcaModel = db.define('c_marca',
 {
  ID_MARCA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_MARCA: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FG_ACTIVO: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  IM_MARCA: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 'c_marca',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_MARCA" },
      ]
    },
  ]
});

export default MarcaModel
