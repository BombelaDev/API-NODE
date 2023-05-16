"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const KNotificacionVehiculoModel = config_1.db.define('k_notificacion_vehiculo', {
    ID_NOTIFICACION_VEHICULO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_VEHICULO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FG_ENVIADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_NOTIFICACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'k_notificacion_vehiculo',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_NOTIFICACION_VEHICULO" },
            ]
        },
    ]
});
exports.default = KNotificacionVehiculoModel;
//# sourceMappingURL=k_notificacion_vehiculo.js.map