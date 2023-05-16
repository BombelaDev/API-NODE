



import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const PreguntasModel = db.define('c_preguntas',
 {
  ID_PREGUNTAS: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_SECCION: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  JS_PREGUNTAS: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  NO_SECUENCIA: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'c_preguntas',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_PREGUNTAS" },
      ]
    },
  ]
});

export default PreguntasModel
