"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const SCalendarioModel = config_1.db.define('s_calendario', {
    ID_CALENDARIO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    FE_CALENDARIO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 's_calendario',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_CALENDARIO" },
            ]
        },
    ]
});
exports.default = SCalendarioModel;
//# sourceMappingURL=s_calendario.js.map