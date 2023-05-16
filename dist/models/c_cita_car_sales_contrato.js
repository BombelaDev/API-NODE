"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const CitaCarSalesContratoModel = config_1.db.define('c_cita_car_sales_contrato', {
    ID_CITA_CAR_SALES_CONTRATO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_CITA_CAR_SALES: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'c_cita_car_sales',
            key: 'ID_CITA_CAR_SALES'
        }
    },
    NB_CLIENTE: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    NB_APELLIDO_PATERNO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    NB_APELLIDO_MATERNO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    FE_NACIMIENTO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    CL_RFC: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    CL_CURP: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    ID_PAIS_CLIENTE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_ACTIVIDAD_ECONOMICA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_TELEFONO_CLIENTE: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    CL_CORREO_CLIENTE: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    ID_TIPO_IDENTIFICACION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_IDENTIFICACION: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    ID_AUTORIDAD: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_DOMICILIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        comment: "0=NACIONAL 1=INTERNACIONAL"
    },
    NO_CP: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_MUNICIPIO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_COLONIA: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NB_CALLE: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    NO_EXTERIOR: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    NO_INTERIOR: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    FG_BENEFICIARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        comment: "0=FISICA 1=MORAL"
    },
    NB_BENEFICIARIO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    NB_APELLIDO_PATERNO_BENEFICIARIO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    NB_APELLIDO_MATERNO_BENEFICIARIO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    FE_NACIMIENTO_BENEFICIARIO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    CL_RFC_BENEFICIARIO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    CL_CURP_BENEFICIARIO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    ID_PAIS_BENEFICIARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_TELEFONO_BENEFICIARIO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    CL_CORREO_BENEFICIARIO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    NB_RAZON_SOCIAL_BENEFICIARIO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    FE_CONSTITUCION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FG_FIDEICOMISO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        comment: "0=NO 1=SI"
    },
    CL_IDENTIFICACION_FIDEICOMISO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    CL_RFC_FIDEICOMISO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    CL_DENOMINACION_FIDEICOMISO: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    FE_OPERACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    ID_TIPO_OPERACION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    MN_ENGANCHE: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    PR_ENGANCHE: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    MN_SALDO_FINANCIADO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    NO_DIAS_OTORGADOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_INSTITUCION_FINANCIERA: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NO_CP_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_CALLE_CAV: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NB_COLONIA_CAV: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NO_EXTERIOR_CAV: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    NO_INTERIOR_CAV: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    NB_MUNICIPIO_GEOGRAFICO_CAV: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    NB_ESTADO_GEOGRAFICO_CAV: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    FE_PAGO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    ID_FORMA_PAGO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_INSTRUMENTO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_MONEDA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    MN_OPERACION: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    DS_MN_OPERACION: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true
    },
    NB_MARCA: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NB_MODELO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NB_VERSION: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    NO_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_VIN: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NO_INSCRIPCION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    CL_PLACAS: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    ID_NIVEL_BLINDAJE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CL_COLOR: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    CL_TIPO_GARANTIA: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    NB_USUARIO_CREACION: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    URL_CONTRATO_VENDEDOR: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    URL_CONTRATO_COMPRADOR: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(20),
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
exports.default = CitaCarSalesContratoModel;
//# sourceMappingURL=c_cita_car_sales_contrato.js.map