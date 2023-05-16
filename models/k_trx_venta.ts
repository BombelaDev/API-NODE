
import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const kTrxVentaModel = db.define('k_trx_venta',
 {
  ID_TRX_VENTA: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_CITA_CAR_SALES: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_cita_car_sales',
      key: 'ID_CITA_CAR_SALES'
    }
  },
  CL_FORMA_PAGO: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: "Liquidado, Financiado"
  },
  CL_REFERENCIA: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  MN_MONTO_PUBLICADO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  MN_MONTO_ACORDADO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: false
  },
  MN_ENGANCHE: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  CL_ESTADO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  FE_PAGO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FE_DE_ESPERA: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  ID_USUARIO_SAC: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  MN_ADEUDO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  CL_CONTRATO_VENTA: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CL_CONTRATO_COMPRA: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  FE_CADUCIDAD_REFERENCIA: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'k_trx_venta',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_TRX_VENTA" },
      ]
    },
    {
      name: "id_cita_fk",
      using: "BTREE",
      fields: [
        { name: "ID_CITA_CAR_SALES" },
      ]
    },
  ]
});

export default kTrxVentaModel
