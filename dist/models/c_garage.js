"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const GarageModel = config_1.db.define('c_garage', {
    ID_GARAGE: {
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
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'c_garage',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_GARAGE" },
            ]
        },
        {
            name: "fk_usuario_garage",
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO" },
            ]
        },
    ]
});
exports.default = GarageModel;
//# sourceMappingURL=c_garage.js.map