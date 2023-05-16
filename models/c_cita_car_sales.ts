import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const CitasCarSalesModel = db.define('c_cita_car_sales',
 {
  ID_CITA_CAR_SALES: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_COMPRADOR: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_usuario',
      key: 'ID_USUARIO'
    }
  },
  ID_CAV: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_cav',
      key: 'ID_CAV'
    }
  },
  ID_VEHICULO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_vehiculo',
      key: 'ID_VEHICULO'
    }
  },
  FE_CITA: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  HR_CITA: {
    type: DataTypes.TIME,
    allowNull: false
  },
  ID_VENDEDOR: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_usuario',
      key: 'ID_USUARIO'
    }
  },
  FG_VENDEDOR_ACEPTO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FG_COMPRADOR_ACEPTO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_ESTADO: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  FE_REGISTRO: {
    type: DataTypes.DATE,
    allowNull: false
  },
  CL_CITA_CAR_SALES: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  FE_CONFIRMACION_CITA: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FE_CANCELACION_CITA: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FG_REPROGRAMADA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_EMPLEADO_COMERCIAL: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_ATENDIDA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_RESULTADO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  FG_REF_GENERADA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  URL_CONTRATO: {
    type: DataTypes.STRING(450),
    allowNull: true
  },
  URL_INE: {
    type: DataTypes.STRING(450),
    allowNull: true
  },
  FG_CITA_INICIADA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_CITA_INICIADA: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ID_EMPLEADO_INICIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  URL_IDENTIFICACION_COMPRADOR: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  URL_COMPROBANTE_DOMICILIO_COMPRADOR: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  URL_CONTRATO_COMPRA_VENTA: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  CL_FOLIO_AGRUPADOR: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  FG_PAGADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_NUEVA_COMPRADOR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_NUEVA_VENDEDOR: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_VENDEDOR_PRESENTO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_COMPRADOR_PRESENTO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  DS_COMPRADOR_NO_LLEGO: {
    type: DataTypes.STRING(5000),
    allowNull: true
  },
  DS_VENDEDOR_NO_LLEGO: {
    type: DataTypes.STRING(5000),
    allowNull: true
  },
  FG_ACUERDO_LOGRADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  DS_ACUERDO_NO_LOGRADO: {
    type: DataTypes.STRING(5000),
    allowNull: true
  },
  FE_TERMINO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  URL_CONTRATO_VENDEDOR: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  URL_CONTRATO_COMPRADOR: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  URL_IDENTIFICACION_VENDEDOR: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  FE_CITA_CONCLUIDA: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'c_cita_car_sales',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CITA_CAR_SALES" },
      ]
    },
    {
      name: "fk_sales_usuario",
      using: "BTREE",
      fields: [
        { name: "ID_COMPRADOR" },
      ]
    },
    {
      name: "fk_sales_cav",
      using: "BTREE",
      fields: [
        { name: "ID_CAV" },
      ]
    },
    {
      name: "fk_sales_vehiculo",
      using: "BTREE",
      fields: [
        { name: "ID_VEHICULO" },
      ]
    },
    {
      name: "fk_sales_vendedor",
      using: "BTREE",
      fields: [
        { name: "ID_VENDEDOR" },
      ]
    },
  ]
});

export default CitasCarSalesModel
