


import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kRolMenuCaralianzModel = db.define('k_rol_menu',
 {
  ID_ROL: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_rol',
      key: 'ID_ROL'
    }
  },
  NB_ROL_MENU: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  IMG_ICO: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  CL_ROL_MENU: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  JS_SUBMENU: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ID_SECUENCIA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_TIPO_SERVICIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {

  tableName: 'k_rol_menu',
  timestamps: false,
  indexes: [
    {
      name: "fk_rol_rol",
      using: "BTREE",
      fields: [
        { name: "ID_ROL" },
      ]
    },
  ]
});

export default kRolMenuCaralianzModel
