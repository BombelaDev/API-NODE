"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const CorreoContenidoModel = config_1.db.define('c_correo_contenido', {
    ID_CORREO_CONTENIDO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_TIPO_CORREO_CONTENIDO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    DS_BODY: {
        type: sequelize_1.DataTypes.STRING(8000),
        allowNull: false
    },
    ID_CORREO_ESTRUCTURA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_correo_estructura',
            key: 'ID_CORREO_ESTRUCTURA'
        }
    },
    CL_CORREO: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true
    },
    DS_SMS: {
        type: sequelize_1.DataTypes.STRING(8000),
        allowNull: true
    }
}, {
    tableName: 'c_correo_contenido',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_CORREO_CONTENIDO" },
            ]
        },
        {
            name: "FK_ID_CORREO_ESTRUCTURA",
            using: "BTREE",
            fields: [
                { name: "ID_CORREO_ESTRUCTURA" },
            ]
        },
    ]
});
exports.default = CorreoContenidoModel;
//# sourceMappingURL=c_correo_contenido.js.map