"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const ActividadModel = config_1.db.define('c_actividad', {
    ID_ACTIVIDAD: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    FE_ACTIVIDAD: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    DS_ACTIVIDAD: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
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
    tableName: 'c_actividad',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_ACTIVIDAD" },
            ]
        },
        {
            name: "fk_actividad_usuario",
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO" },
            ]
        },
    ]
});
exports.default = ActividadModel;
//# sourceMappingURL=c_actividad.js.map