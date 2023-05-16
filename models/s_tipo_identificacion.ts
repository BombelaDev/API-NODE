
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const TipoIdentificacionModel = db.define('s_tipo_identificacion',
 {
  ID_TIPO_IDENTIFICACION: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NB_TIPO_IDENTIFICACION: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 's_tipo_identificacion',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_TIPO_IDENTIFICACION" },
      ]
    },
  ]
});

export default TipoIdentificacionModel
