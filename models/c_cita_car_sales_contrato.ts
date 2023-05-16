import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const CitaCarSalesContratoModel = db.define('c_cita_car_sales_contrato',
 {
  ID_CITA_CAR_SALES_CONTRATO: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_CITA_CAR_SALES: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'c_cita_car_sales',
      key: 'ID_CITA_CAR_SALES'
    }
  },
  NB_CLIENTE: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  NB_APELLIDO_PATERNO: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  NB_APELLIDO_MATERNO: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  FE_NACIMIENTO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  CL_RFC: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CL_CURP: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  ID_PAIS_CLIENTE: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_ACTIVIDAD_ECONOMICA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_TELEFONO_CLIENTE: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  CL_CORREO_CLIENTE: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ID_TIPO_IDENTIFICACION: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_IDENTIFICACION: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ID_AUTORIDAD: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_DOMICILIO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "0=NACIONAL 1=INTERNACIONAL"
  },
  NO_CP: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_ESTADO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_MUNICIPIO_GEOGRAFICO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NB_COLONIA: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NB_CALLE: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  NO_EXTERIOR: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  NO_INTERIOR: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  FG_BENEFICIARIO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "0=FISICA 1=MORAL"
  },
  NB_BENEFICIARIO: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  NB_APELLIDO_PATERNO_BENEFICIARIO: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  NB_APELLIDO_MATERNO_BENEFICIARIO: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  FE_NACIMIENTO_BENEFICIARIO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  CL_RFC_BENEFICIARIO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CL_CURP_BENEFICIARIO: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ID_PAIS_BENEFICIARIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_TELEFONO_BENEFICIARIO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CL_CORREO_BENEFICIARIO: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  NB_RAZON_SOCIAL_BENEFICIARIO: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  FE_CONSTITUCION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FG_FIDEICOMISO: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "0=NO 1=SI"
  },
  CL_IDENTIFICACION_FIDEICOMISO: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  CL_RFC_FIDEICOMISO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CL_DENOMINACION_FIDEICOMISO: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  FE_OPERACION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ID_TIPO_OPERACION: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  MN_ENGANCHE: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  PR_ENGANCHE: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  MN_SALDO_FINANCIADO: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  NO_DIAS_OTORGADOS: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NB_INSTITUCION_FINANCIERA: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  NO_CP_CAV: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NB_CALLE_CAV: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NB_COLONIA_CAV: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  NO_EXTERIOR_CAV: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  NO_INTERIOR_CAV: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  NB_MUNICIPIO_GEOGRAFICO_CAV: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  NB_ESTADO_GEOGRAFICO_CAV: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  FE_PAGO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ID_FORMA_PAGO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_INSTRUMENTO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_MONEDA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  MN_OPERACION: {
    type: DataTypes.DECIMAL(12,4),
    allowNull: true
  },
  DS_MN_OPERACION: {
    type: DataTypes.STRING(5000),
    allowNull: true
  },
  NB_MARCA: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  NB_MODELO: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  NB_VERSION: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  NO_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  NO_VIN: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  NO_INSCRIPCION: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  CL_PLACAS: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  ID_NIVEL_BLINDAJE: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CL_COLOR: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  CL_TIPO_GARANTIA: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  FE_CREACION: {
    type: DataTypes.DATE,
    allowNull: true
  },
  NB_USUARIO_CREACION: {
    type: DataTypes.STRING(255),
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
  CL_ESTADO: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  
  tableName: 'c_cita_car_sales_contrato',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CITA_CAR_SALES_CONTRATO" },
        { name: "ID_CITA_CAR_SALES" },
      ]
    },
    {
      name: "ID_CS_CON",
      using: "BTREE",
      fields: [
        { name: "ID_CITA_CAR_SALES" },
      ]
    },
  ]
});

export default CitaCarSalesContratoModel
