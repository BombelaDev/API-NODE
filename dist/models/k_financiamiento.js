"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const KFinanciamientoModel = config_1.db.define('k_financiamiento', {
    ID_FINANCIAMIENTO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_usuario',
            key: 'ID_USUARIO'
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
    ID_VEHICULO_DATOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'k_vehiculo_datos',
            key: 'ID_VEHICULO_DATOS'
        }
    },
    MN_ENGANCHE: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    FE_SOLICITUD: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    MN_FINANCIAR: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    }
}, {
    tableName: 'k_financiamiento',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_FINANCIAMIENTO" },
            ]
        },
        {
            name: "financiamiento_c_vehiculo",
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO" },
            ]
        },
        {
            name: "financiamiento_datos",
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO_DATOS" },
            ]
        },
        {
            name: "financiamiento",
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO" },
            ]
        },
    ]
});
exports.default = KFinanciamientoModel;
//# sourceMappingURL=k_financiamiento.js.map