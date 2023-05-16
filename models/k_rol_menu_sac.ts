



import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kRolMenuSacModel = db.define('k_rol_menu_sac',
 {
  ID_ROL_SAC: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  }
}, {
 
  tableName: 'k_rol_menu_sac',
  timestamps: false,
  indexes: [
    {
      name: "fk_rol_rol",
      using: "BTREE",
      fields: [
        { name: "ID_ROL_SAC" },
      ]
    },
  ]
});

export default kRolMenuSacModel
