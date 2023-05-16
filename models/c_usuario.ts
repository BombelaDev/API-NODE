import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const UsuarioModel = db.define('c_usuario',
{

  ID_USUARIO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NB_USUARIO: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  NB_APELLIDO_PATERNO: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  NB_APELLIDO_MATERNO: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  CL_GENERO: {
    type: DataTypes.STRING(6),
    allowNull: true
  },
  FE_NACIMIENTO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  URL_FOTO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  DS_EMAIL: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  FG_MORAL: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  DS_PASSWORD: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  CL_ESTADO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "1.- Activo, 0.- Inactivo, 2.-Bloqueado"
  },
  FE_CREACION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  CL_USUARIO: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  FE_ACTIVACION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  CL_RFC: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  NO_TELEFONO_MOVIL: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  NO_TELEFONO_EMPRESA: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  DS_RAZON_SOCIAL: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  CL_RUBRO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  FE_ULTIMO_INICIO_SESION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "ID de usuario asociado a cav "
  }
},
{
  tableName: 'c_usuario',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO" },
      ]
    },
  ]
});

export default UsuarioModel