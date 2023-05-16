
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const EstadosGeograficosModel = db.define('s_estados_geografico',
 {
  ID_ESTADO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  CL_ESTADO_GEOGRAFICO: {
    type: DataTypes.CHAR(5),
    allowNull: false
  },
  DS_ESTADO_GEOGRAFICO: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  URL_PLACAS_ESTADO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NO_DIGITO_ESTADO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_DIGITO_MEDIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_SECUENCIA_SC: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_SECUENCIA_CAV: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 's_estados_geografico',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_ESTADO_GEOGRAFICO" },
      ]
    },
  ]
});

export default EstadosGeograficosModel

