
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const EmpleadoCavModel = db.define('c_empleado_cav',
 {
  ID_EMPLEADO_CAV: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NB_EMPLEADO_CAV: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  NB_APELLIDO_PATERNO_CAV: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  NB_APELLIDO_MATERNO_CAV: {
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
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_cav',
      key: 'ID_CAV'
    }
  },
  ID_SOCIO_COMERCIAL: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'c_socio_comercial',
      key: 'ID_SOCIO_COMERCIAL'
    }
  },
  FG_VENTAS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FG_SERVICIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FG_GERENTE: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  DS_EMAIL: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'c_empleado_cav',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_EMPLEADO_CAV" },
      ]
    },
    {
      name: "fk_empleado_esatdo",
      using: "BTREE",
      fields: [
        { name: "ID_ESTADO_GEOGRAFICO" },
      ]
    },
    {
      name: "fk_empleado_cav",
      using: "BTREE",
      fields: [
        { name: "ID_CAV" },
      ]
    },
    {
      name: "fk_empleado_socio",
      using: "BTREE",
      fields: [
        { name: "ID_SOCIO_COMERCIAL" },
      ]
    },
    {
      name: "empleado_cav_municipio",
      using: "BTREE",
      fields: [
        { name: "ID_MUNICIPIO_GEOGRAFICO" },
      ]
    },
  ]
});

export default EmpleadoCavModel
