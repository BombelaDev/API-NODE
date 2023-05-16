"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const CodigoPostalModel = config_1.db.define('c_codigo_postal', {
    id_cp: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_estado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    clave_mpio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    cp: {
        type: sequelize_1.DataTypes.CHAR(10),
        allowNull: false
    },
    tipo_asentamiento: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false
    },
    colonia: {
        type: sequelize_1.DataTypes.STRING(180),
        allowNull: false
    }
}, {
    tableName: 'c_codigo_postal',
    timestamps: false
});
exports.default = CodigoPostalModel;
//# sourceMappingURL=c_codigo_postal.js.map