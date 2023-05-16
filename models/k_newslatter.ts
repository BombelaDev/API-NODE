
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const NeslatterModel = db.define('k_newslatter',
 {
  ID_NEWSLATTER: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  DS_CORREO: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  FG_RECIBE_CORREO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FE_SUBSCRIPCION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_DES_SUBSCRIPCION: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'k_newslatter',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_NEWSLATTER" },
      ]
    },
  ]
});

export default NeslatterModel
