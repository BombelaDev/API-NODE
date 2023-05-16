
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const MunicipiosGeograficosModel = db.define('s_municipios_geografico',
 {
  ID_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_ESTADO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 's_estados_geografico',
      key: 'ID_ESTADO_GEOGRAFICO'
    }
  },
  NB_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  CL_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {

  tableName: 's_municipios_geografico',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_MUNICIPIO_GEOGRAFICO" },
      ]
    },
    {
      name: "FK_ESTADO_ESTADO",
      using: "BTREE",
      fields: [
        { name: "ID_ESTADO_GEOGRAFICO" },
      ]
    },
  ]
});

export default MunicipiosGeograficosModel
