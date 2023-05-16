


import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kVehiculoHistorialModel = db.define('k_vehiculo_historial',
 {
  ID_VEHICULO_HISTORIAL: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_TIPO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  FE_HISTORICA: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ID_CAV_HISTORICO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_VENDEDOR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_COMPRADOR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_ATENDIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  DS_RESULTADO: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  MN_ORIGINAL: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  MN_ACORDADO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  CL_RESULTADO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  ID_VEHICULO_DATOS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_CITA_CAR_SALES: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  
  tableName: 'k_vehiculo_historial',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO_HISTORIAL" },
      ]
    },
  ]
});

export default kVehiculoHistorialModel
