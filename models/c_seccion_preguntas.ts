
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const SeccionPreguntasModel = db.define('c_seccion_preguntas',
 {
  ID_SECCION_PREGUNTAS: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NB_PREGUNTA: {
    type: DataTypes.STRING(3000),
    allowNull: false
  },
  CL_PREGUNTA: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  PR_PONDERACION: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  ID_SECCION: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_seccion',
      key: 'ID_SECCION'
    }
  }
}, {

  tableName: 'c_seccion_preguntas',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_SECCION_PREGUNTAS" },
      ]
    },
    {
      name: "PREGUNTAS_SECCION",
      using: "BTREE",
      fields: [
        { name: "ID_SECCION" },
      ]
    },
  ]
});

export default SeccionPreguntasModel
