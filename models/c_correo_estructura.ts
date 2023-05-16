
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const CorreoEstructuraModel = db.define('c_correo_estructura',
 {
  ID_CORREO_ESTRUCTURA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_CORREO_ESTRUCTURA: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  DS_HEADER: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  DS_FOOTER: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  FE_CREACION: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'c_correo_estructura',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CORREO_ESTRUCTURA" },
      ]
    },
  ]
});

export default CorreoEstructuraModel
