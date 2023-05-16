
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const GarageModel = db.define('c_garage',
 {
  ID_GARAGE: {
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
  FE_CREACION: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'c_garage',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_GARAGE" },
      ]
    },
    {
      name: "fk_usuario_garage",
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO" },
      ]
    },
  ]
});

export default GarageModel
