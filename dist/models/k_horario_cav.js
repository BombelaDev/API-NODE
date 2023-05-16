"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const KHorarioCavModel = config_1.db.define('k_horario_cav', {
    ID_HORARIO_CAV: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_cav',
            key: 'ID_CAV'
        }
    },
    JS_LUNES: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_MARTES: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_MIERCOLES: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_JUEVES: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_VIERNES: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_SABADO: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_DOMINGO: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    HR_INICIO: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    HR_FIN: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    }
}, {
    tableName: 'k_horario_cav',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_HORARIO_CAV" },
            ]
        },
        {
            name: "FK_HORARIO_CAV",
            using: "BTREE",
            fields: [
                { name: "ID_CAV" },
            ]
        },
    ]
});
exports.default = KHorarioCavModel;
//# sourceMappingURL=k_horario_cav.js.map