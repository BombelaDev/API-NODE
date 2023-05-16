



import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const UsuarioSacModel = db.define('c_usuario_sac',
 {
  ID_USUARIO_SAC: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_USUARIO_SAC: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  DS_PASSWORD: {
    type: DataTypes.STRING(5000),
    allowNull: false
  },
  IMG_FOTO: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  CL_ESTADO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "1.- Activo, 0.- Inactivo, 2.-Bloqueado"
  },
  ID_EMPLEADO_SAC: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_empleado_sac',
      key: 'ID_EMPLEADO_SAC'
    }
  },
  FE_ULTIMO_INICIO_SESION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ID_ROL_SAC: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_rol_sac',
      key: 'ID_ROL_SAC'
    }
  },
  FG_CAMBIAR_PASSWORD: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'c_usuario_sac',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO_SAC" },
      ]
    },
    {
      name: "fk_empleado_empleado",
      using: "BTREE",
      fields: [
        { name: "ID_EMPLEADO_SAC" },
      ]
    },
    {
      name: "fk_suario_rol",
      using: "BTREE",
      fields: [
        { name: "ID_ROL_SAC" },
      ]
    },
  ]
});

export default UsuarioSacModel
