"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const VersionAutoModel = config_1.db.define('c_version', {
    ID_VERSION: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_MARCA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_marca',
            key: 'ID_MARCA'
        }
    },
    NB_VERSION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    JS_VERSION: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'c_version',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_VERSION" },
            ]
        },
        {
            name: "FK_RANGO_MARCA",
            using: "BTREE",
            fields: [
                { name: "ID_MARCA" },
            ]
        },
        {
            name: "FK_RANGO_ANIO",
            using: "BTREE",
            fields: [
                { name: "ID_ANIO" },
            ]
        },
    ]
});
exports.default = VersionAutoModel;
//# sourceMappingURL=c_version.js.map