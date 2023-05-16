"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const MarcasModel = config_1.db.define('marcas', {
    ID_MARCA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_MARCA: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    NB_MODELO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    NO_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    DS_ESTILOS: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'marcas',
    timestamps: false
});
exports.default = MarcasModel;
//# sourceMappingURL=marcas.js.map