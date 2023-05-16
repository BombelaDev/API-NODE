
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const UsuarioSasModel = db.define('c_usuario_sas',
 {
  ID_USUARIO_SAS: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_USUARIO_SAS: {
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
  ID_EMPLEADO_SAS: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_empleado_sas',
      key: 'ID_EMPLEADO_SAS'
    }
  },
  FE_ULTIMO_INICIO_SESION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ID_ROL_SAS: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_rol_sas',
      key: 'ID_ROL_SAS'
    }
  },
  FG_CAMBIAR_PASSWORD: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_SOCIO_COMERCIAL: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'c_usuario_sas',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO_SAS" },
      ]
    },
    {
      name: "fk_empleado_empleado",
      using: "BTREE",
      fields: [
        { name: "ID_EMPLEADO_SAS" },
      ]
    },
    {
      name: "fk_suario_rol",
      using: "BTREE",
      fields: [
        { name: "ID_ROL_SAS" },
      ]
    },
  ]
});

export default UsuarioSasModel

