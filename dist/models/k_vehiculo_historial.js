"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kVehiculoHistorialModel = config_1.db.define('k_vehiculo_historial', {
    ID_VEHICULO_HISTORIAL: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_VEHICULO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_TIPO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    FE_HISTORICA: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_CAV_HISTORICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_VENDEDOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_COMPRADOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_ATENDIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    DS_RESULTADO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    MN_ORIGINAL: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    MN_ACORDADO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    CL_RESULTADO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    ID_VEHICULO_DATOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_CITA_CAR_SALES: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'k_vehiculo_historial',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO_HISTORIAL" },
            ]
        },
    ]
});
exports.default = kVehiculoHistorialModel;
//# sourceMappingURL=k_vehiculo_historial.js.map