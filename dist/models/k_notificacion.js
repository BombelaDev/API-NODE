"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kNotificacionModel = config_1.db.define('k_notificacion', {
    ID_NOTIFICACION: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_usuario',
            key: 'ID_USUARIO'
        }
    },
    DS_NOTIFICACION: {
        type: sequelize_1.DataTypes.STRING(2000),
        allowNull: false
    },
    NB_TITULO_NOTIFICACION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    FE_NOTIFICACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    FG_ESTATUS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        comment: "0=consultada,1=sin leer"
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_TIPO: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        comment: "0= Informativo, 1=Cita"
    },
    DS_BOTON: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    URL_ENLACE: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    }
}, {
    tableName: 'k_notificacion',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_NOTIFICACION" },
            ]
        },
        {
            name: "FK_NOTIFICACION_USUARIO",
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO" },
            ]
        },
    ]
});
exports.default = kNotificacionModel;
//# sourceMappingURL=k_notificacion.js.map