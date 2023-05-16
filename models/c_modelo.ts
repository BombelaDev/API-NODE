




import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const ModeloAutoModel = db.define('c_modelo',
 {
  ID_MODELO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_MARCA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_marca',
      key: 'ID_MARCA'
    }
  },
  CL_MODELO: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FG_ACTIVO: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
 
  tableName: 'c_modelo',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_MODELO" },
      ]
    },
    {
      name: "FK_MODELOS_MARCA",
      using: "BTREE",
      fields: [
        { name: "ID_MARCA" },
      ]
    },
  ]
});

export default ModeloAutoModel
