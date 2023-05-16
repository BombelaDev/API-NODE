import { db } from '../config/config';
import {DataTypes} from "sequelize"

 const CitasCarInspectorModel = db.define('c_cita_car_inspector',
 {
  ID_CITA_CAR_INSPECTOR: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ID_USUARIO: {
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
  FE_CITA: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  HR_CITA: {
    type: DataTypes.TIME,
    allowNull: false
  },
  ID_MARCA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'c_marca',
      key: 'ID_MARCA'
    }
  },
  ID_MODELO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_ANIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CL_ESTADO: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  CL_CITA: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  FE_CREACION: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ID_EMPLEADO_COMERCIAL: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ID_EMPLEADO_SERVICIO: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FE_CADUCIDAD: {
    type: DataTypes.DATE,
    allowNull: false
  },
  FG_ACTIVO_AUMENTO_TIEMPO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_EMPLEADO_MECANICO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ID_VEHICULO_ALTA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CL_COLOR: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  NO_KM: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CL_URL_HOJA_RECEPCION: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  FG_NUEVA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_IS_REAGENDADA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_ASESOR_SERVICIO_ENTERADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FG_ASESOR_COMERCIAL_ENTERADO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_SERVICIO_ENTERADO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FE_COMERCIAL_ENTERADO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FE_CITA_CONDENSADA: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FG_RECORDATORIO_DEL_DIA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  FE_NO_PRESENTO: {
    type: DataTypes.DATE,
    allowNull: true
  },
  FG_RECORDATORIO_NO_PRESENTO: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'c_cita_car_inspector',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "ID_CITA_CAR_INSPECTOR" },
      ]
    },
    {
      name: "fk_cita_car_cav",
      using: "BTREE",
      fields: [
        { name: "ID_CAV" },
      ]
    },
    {
      name: "fk_cita_car_usu",
      using: "BTREE",
      fields: [
        { name: "ID_USUARIO" },
      ]
    },
    {
      name: "fk_cita_car_marca",
      using: "BTREE",
      fields: [
        { name: "ID_MARCA" },
      ]
    },
    {
      name: "fk_cita_car_mod",
      using: "BTREE",
      fields: [
        { name: "ID_MODELO" },
      ]
    },
    {
      name: "fk_cita_car_anio",
      using: "BTREE",
      fields: [
        { name: "ID_ANIO" },
      ]
    },
  ]
});

export default CitasCarInspectorModel
