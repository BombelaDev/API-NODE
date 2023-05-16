"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const AutoridadModel = config_1.db.define('s_autoridad_expide', {
    ID_AUTORIDAD_EXPIDE: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_TIPO_IDENTIFICACION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NB_AUTORIDAD_EXPIDE: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 's_autoridad_expide',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_AUTORIDAD_EXPIDE" },
            ]
        },
    ]
});
exports.default = AutoridadModel;
//# sourceMappingURL=s_autoridad_expide.js.map