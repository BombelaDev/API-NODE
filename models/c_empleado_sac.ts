
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const EmpleadoSacModel = db.define('c_empleado_sac',
 {
  ID_EMPLEADO_SAC: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NB_EMPLEADO_SAC: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  NB_APELLIDO_PATERNO_SAC: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  NB_APELLIDO_MATERNO_SAC: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  ID_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 's_municipios_geografico',
      key: 'ID_MUNICIPIO_GEOGRAFICO'
    }
  },
  ID_ESTADO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 's_estados_geografico',
      key: 'ID_ESTADO_GEOGRAFICO'
    }
  },
  NB_CALLE: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  NO_INTERIOR: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  NO_EXTERIOR: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  NO_CP: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NB_COLONIA: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  NO_TELEFONO: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  FE_ALTA: {
    type: DataTypes.DATE,
    allowNull: false
  },
  FG_ACTIVO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  DS_EMAIL: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 'c_empleado_sac',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_EMPLEADO_SAC" },
      ]
    },
    {
      name: "fk_empleado_mun",
      using: "BTREE",
      fields: [
        { name: "ID_MUNICIPIO_GEOGRAFICO" },
      ]
    },
    {
      name: "fk_empleado_esatdo",
      using: "BTREE",
      fields: [
        { name: "ID_ESTADO_GEOGRAFICO" },
      ]
    },
  ]
});

export default EmpleadoSacModel
