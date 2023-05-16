"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kVehiculoBuscadorModel = config_1.db.define('k_vehiculos_buscador', {
    ID_VEHICULO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'c_vehiculo',
            key: 'ID_VEHICULO'
        }
    },
    NB_MARCA: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NB_MODELO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
});
exports.default = kVehiculoBuscadorModel;
//# sourceMappingURL=k_vehiculo_buscador.js.map