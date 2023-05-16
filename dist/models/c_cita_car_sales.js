"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const CitasCarSalesModel = config_1.db.define('c_cita_car_sales', {
    ID_CITA_CAR_SALES: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_COMPRADOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_usuario',
            key: 'ID_USUARIO'
        }
    },
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_cav',
            key: 'ID_CAV'
        }
    },
    ID_VEHICULO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_vehiculo',
            key: 'ID_VEHICULO'
        }
    },
    FE_CITA: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    HR_CITA: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    ID_VENDEDOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_usuario',
            key: 'ID_USUARIO'
        }
    },
    FG_VENDEDOR_ACEPTO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FG_COMPRADOR_ACEPTO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    FE_REGISTRO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    CL_CITA_CAR_SALES: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    FE_CONFIRMACION_CITA: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FE_CANCELACION_CITA: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FG_REPROGRAMADA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_EMPLEADO_COMERCIAL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_ATENDIDA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_RESULTADO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    FG_REF_GENERADA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    URL_CONTRATO: {
        type: sequelize_1.DataTypes.STRING(450),
        allowNull: true
    },
    URL_INE: {
        type: sequelize_1.DataTypes.STRING(450),
        allowNull: true
    },
    FG_CITA_INICIADA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_CITA_INICIADA: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    ID_EMPLEADO_INICIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    URL_IDENTIFICACION_COMPRADOR: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    URL_COMPROBANTE_DOMICILIO_COMPRADOR: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    URL_CONTRATO_COMPRA_VENTA: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    CL_FOLIO_AGRUPADOR: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    FG_PAGADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_NUEVA_COMPRADOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_NUEVA_VENDEDOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_VENDEDOR_PRESENTO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_COMPRADOR_PRESENTO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    DS_COMPRADOR_NO_LLEGO: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true
    },
    DS_VENDEDOR_NO_LLEGO: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true
    },
    FG_ACUERDO_LOGRADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    DS_ACUERDO_NO_LOGRADO: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true
    },
    FE_TERMINO: {
        type: sequelize_1.DataTypes.DATE,
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
    URL_IDENTIFICACION_VENDEDOR: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    FE_CITA_CONCLUIDA: {
        type: sequelize_1.DataTypes.DATE,
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
exports.default = CitasCarSalesModel;
//# sourceMappingURL=c_cita_car_sales.js.map