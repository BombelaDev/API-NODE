"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const CorreoEstructuraModel = config_1.db.define('c_correo_estructura', {
    ID_CORREO_ESTRUCTURA: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_CORREO_ESTRUCTURA: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    DS_HEADER: {
        type: sequelize_1.DataTypes.STRING(2000),
        allowNull: false
    },
    DS_FOOTER: {
        type: sequelize_1.DataTypes.STRING(2000),
        allowNull: false
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'c_correo_estructura',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_CORREO_ESTRUCTURA" },
            ]
        },
    ]
});
exports.default = CorreoEstructuraModel;
//# sourceMappingURL=c_correo_estructura.js.map