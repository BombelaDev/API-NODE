
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const UsuarioCavModel = db.define('c_usuario_cav',
 {
  ID_USUARIO_CAV: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_SOCIO_COMERCIAL: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_socio_comercial',
      key: 'ID_SOCIO_COMERCIAL'
    }
  },
  CL_USUARIO_CAV: {
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
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_cav',
      key: 'ID_CAV'
    }
  },
  ID_EMPLEADO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_empleado_cav',
      key: 'ID_EMPLEADO_CAV'
    }
  },
  FE_ULTIMO_INICIO_SESION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ID_ROL: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_rol',
      key: 'ID_ROL'
    }
  },
  FG_CAMBIAR_PASSWORD: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'c_usuario_cav',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO_CAV" },
      ]
    },
    {
      name: "fk_Cav_usuairo_cav",
      using: "BTREE",
      fields: [
        { name: "ID_CAV" },
      ]
    },
    {
      name: "fk_socio_socio",
      using: "BTREE",
      fields: [
        { name: "ID_SOCIO_COMERCIAL" },
      ]
    },
    {
      name: "fk_empleado_empleado",
      using: "BTREE",
      fields: [
        { name: "ID_EMPLEADO" },
      ]
    },
    {
      name: "fk_suario_rol",
      using: "BTREE",
      fields: [
        { name: "ID_ROL" },
      ]
    },
  ]
});

export default UsuarioCavModel
