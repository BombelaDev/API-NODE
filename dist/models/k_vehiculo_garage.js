"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kVehiculoGarageModel = config_1.db.define('k_vehiculo_garage', {
    ID_VEHICULO_GARAGE: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_GARAGE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_garage',
            key: 'ID_GARAGE'
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
    FE_ALTA_GARAGE: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        comment: "fecha en que se agrego al garage"
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_usuario',
            key: 'ID_USUARIO'
        }
    }
}, {
    tableName: 'k_vehiculo_garage',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO_GARAGE" },
            ]
        },
        {
            name: "FK_VEHICULO_GARAGE_C_GARAGE",
            using: "BTREE",
            fields: [
                { name: "ID_GARAGE" },
            ]
        },
        {
            name: "FK_VEHICULO_VEHICULO_GARAGE",
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO" },
            ]
        },
        {
            name: "FK_USUARIO_G_USUAIRO",
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO" },
            ]
        },
    ]
});
exports.default = kVehiculoGarageModel;
//# sourceMappingURL=k_vehiculo_garage.js.map