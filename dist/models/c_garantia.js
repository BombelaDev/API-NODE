"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const GarantiaModel = config_1.db.define('c_garantia', {
    ID_GARANTIA: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_VEHICULO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_GARANTIA: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    FE_CADUCIDAD: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: "0000-00-00 00:00:00"
    },
    FG_AL_VENDER_AUTO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FE_CONTRATACION: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    FE_INICIO_VIGENCIA: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FE_FIN_VIGENCIA: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    CL_FOLIO_GARANTIA: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    CL_TIPO_GARANTIA: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    ID_USUARIO_CANCELA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    DS_MOTIVO_CANCELACION: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    FE_CANCELACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    ID_USUARIO_DIRECCION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_VEHICULO_DATOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'c_garantia',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_GARANTIA" },
            ]
        },
    ]
});
exports.default = GarantiaModel;
//# sourceMappingURL=c_garantia.js.map