
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kNotificacionModel = db.define('k_notificacion',
 {
  ID_NOTIFICACION: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_usuario',
      key: 'ID_USUARIO'
    }
  },
  DS_NOTIFICACION: {
    type: DataTypes.STRING(2000),
    allowNull: false
  },
  NB_TITULO_NOTIFICACION: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  FE_NOTIFICACION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  FG_ESTATUS: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "0=consultada,1=sin leer"
  },
  FG_ACTIVO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_TIPO: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: "0= Informativo, 1=Cita"
  },
  DS_BOTON: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  URL_ENLACE: {
    type: DataTypes.STRING(1000),
    allowNull: true
  }
}, {
  tableName: 'k_notificacion',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_NOTIFICACION" },
      ]
    },
    {
      name: "FK_NOTIFICACION_USUARIO",
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO" },
      ]
    },
  ]
});

export default kNotificacionModel
