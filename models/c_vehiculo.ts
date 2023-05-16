




import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const VehiculoModel = db.define('c_vehiculo',
 {
  ID_VEHICULO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_MARCA: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'c_marca',
      key: 'ID_MARCA'
    }
  },
  ID_MODELO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_VERSION: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'c_version',
      key: 'ID_VERSION'
    }
  },
  CL_TIPO_COMBUSTIBLE: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  CL_TRANSMISION: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  NO_CILINDROS: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  NO_PUERTAS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_PASAJEROS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_CREACION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ID_CAV_ALTA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_cav',
      key: 'ID_CAV'
    }
  },
  ID_USUARIO_ALTA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NO_VIN: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  JS_ESTILOS: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_CRISTALES: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_PORTAVASOS: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_CONECTIVIDAD: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_CAJUELA: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_ASIENTOS: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_CLIMA: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  JS_SEGURIDAD: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  FG_EN_PORTAL: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FG_ACTIVO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "-1= Borrador, 0=Inactivo, 1=Activo"
  },
  CL_VEHICULO: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  NO_MOTOR: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NO_TRANSMISION: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  CL_TIPO_VEHICULO: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  FG_VISIBLE_PORTAL: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_HP: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NB_MARCA: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NB_MODELO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NO_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NB_VERSION: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  FG_ES_ROBADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  URL_REPUVE: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  FG_GENERO_QR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_INACTIVACION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  DS_INACTIVACION: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  FG_TIENE_GARANTIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_ES_DE_AGENCIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'c_vehiculo',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO" },
      ]
    },
    {
      name: "fk_vehiculo_marca",
      using: "BTREE",
      fields: [
        { name: "ID_MARCA" },
      ]
    },
    {
      name: "fk_vehiculo_modelo",
      using: "BTREE",
      fields: [
        { name: "ID_MODELO" },
      ]
    },
    {
      name: "fk_vehiculo_anio",
      using: "BTREE",
      fields: [
        { name: "ID_ANIO" },
      ]
    },
    {
      name: "fk_vehiculo_cav",
      using: "BTREE",
      fields: [
        { name: "ID_CAV_ALTA" },
      ]
    },
    {
      name: "fk_vehiculo_version",
      using: "BTREE",
      fields: [
        { name: "ID_VERSION" },
      ]
    },
  ]
});

export default VehiculoModel
