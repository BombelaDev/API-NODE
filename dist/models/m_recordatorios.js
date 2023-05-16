"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const mRecordatoriosModel = config_1.db.define('m_recordatorios', {
    CL_RECORDATORIO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    DS_RECORDATORIO: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: false
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    FG_CORREO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    FG_SMS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    FG_CON_COPIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    DS_CORREO_DESTINATARIO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    DS_CORREO_COPIA: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    DS_TEMPLATE_CORREO: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: false
    },
    DS_TEMPLEATE_MENSAJE: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: false
    },
    NO_TELEFONO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_RECORDATORIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'm_recordatorios',
    timestamps: false
});
exports.default = mRecordatoriosModel;
//# sourceMappingURL=m_recordatorios.js.map