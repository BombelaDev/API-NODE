import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const AniosModel = db.define('c_anios',
 {
  ID_ANIO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_MODELO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_MARCA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  JS_ESTILOS: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'c_anios',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_ANIO" },
      ]
    },
    {
      name: "FK_ANIOS_MODELOS",
      using: "BTREE",
      fields: [
        { name: "ID_MODELO" },
      ]
    },
    {
      name: "FK_ANIOS_MARCA",
      using: "BTREE",
      fields: [
        { name: "ID_MARCA" },
      ]
    },
  ]
});

export default AniosModel
