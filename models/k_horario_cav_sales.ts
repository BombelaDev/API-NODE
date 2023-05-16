
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const KHorarioCavSalesModel = db.define('k_horario_cav_sales',
 {
  ID_HORARIO_CAV: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_cav',
      key: 'ID_CAV'
    }
  },
  JS_LUNES: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_MARTES: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_MIERCOLES: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_JUEVES: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_VIERNES: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_SABADO: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_DOMINGO: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  FG_ACTIVO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_CREACION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  HR_INICIO: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  HR_FIN: {
    type: DataTypes.STRING(10),
    allowNull: true
  }
}, {

  tableName: 'k_horario_cav_sales',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_HORARIO_CAV" },
      ]
    },
    {
      name: "FK_HORARIO_CAV",
      using: "BTREE",
      fields: [
        { name: "ID_CAV" },
      ]
    },
  ]
});

export default KHorarioCavSalesModel
