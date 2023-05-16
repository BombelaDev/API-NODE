"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const AniosModel = config_1.db.define('c_anios', {
    ID_ANIO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_MODELO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_MARCA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    JS_ESTILOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'c_anios',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_ANIO" },
            ]
        },
        {
            name: "FK_ANIOS_MODELOS",
            using: "BTREE",
            fields: [
                { name: "ID_MODELO" },
            ]
        },
        {
            name: "FK_ANIOS_MARCA",
            using: "BTREE",
            fields: [
                { name: "ID_MARCA" },
            ]
        },
    ]
});
exports.default = AniosModel;
//# sourceMappingURL=c_anios.js.map