
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const VersionAutoModel = db.define('c_version',
 {
  ID_VERSION: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_MARCA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_marca',
      key: 'ID_MARCA'
    }
  },
  NB_VERSION: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  JS_VERSION: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {

  tableName: 'c_version',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_VERSION" },
      ]
    },
    {
      name: "FK_RANGO_MARCA",
      using: "BTREE",
      fields: [
        { name: "ID_MARCA" },
      ]
    },
    {
      name: "FK_RANGO_ANIO",
      using: "BTREE",
      fields: [
        { name: "ID_ANIO" },
      ]
    },
  ]
});

export default VersionAutoModel
