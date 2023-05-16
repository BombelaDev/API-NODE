import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const ActividadModel = db.define('c_actividad',
 {
  ID_ACTIVIDAD: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  FE_ACTIVIDAD: {
    type: DataTypes.DATE,
    allowNull: false
  },
  DS_ACTIVIDAD: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_usuario',
      key: 'ID_USUARIO'
    }
  }
}, {
  tableName: 'c_actividad',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_ACTIVIDAD" },
      ]
    },
    {
      name: "fk_actividad_usuario",
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO" },
      ]
    },
  ]
});

export default ActividadModel