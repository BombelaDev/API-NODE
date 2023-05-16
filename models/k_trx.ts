
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kTrxModel = db.define('k_trx',
 {
  ID_TRX: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_METODO_PAGO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  MN_MONTO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  CL_ESTADO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  CL_REFERENCIA: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  FE_PAGO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  DS_RESPUESTA_PAGO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  FE_CREACION: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: "0000-00-00 00:00:00"
  },
  ID_CITA_CARINSPECTOR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CL_CONCEPTO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  NO_INTENTOS: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NB_TITULO: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  DS_CONCEPTO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  ID_MERCADO_PAGO: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  FE_MP_CREACION: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  FE_MP_PAGO: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  CL_PAYMENT_METHOD_ID: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CL_TIPO: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  CL_STATUS_PAGO: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  ID_GARANTIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  MN_SALDO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  ID_CITA_ORIGEN: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {

  tableName: 'k_trx',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_TRX" },
      ]
    },
  ]
});

export default kTrxModel
