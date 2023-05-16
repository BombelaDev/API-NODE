import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const CorreoContenidoModel = db.define('c_correo_contenido',
 {
  ID_CORREO_CONTENIDO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_TIPO_CORREO_CONTENIDO: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  DS_BODY: {
    type: DataTypes.STRING(8000),
    allowNull: false
  },
  ID_CORREO_ESTRUCTURA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_correo_estructura',
      key: 'ID_CORREO_ESTRUCTURA'
    }
  },
  CL_CORREO: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  DS_SMS: {
    type: DataTypes.STRING(8000),
    allowNull: true
  }
}, {
  tableName: 'c_correo_contenido',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CORREO_CONTENIDO" },
      ]
    },
    {
      name: "FK_ID_CORREO_ESTRUCTURA",
      using: "BTREE",
      fields: [
        { name: "ID_CORREO_ESTRUCTURA" },
      ]
    },
  ]
});

export default CorreoContenidoModel
