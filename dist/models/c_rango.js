"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const RangoModel = config_1.db.define('c_rango', {
    ID_RANGO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_anios',
            key: 'ID_ANIO'
        }
    },
    ID_MODELO: {
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
    MN_DESDE: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    MN_HASTA: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    CL_GRUPO: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false
    },
    NO_PUERTAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NB_DATOS_VERSION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NB_VERSION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 'c_rango',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_RANGO" },
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
            name: "FK_RANGO_MODELO",
            using: "BTREE",
            fields: [
                { name: "ID_MODELO" },
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
exports.default = RangoModel;
//# sourceMappingURL=c_rango.js.map