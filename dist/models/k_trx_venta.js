"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kTrxVentaModel = config_1.db.define('k_trx_venta', {
    ID_TRX_VENTA: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_CITA_CAR_SALES: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_cita_car_sales',
            key: 'ID_CITA_CAR_SALES'
        }
    },
    CL_FORMA_PAGO: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        comment: "Liquidado, Financiado"
    },
    CL_REFERENCIA: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    MN_MONTO_PUBLICADO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    MN_MONTO_ACORDADO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    MN_ENGANCHE: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    FE_PAGO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FE_DE_ESPERA: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    ID_USUARIO_SAC: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    MN_ADEUDO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    CL_CONTRATO_VENTA: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    CL_CONTRATO_COMPRA: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    FE_CADUCIDAD_REFERENCIA: {
        type: sequelize_1.DataTypes.DATE,
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
exports.default = kTrxVentaModel;
//# sourceMappingURL=k_trx_venta.js.map