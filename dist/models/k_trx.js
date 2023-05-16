"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kTrxModel = config_1.db.define('k_trx', {
    ID_TRX: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_METODO_PAGO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    MN_MONTO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    CL_REFERENCIA: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    FE_PAGO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    DS_RESPUESTA_PAGO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: "0000-00-00 00:00:00"
    },
    ID_CITA_CARINSPECTOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CL_CONCEPTO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    NO_INTENTOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NB_TITULO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    DS_CONCEPTO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    ID_MERCADO_PAGO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    FE_MP_CREACION: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    FE_MP_PAGO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    CL_PAYMENT_METHOD_ID: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    CL_TIPO: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    CL_STATUS_PAGO: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    ID_GARANTIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    MN_SALDO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    ID_CITA_ORIGEN: {
        type: sequelize_1.DataTypes.INTEGER,
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
exports.default = kTrxModel;
//# sourceMappingURL=k_trx.js.map